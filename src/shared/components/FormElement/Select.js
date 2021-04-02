import React, {
  useEffect,
  useState,
  useRef,
  setState,
  useCallback,
} from 'react';

import './Select.css';

import { validate, VALIDATOR_REQUIRE } from '../../util/validators';

export default function CustomSelect(props) {
  const { options, label, id, onChange, optionId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [errorText, setErrorText] = useState(null);

  //when query for history location change
  useEffect(() => {
    if (!optionId) {
      setSelectedOption('Tất cả');
    }

    console.log(optionId);

    const index = options.findIndex((opt) => opt.id === optionId);

    if (index === -1) return;

    setSelectedOption(options[index].name);
  }, [optionId]);

  const selectRef = useRef();

  const selectOptionHandler = (optionId, name) => {
    setSelectedOption(name);
    setIsOpen(false);

    //handle require
    const [isValid, error] = validate(name, [VALIDATOR_REQUIRE()]);
    setErrorText(error.join(' '));

    console.log(optionId);

    // id: genres, language ... to define type of filter
    //optionId: Ex: 28 - 'Hành động" : config by server
    onChange(id, optionId, isValid);
  };

  const toggleOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  const renderOptionList = () => {
    return (
      <div className='dropdown-list'>
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => selectOptionHandler(option.id, option.name)}
            className='dropdown-list--item'>
            {option.name}
          </div>
        ))}
      </div>
    );
  };

  const clickOutSideHandler = (e) => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutSideHandler);
  }, []);

  return (
    <div ref={selectRef} className='custom-select'>
      <div className='custom-select-label'>{label}</div>
      <div onClick={toggleOpenHandler} className='dropdown-header'>
        <div> {selectedOption || '- Tất cả -'}</div>
        <i class='fa fa-chevron-down arrow-expand'></i>
      </div>
      {props.required && errorText && (
        <div className='custom-select__error-text'>{errorText}</div>
      )}
      {isOpen && renderOptionList()}
    </div>
  );
}
