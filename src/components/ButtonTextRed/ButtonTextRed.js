import React from 'react';
import './ButtonTextRed.css';

function ButtonTextRed({
  text='Кнопка',
  buttonMod='',
  buttonType='button',
  onClick=undefined
  }) {

  return(
    <button className={`button-text-red ${buttonMod}`} type={buttonType} onClick={onClick}>
      {text}
    </button>
  );
}

export default ButtonTextRed;
