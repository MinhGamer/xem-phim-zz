import React from 'react';

import './Button.css';

export default function Button(props) {
  const buttonPrimary = (props.isPrimary && 'button-primary') || '';
  const buttonSecondary = (props.isSecondary && 'button-secondary') || '';

  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`button ${buttonPrimary || buttonSecondary}`}>
      {props.children}
    </button>
  );
}
