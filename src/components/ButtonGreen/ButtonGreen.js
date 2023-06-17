import React from 'react';
import Button from '../Button/Button';
import './ButtonGreen.css';

function ButtonGreen({
  buttonMod ='',
  buttonType,
  onClick=undefined,
  text
}) {

  return(
    <Button
      buttonMod={`button-green ${buttonMod}`}
      buttontype={buttonType}
      onClick={onClick}
      text={text}
    />
  );
}

export default ButtonGreen;
