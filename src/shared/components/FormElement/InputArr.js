import React, { useState, useCallback, useEffect } from 'react';

import './InputArr.css';

import { VALIDATOR_REQUIRE } from '../../util/validators';

import Input from './Input';

export default function InputArr(props) {
  //   const { formState, inputHandler } = useForm();
  const [count, setCount] = useState(1);
  const [inputArr, setInputArr] = useState([]);
  const { id, onInput } = props;

  const inputHandler = (index, value, isValid) => {
    // console.log(index, value, isValid);
    const updateInputArr = [...inputArr];
    updateInputArr[index] = value;
    setInputArr(updateInputArr);
  };

  useEffect(() => {
    const isValid = inputArr.length > 0 && inputArr[0].trim() !== '';

    // console.log(inputArr, isValid, props.onInput);
    onInput(id, inputArr, isValid);
  }, [inputArr, onInput]);

  const rendersInputTrailers = useCallback(() => {
    let inputTrailers = [];

    for (let i = 0; i < count; i++) {
      inputTrailers.push(
        <Input
          id={`${i}`}
          label={`Link ${id} ${i + 1}`}
          initialValue=''
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          type='text'
        />
      );
    }

    return inputTrailers;
  }, [count]);

  const addInput = () => {
    setCount((prevCount) => ++prevCount);
  };

  const removeInput = () => {
    if (count <= 1) return;
    setCount((prevCount) => --prevCount);
  };

  return (
    <div className='input-arr'>
      <div>{rendersInputTrailers()}</div>
      <i onClick={addInput} class='fa fa-plus'></i>
      {count > 1 && <i onClick={removeInput} class='fa fa-minus'></i>}
    </div>
  );
}
