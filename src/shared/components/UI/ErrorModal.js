import React from 'react';

import './ErrorModal.css';

import Modal from './Modal';
import Button from './Button';

export default function ErrorModal(props) {
  const errorModal = (
    <Modal showed={props.error} backdropClick={props.clearError}>
      <p className='modal-error__title'>An Error Occured!</p>
      <p className='modal-error__content'>{props.error}</p>
      <p className='modal-error__footer'>
        <Button onClick={props.clearError} isDarkblue>
          OK
        </Button>
      </p>
    </Modal>
  );

  return <>{errorModal}</>;
}
