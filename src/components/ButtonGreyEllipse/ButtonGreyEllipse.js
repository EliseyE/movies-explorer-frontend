import React from 'react';
import Button from '../Button/Button';
import './ButtonGreyEllipse.css';

function ButtonGreyEllipse({
  buttonMod ='',
  buttonType='',
  onClick,
  text
}) {

  return(
    <Button
      buttonMod={`button-grey-ellipse ${buttonMod}`}
      buttonType={buttonType}
      onClick={onClick}
      text={text}
    />
  );
}

export default ButtonGreyEllipse;
