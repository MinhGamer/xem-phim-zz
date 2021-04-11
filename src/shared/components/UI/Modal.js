import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

import Backdrop from './Backdrop';

import { CSSTransition } from 'react-transition-group';

export default function Modal(props) {
  const { showed, backdropClick, className } = props;

  const modal = (
    <>
      {showed && <Backdrop onClick={backdropClick} />}
      <CSSTransition
        in={showed}
        timeout={500}
        mountOnEnter
        unmountOnExit
        classNames='modal'>
        <div className={`modal ${className}`}>{props.children}</div>
      </CSSTransition>
    </>
  );

  return ReactDOM.createPortal(modal, document.getElementById('modal-hook'));
}
