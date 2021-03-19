import React from 'react';

import './Button.css';

export default function Button(props) {
  const buttonPrimary = (props.isPrimary && 'button-primary') || '';
  const buttonSecondary = (props.isSecondary && 'button-secondary') || '';
  const buttonDarkblue = (props.isDarkblue && 'button-dark-blue') || '';

  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`button ${
        buttonPrimary || buttonSecondary || buttonDarkblue
      }`}>
      {props.children}
    </button>
  );
}
