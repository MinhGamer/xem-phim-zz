import React, { useEffect, useState, useRef, setState } from 'react';

import './Select.css';

import { validate, VALIDATOR_REQUIRE } from '../../util/validators';

export default function CustomSelect(props) {
  const { options, label, onChange, type, id } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [errorText, setErrorText] = useState(null);

  const selectRef = useRef();

  const selectOptionHandler = (optionEng, optionVn) => {
    setSelectedOption(optionVn);
    setIsOpen(false);
    onChange({ value: optionEng, type });

    //handle require
    const [isValid, error] = validate(optionEng, [VALIDATOR_REQUIRE()]);
    setErrorText(error.join(' '));

    props.onSelect(id, optionEng, isValid);
  };

  const toggleOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  const renderOptionList = () => {
    return (
      <div className='dropdown-list'>
        {options.map((option) => (
          <div
            key={option.optionValue}
            onClick={() =>
              selectOptionHandler(option.optionValue, option.optionLabel)
            }
            className='dropdown-list--item'>
            {option.optionLabel}
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

// export function Select(props) {
//   const [optionValue, setOptionValue] = useState(null);

//   const changeHandler = (e) => {
//     console.log(e.target.value);
//   };

//   const { id, onInput } = props;
//   useEffect(() => {
//     // onInput(id, optionValue);
//   }, [id, optionValue, onInput]);

//   return (
//     <>
//       <div className='select-field'>
//         <label className='select-label' htmlFor={props.id}>
//           {props.label}
//         </label>
//         <div className='select-control'>
//           {/* use to handle event */}
//           <select
//             style={{ display: 'none' }}
//             id={props.id}
//             onChange={changeHandler}
//             value={optionValue}>
//             {props.options.map((opt) => (
//               <option value={opt.optionValue}>{opt.optionLabel}</option>
//             ))}
//           </select>

//           {/* use to render ONLY */}
//           <CustomSelect options={props.options} />
//         </div>
//       </div>
//     </>
//   );
// }
