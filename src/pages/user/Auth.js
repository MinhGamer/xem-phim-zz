import React, { useState, useEffect, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { GoogleLogin } from 'react-google-login';

import Input from '../../shared/components/FormElement/Input';
import Button from '../../shared/components/UI/Button';

import useForm from '../../shared/customHooks/useForm';
import useHttp from '../../shared/customHooks/useHttp';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import ErrorModal from '../../shared/components/UI/ErrorModal';

import { AuthContext } from '../../shared/context/AuthContext';

import refreshToken from '../../shared/util/refreshToken';

import {
  actLoginWithGoogle,
  actSignUpUser,
  actLoginUser,
} from '../../redux/actionCreator/userActions';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

import { LOCAL_STORAGE_KEY, OAUTH_CLIENT_KEY } from '../../shared/util/config';

import './Auth.css';
import { connect } from 'react-redux';

function Auth(props) {
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

  const { error, clearError, sendUser } = useHttp();

  const { isLoading, isLoggined } = props;

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formState.inputs;

    if (isLoginMode) {
      //login
      props.loginUser({
        email: email.value,
        password: password.value,
      });
    } else {
      //sign up
      props.signUpUser({
        email: email.value,
        password: password.value,
        name: formState.inputs.name.value,
      });
    }
  };

  const onLoginGoogleSuccess = async (res) => {
    //token from google sign-in
    const { tokenId } = res;
    //after sign-in with google
    //-> send to back-end to login to fetch user movie list

    props.loginWithGoogle(tokenId);

    localStorage.setItem(LOCAL_STORAGE_KEY, tokenId);
  };

  const onLoginGoogleFail = (res) => {
    console.log('Login failed: res:', res);
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

  const renderFormLogin = () => {
    let formCard;

    if (isLoggined) {
      formCard = (
        <>
          <h1 className='auth-title__success-login'>
            B???n ???? ????ng nh???p th??nh c??ng
          </h1>
          <Button onClick={() => history.push('/')} isFull isSecondary>
            Quay v??? trang ch???
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
              placeholder='T??n b???n'
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
            {isLoginMode ? '????ng nh???p' : '????ng k??'}
          </Button>
          <div className='auth-form__divied'>
            <p className='auth-form__divied-text'>Ho???c</p>
          </div>

          <GoogleLogin
            render={(renderProps) => (
              <Button
                isFull
                isPrimary
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}>
                <i class='fab fa-google'></i>
                ????ng nh???p v???i Google
              </Button>
            )}
            clientId={OAUTH_CLIENT_KEY}
            buttonText='Login'
            onSuccess={onLoginGoogleSuccess}
            onFailure={onLoginGoogleFail}
            cookiePolicy={'single_host_origin'}
          />
        </form>
      );
    }

    return formCard;
  };

  return (
    <div className='auth'>
      <div className='auth-container'>
        <h1 className='auth-title'>{!auth.isLoggedIn && '????ng nh???p'}</h1>
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
            {isLoginMode ? '????ng k??' : '????ng nh???p'}
          </h1>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    isLoggined: state.userReducer.isLoggined,
    isLoading: state.userReducer.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginWithGoogle: (token, user) => dispatch(actLoginWithGoogle(token, user)),
    signUpUser: (newUser) => dispatch(actSignUpUser(newUser)),
    loginUser: (user) => dispatch(actLoginUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
