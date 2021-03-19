import React from 'react';

import ReactDOM from 'react-dom';

import './Backdrop.css';

export default function Backdrop(props) {
  const backdrop = <div onClick={props.onClick} className='backdrop'></div>;

  return ReactDOM.createPortal(
    backdrop,
    document.getElementById('backdrop-hook')
  );
}
