import React from 'react';

import './Button.css';

export default function Button(props) {
  const buttonPrimary = (props.isPrimary && 'button-primary') || '';

  return (
    <button onClick={props.onClick} className={`button ${buttonPrimary}`}>
      {props.children}
    </button>
  );
}
