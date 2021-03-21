import React from 'react';

import './Button.css';

export default function Button(props) {
  const buttonPrimary = (props.isPrimary && 'button-primary') || '';
  const buttonSecondary = (props.isSecondary && 'button-secondary') || '';
  const buttonDarkblue = (props.isDarkblue && 'button-dark-blue') || '';
  const buttonGreen = (props.isGreen && 'button-green') || '';
  const buttonClear = (props.isClear && 'button-clear') || '';
  const buttonFull = (props.isFull && 'button-full') || '';

  const buttonStyled = [
    buttonPrimary,
    buttonSecondary,
    buttonDarkblue,
    buttonGreen,
    buttonClear,
    buttonFull,
  ].join(' ');

  return (
    <button
      style={props.style}
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      className={`button ${buttonStyled} ${props.className}`}>
      {props.children}
    </button>
  );
}
