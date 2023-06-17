import React, { useState } from 'react';
import './ToggleSwitch.css';

function ToggleSwitch({ isDefaultState=false, onToggle, name='Toggle' }) {

  const [isActive, setIsActive] = useState(isDefaultState);

  const handleClick = () => {
    setIsActive(!isActive);
    onToggle(!isActive);
  }

  return (
    <div onClick={handleClick} className="toggle-switch">
      <div className={`toggle-switch__slider ${isActive ? 'active' : ''}`} />
        <label className='toggle__checkbox'>
          {name}
          <input type="checkbox" role='switch' onChange={handleClick} />
        </label>
    </div>

  );
}

export default ToggleSwitch;
