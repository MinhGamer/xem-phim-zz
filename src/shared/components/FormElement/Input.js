import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';

import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE': {
      const [isValid, errorText] = validate(action.val, action.validators);

      return {
        ...state,
        value: action.val,

        //validate value here
        isValid,
        errorText,
      };
    }

    case 'TOUCH': {
      const [isValid, errorText] = validate(action.val, action.validators);

      return {
        ...state,
        isTouched: true,
        isValid,
        errorText,
      };
    }

    default:
      return state;
  }
};

export default function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false,
    errorText: [],
  });

  const changeHandler = (e) => {
    dispatch({
      type: 'CHANGE',
      val: e.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = (e) => {
    dispatch({
      type: 'TOUCH',
      val: e.target.value,
      validators: props.validators,
    });
  };

  const { id, onInput } = props;
  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
    console.log('render', id);
  }, [id, inputState.value, inputState.isValid, onInput]);

  //set style for form control
  const validStyle =
    inputState.isTouched && inputState.isValid && 'form-control--valid';
  const invalidStyle =
    inputState.isTouched && !inputState.isValid && 'form-control--invalid';
  const formControlStyle = ['form-control', validStyle, invalidStyle].join(' ');

  return (
    <>
      <div className={` ${formControlStyle}`}>
        <label htmlFor={props.id}>{props.label}</label>
        <input
          className='form-input'
          placeholder={props.placeholder}
          type={props.type}
          id={props.id}
          onBlur={touchHandler}
          onChange={changeHandler}
          value={inputState.value}
        />
        {/* Error text */}
        {inputState.isTouched && !inputState.isValid && (
          <p className='form-control__error-text'>
            {inputState.errorText.join(' / ')}
          </p>
        )}
      </div>
    </>
  );
}
