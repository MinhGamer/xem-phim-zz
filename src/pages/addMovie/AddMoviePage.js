import React, { useEffect, useState } from 'react';

import useForm from '../../shared/customHooks/useForm';
import Input from '../../shared/components/FormElement/Input';
import Button from '../../shared/components/UI/Button';

import { VALIDATOR_REQUIRE } from '../../shared/util/validators';

import useHttp from '../../shared/customHooks/useHttp';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

import ImageUpload from '../../shared/components/FormElement/ImageUpload';

import ErrorModal from '../../shared/components/UI/ErrorModal';
import Modal from '../../shared/components/UI/Modal';

import './AddMoviePage.css';

export default function AddMoviePage() {
  const { formState, inputHandler, setFormData } = useForm(
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
    },
    false
  );

  const { sendRequest, isLoading, error, clearError } = useHttp();

  const { createMovie, setCreateMovie } = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    let titleEng = formState.inputs.titleEng.value;
    const newMovie = {
      titleEng,
      titleVn: formState.inputs.titleVn.value,
    };

    const fromData = new FormData();
    fromData.append('image', formState.inputs.image.value);

    // console.log(formState.inputs.image.value);

    //this title used to add to image name
    const imageName = titleEng.toLowerCase().replaceAll(' ', '-');
    // console.log(imageName);

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

        <h1>Form Add Movie</h1>
        <Input
          id='titleEng'
          label='Title English'
          initialValue=''
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          type='text'
        />
        <Input
          id='titleVn'
          label='Title Vietnamese'
          initialValue=''
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          type='text'
        />

        <ImageUpload onInput={inputHandler} center id='image' />

        <Button disabled={!formState.isValid} isSecondary>
          Submit
        </Button>
      </form>
    </>
  );
}
