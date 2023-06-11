import React from 'react';
import Button from '../Button/Button';
import './ButtonBlueEllipse.css';

function ButtonBlueEllipse({
  buttonMod ='',
  buttonType='submit',
  onClick=undefined,
  text
}) {

  return(
    <Button
      buttonMod={`button-blue-ellipse ${buttonMod}`}
      buttonType={buttonType}
      onClick={onClick}
      text={text}
    />
  );
}

export default ButtonBlueEllipse;
