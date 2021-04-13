import React from 'react';

import './LoadingSpinner.css';

export default function LoadingSpinner(props) {
  const asOverlay = props.asOverlay && 'loading-spinner__asOverlay';

  const { size } = props;

  return (
    <>
      {!size && (
        <div className={`loading-spinner ${asOverlay}`}>
          <div class='lds-ring'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      {size === 'small' && (
        <div class='loadingio-spinner-spinner-iwv4kdqcy0a'>
          <div class='ldio-gebpxgoa6jp'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
}
