import React from 'react';

import useForm from '../../shared/customHooks/useForm';

import Input from '../../shared/components/FormElement/Input';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_NUMBER_ONLY,
} from '../../shared/util/validators';
import Button from '../../shared/components/UI/Button';

import './ContactForm.css';

export default function ContactForm(props) {
  const { onBackToCartClick } = props;
  const { formState, inputHandler, setFormData } = useForm(
    {
      address: {
        value: '',
        isValid: false,
      },
      city: {
        value: '',
        isValid: false,
      },
      phone: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(formState);
  };

  return (
    <form className='contact-form'>
      <h1 className='form-title'>Thông tin nhận hàng</h1>
      <Input
        id='address'
        initialValue=''
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        type='text'
        label='Địa chỉ'
      />
      <Input
        id='city'
        initialValue=''
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        type='text'
        label='Thành phố'
      />
      <Input
        id='phone'
        initialValue=''
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER_ONLY()]}
        onInput={inputHandler}
        type='text'
        label='Số điện thoại'
      />

      <Button onClick={onBackToCartClick} isPrimary>
        Quay lại giỏ hàng
      </Button>
      <Button disabled={!formState.isValid} onClick={submitHandler} isSecondary>
        Mua
      </Button>
    </form>
  );
}
