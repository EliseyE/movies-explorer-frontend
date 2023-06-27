import React from 'react';
import Button from '../Button/Button';
import './ButtonBlueEllipse.css';

function ButtonBlueEllipse({
  buttonMod ='',
  buttonType='',
  onClick=undefined,
  text,
  isDisabled
}) {

  return(
    <Button
      buttonMod={`button-blue-ellipse ${buttonMod}`}
      buttonType={buttonType}
      onClick={onClick}
      text={text}
      isDisabled={isDisabled}
    />
  );
}

export default ButtonBlueEllipse;
