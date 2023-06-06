import React from 'react';
import './Button.css';

function Button({
  text='Кнопка',
  buttonMod='',
  buttonType='button',
  onClick=undefined
  }) {

  return(
    <button className={`button ${buttonMod}`} type={buttonType} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
