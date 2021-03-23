import React, { useState, useEffect, useContext } from 'react';

import Input from '../../shared/components/FormElement/Input';
import Button from '../../shared/components/UI/Button';

import useForm from '../../shared/customHooks/useForm';
import useHttp from '../../shared/customHooks/useHttp';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import ErrorModal from '../../shared/components/UI/ErrorModal';

import { AuthContext } from '../../shared/context/AuthContext';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

import './Auth.css';

export default function Auth() {
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);

  const { formState, inputHandler, setFormData } = useForm(
    {
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

  const { sendRequest, isLoading, error, clearError } = useHttp();

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formState.inputs;

    if (isLoginMode) {
      //login
      const user = {
        email: email.value,
        password: password.value,
      };

      const { token, logginedUser } = await sendRequest(
        'user/login',
        'POST',
        JSON.stringify(user)
      );

      auth.login(token, logginedUser);
    } else {
      //sign up
      const newUser = {
        email: email.value,
        password: password.value,
        name: formState.inputs.name.value,
      };

      const token = await sendRequest(
        'user/signup',
        'POST',
        JSON.stringify(newUser)
      );

      auth.login(newUser.email, token);
    }
  };

  //change from signup to login and vice-versa
  useEffect(() => {
    const { email, password } = formState.inputs;

    if (isLoginMode) {
      setFormData(
        {
          email: {
            value: email.value,
            isValid: email.isValid,
          },
          password: {
            value: password.value,
            isValid: password.isValid,
          },
          name: undefined,
        },
        email.isValid && password.isValid
      );
    } else {
      setFormData(
        {
          email: {
            value: email.value,
            isValid: email.isValid,
          },
          password: {
            value: password.value,
            isValid: password.isValid,
          },
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
  }, [isLoginMode]);

  return (
    <div className='auth'>
      <div className='auth-container'>
        <h1 className='auth-title'>Đăng nhập</h1>
        <div className='auth-card'>
          {error && !isLoading && (
            <ErrorModal error={error} clearError={clearError} />
          )}

          {isLoading && <LoadingSpinner asOverlay />}

          {!isLoading && (
            <form onSubmit={submitHandler} className='auth-form'>
              <Input
                id='email'
                initialValue=''
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                onInput={inputHandler}
                type='email'
                placeholder='Email'
              />

              {!isLoginMode && (
                <Input
                  id='name'
                  initialValue=''
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  type='text'
                  placeholder='Tên bạn'
                />
              )}

              <Input
                id='password'
                initialValue=''
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                onInput={inputHandler}
                type='password'
                placeholder='Password'
              />

              <Button disabled={!formState.isValid} isFull isSecondary>
                {isLoginMode ? 'Đăng nhập' : 'Đăng ký'}
              </Button>
              <div className='auth-form__divied'>
                <p className='auth-form__divied-text'>Hoặc</p>
              </div>
              <Button isFull isPrimary>
                <i class='fab fa-google'></i>
                Đăng nhập với Google
              </Button>
            </form>
          )}
        </div>

        <h1
          onClick={() => setIsLoginMode(!isLoginMode)}
          className='auth-signup'>
          {isLoginMode ? 'Đăng ký' : 'Đăng nhập'}
        </h1>
      </div>
    </div>
  );
}
