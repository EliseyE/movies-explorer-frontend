import React from 'react';
import './ButtonText.css';

function ButtonText({
  text='Кнопка',
  buttonMod='',
  buttonType='button',
  onClick=undefined,
  }) {

  return(
    <button className={`button-text ${buttonMod}`} type={buttonType} onClick={onClick} >
      {text}
    </button>
  );
}

export default ButtonText;
