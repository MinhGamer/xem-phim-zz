import React, { useState, useEffect, useContext } from 'react';

import { useHistory } from 'react-router-dom';

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

import { LOCAL_STORAGE_KEY } from '../../shared/util/config';

import { signInWithGoogle } from '../../service/firebase';

import './Auth.css';

export default function Auth() {
  const auth = useContext(AuthContext);

  const history = useHistory();

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

  const { sendRequest, isLoading, error, clearError, sendUser } = useHttp();

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formState.inputs;

    if (isLoginMode) {
      //login
      const user = {
        email: email.value,
        password: password.value,
      };

      const { token, logginedUser } = await sendUser(
        'user/login',
        'POST',
        JSON.stringify(user)
      );

      console.log(token, logginedUser);

      auth.login(token, logginedUser);

      saveTokenLocalStorage(`Bearer ${token}`);
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

  const saveTokenLocalStorage = (token) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(token));
  };

  console.log(auth);
  //auto login read token from local storage
  useEffect(() => {
    const fetchUser = async () => {
      //get token from local storage
      const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      const data = await sendUser('user', 'GET', null, {
        Authorization: token,
      });
      auth.login(token, data.user);
    };
    fetchUser();
  }, []);

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

  const renderFormLogin = () => {
    let formCard;

    if (auth.isLoggedIn) {
      formCard = (
        <>
          <h1 className='auth-title__success-login'>
            Bạn đã đăng nhập thành công
          </h1>
          <Button onClick={() => history.push('/')} isFull isSecondary>
            Quay về trang chủ
          </Button>
        </>
      );
    } else {
      formCard = !isLoading && (
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
            Đăng nhập với Google onClick={signInWithGoogle}
          </Button>
        </form>
      );
    }

    return formCard;
  };

  return (
    <div className='auth'>
      <div className='auth-container'>
        <h1 className='auth-title'>{!auth.isLoggedIn && 'Đăng nhập'}</h1>
        <div className='auth-card'>
          {error && !isLoading && (
            <ErrorModal error={error} clearError={clearError} />
          )}

          {isLoading && <LoadingSpinner asOverlay />}

          {renderFormLogin()}
        </div>

        {!auth.isLoggedIn && (
          <h1
            onClick={() => setIsLoginMode(!isLoginMode)}
            className='auth-signup'>
            {isLoginMode ? 'Đăng ký' : 'Đăng nhập'}
          </h1>
        )}
      </div>
    </div>
  );
}
