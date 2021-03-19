import React from 'react';

import './LoadingSpinner.css';

export default function LoadingSpinner(props) {
  const asOverlay = props.asOverlay && 'loading-spinner__asOverlay';

  return (
    <div className={asOverlay}>
      <div class='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
