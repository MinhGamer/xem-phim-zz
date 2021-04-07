import React from 'react';

import './UserForm.css';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../shared/util/validators';

import Input from '../../../shared/components/FormElement/Input';
import Button from '../../../shared/components/UI/Button';

import useForm from '../../../shared/customHooks/useForm';

export default function UserForm() {
  const { formState, inputHandler } = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className='user-form-container'>
      <h1>Thêm người dùng</h1>

      <form onSubmit={submitHandler} className='user-form'>
        <Input
          id='name'
          initialValue=''
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          type='text'
          label={'Tên'}
        />

        <Input
          id='email'
          initialValue=''
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          onInput={inputHandler}
          type='text'
          label={'Email'}
        />

        <Input
          id='password'
          initialValue=''
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
          onInput={inputHandler}
          type='password'
          label={'Mật khẩu'}
        />

        <Button isSecondary>Thêm</Button>
      </form>
    </div>
  );
}
