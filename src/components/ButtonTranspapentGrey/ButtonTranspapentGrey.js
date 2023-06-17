import React from 'react';
import Button from '../Button/Button';
import './ButtonTranspapentGrey.css';

function ButtonTranspapentGrey({
  buttonMod ='',
  buttonType,
  onClick=undefined,
  text
}) {

  return(
    <Button
      buttonMod={`button-transparent-grey ${buttonMod}`}
      buttontype={buttonType}
      onClick={onClick}
      text={text}
    />
  );
}

export default ButtonTranspapentGrey;
