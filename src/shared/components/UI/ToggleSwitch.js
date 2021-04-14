import React from 'react';

import './ToggleSwitch.css';

function ToggleSwitch(props) {
  // const [isChecked, setIsChecked] = useState(false);
  const { isChecked, onClick } = props;

  return (
    <div className='toogle-switch'>
      <label className='switch'>
        <span
          className={`slider round ${isChecked ? 'checked' : ''}`}
          onClick={onClick}></span>
      </label>
    </div>
  );
}

export default React.memo(ToggleSwitch);
