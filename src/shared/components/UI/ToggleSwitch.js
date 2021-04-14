import React, { useState, useEffect } from 'react';

import './ToggleSwitch.css';

function ToggleSwitch(props) {
  const [isChecked, setIsChecked] = useState(false);

  const { defaultChecked, onClick } = props;

  const clickHanlder = () => {
    setIsChecked(!isChecked);
    onClick();
  };

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, []);

  return (
    <div className='toogle-switch'>
      <label className='switch'>
        <span
          className={`slider round ${isChecked ? 'checked' : ''}`}
          onClick={clickHanlder}></span>
      </label>
    </div>
  );
}

export default React.memo(ToggleSwitch);
