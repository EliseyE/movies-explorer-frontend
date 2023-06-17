import React from 'react';
import Button from '../Button/Button';
import './ButtonBlue.css';

function ButtonBlue({
  buttonMod ='',
  buttonType,
  onClick,
  text,
  isDisabled
}) {

  return(
    <Button
      buttonMod={`button-blue ${buttonMod}`}
      buttonType={buttonType}
      onClick={onClick}
      text={text}
      isDisabled={isDisabled}
    />
  );
}

export default ButtonBlue;
