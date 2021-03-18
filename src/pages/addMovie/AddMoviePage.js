import React, { useEffect } from 'react';

import useForm from '../../shared/customHooks/useForm';
import Input from '../../shared/components/FormElement/Input';
import Button from '../../shared/components/UI/Button';

import { VALIDATOR_REQUIRE } from '../../shared/util/validators';

import useHttp from '../../shared/customHooks/useHttp';

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
    },
    false
  );

  const {} = useHttp();

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(formState);
  };

  return (
    <form className='form-add-movie' onSubmit={submitHandler}>
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
      <Button disabled={!formState.isValid} isSecondary>
        Submit
      </Button>
    </form>
  );
}
