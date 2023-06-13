import React from 'react';
import Button from '../Button/Button';
import './ButtonGrey.css';

function ButtonGrey({
  buttonMod ='',
  buttonType,
  onClick,
  text
}) {

  return(
    <Button
      buttonMod={`button-grey ${buttonMod}`}
      buttontype={buttonType}
      onClick={onClick}
      text={text}
    />
  );
}

export default ButtonGrey;
