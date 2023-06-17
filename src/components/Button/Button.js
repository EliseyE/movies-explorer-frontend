import React from 'react';
import './Button.css';

function Button({
  text='Кнопка',
  buttonMod='',
  buttonType='button',
  onClick=undefined,
  isDisabled
  }) {

  return(
    <button className={`button ${buttonMod}`} type={buttonType} onClick={onClick} disabled={isDisabled}>
      {text}
    </button>
  );
}

export default Button;
