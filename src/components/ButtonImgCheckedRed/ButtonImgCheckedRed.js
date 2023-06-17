import React from 'react';
import './ButtonImgCheckedRed.css';
import ButtonImg from '../ButtonImg/ButtonImg';
import {
  IMAGE_CHECKED_RED_PATH,
}
from './constants';

function ButtonImgCheckedRed({ ButtonImgCheckedRedMod='', onClick }) {

  return(
    <ButtonImg
      imagePath={IMAGE_CHECKED_RED_PATH}
      buttonImgMod={`button-img-checked-red ${ButtonImgCheckedRedMod}`}
      onClick={onClick}
    />
  );
}

export default ButtonImgCheckedRed;
