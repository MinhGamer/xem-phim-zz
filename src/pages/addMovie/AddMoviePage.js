import React, { useEffect, useState } from 'react';

import useForm from '../../shared/customHooks/useForm';
import Input from '../../shared/components/FormElement/Input';
import Button from '../../shared/components/UI/Button';

import {
  VALIDATOR_MAX,
  VALIDATOR_MIN,
  VALIDATOR_NUMBER_ONLY,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

import useHttp from '../../shared/customHooks/useHttp';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

import ImageUpload from '../../shared/components/FormElement/ImageUpload';

import ErrorModal from '../../shared/components/UI/ErrorModal';
import Modal from '../../shared/components/UI/Modal';

import './AddMoviePage.css';

import Select from '../../shared/components/FormElement/Select';
import InputArrTrailer from '../../shared/components/FormElement/InputArr';
import DatePicker from '../../shared/components/DatePicker/DatePicker';

import { GENRES_LIST, NATION_LIST } from '../../shared/util/config';

export default function AddMoviePage() {
  const { formState, inputHandler, setFormData, selectHandler } = useForm(
    {
      titleEng: {
        value: '',
        isValid: false,
      },
      titleVn: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
      genres: {
        value: null,
        isValid: false,
      },
      trailer: {
        value: [],
        isValid: false,
      },
    },
    false
  );

  const { sendRequest, isLoading, error, clearError } = useHttp();

  const { createMovie, setCreateMovie } = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(formState.inputs);

    let titleEng = formState.inputs.titleEng.value;
    const newMovie = {
      titleEng,
      titleVn: formState.inputs.titleVn.value,
      genres: formState.inputs.genres.value,
      nation: formState.inputs.nation.value,
      trailer: formState.inputs.nation.value,
    };

    const fromData = new FormData();
    fromData.append('image', formState.inputs.image.value);

    //this title used to add to image name
    const imageName = titleEng.toLowerCase().replaceAll(' ', '-');

    try {
      //send request to create new movie
      const data = await sendRequest(
        'movie',
        'POST',
        JSON.stringify(newMovie),
        { 'Content-Type': 'application/json ' }
      );

      console.log(data);

      //get id created by serve
      const movieId = data.newMovie.id;

      //use this id to add the image to database
      await sendRequest(
        `movie/image/${movieId}/${imageName}`,
        'POST',
        fromData
      );

      setCreateMovie(true);
    } catch (err) {}
  };

  console.log(formState.inputs);

  return (
    <>
      {createMovie && (
        <Modal>
          <h1>Success</h1>
        </Modal>
      )}

      {error && <ErrorModal error={error} clearError={clearError} />}

      <form className='form-add-movie' onSubmit={submitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}

        <h1>Thêm phim</h1>
        <Input
          id='titleEng'
          label='Tên Tiếng Anh'
          initialValue=''
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          type='text'
        />

        <Input
          id='titleVn'
          label='Tên Tiếng Việt'
          initialValue=''
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          type='text'
        />

        <Input
          id='length'
          label='Độ dài phim (phút)'
          initialValue=''
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER_ONLY()]}
          onInput={inputHandler}
          type='text'
          placeholder='phút'
        />

        <Input
          id='imdb'
          label='Điểm IMDb (1-10)'
          initialValue=''
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MAX(10),
            VALIDATOR_MIN(1),
          ]}
          onInput={inputHandler}
          type='number'
        />

        <Input
          id='director'
          label='Đạo diễn'
          initialValue=''
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          type='number'
        />

        <h3>Ngày khởi chiếu</h3>
        <DatePicker />

        {/* select thể loại, quốc gia */}
        <div className='form-add-movie__select-container'>
          <Select
            required
            id='genres'
            onSelect={selectHandler}
            options={GENRES_LIST}
            label='Thể loại'
            onChange={() => {}}
          />

          <Select
            required
            id='nation'
            onSelect={selectHandler}
            options={NATION_LIST}
            label='Quốc gia'
            onChange={() => {}}
          />
        </div>

        <div className='form-add-movie__image-container'>
          <div className='form-add-movie__image-container--image'>
            <ImageUpload
              onInput={inputHandler}
              center
              id='image'
              content={'Pick movie'}
            />
          </div>
          <div className='form-add-movie__image-container--bg-image'>
            <ImageUpload
              onInput={inputHandler}
              center
              id='bg-image'
              content={'Pick movie background'}
            />
          </div>
        </div>

        {/* up trailer links */}
        <InputArrTrailer onInput={inputHandler} id='trailer' />

        <Button disabled={!formState.isValid} isSecondary>
          Submit
        </Button>
      </form>
    </>
  );
}
