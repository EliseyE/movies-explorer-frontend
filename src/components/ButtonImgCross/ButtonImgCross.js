import React from 'react';
import './ButtonImgCross.css';
import ButtonImg from '../ButtonImg/ButtonImg';
import {
  IMAGE_CROSS_PATH,
}
from './constants'

function ButtonImgCross({ buttonImgCrossMod='', onClick }) {

  return(
    <ButtonImg
      imagePath={IMAGE_CROSS_PATH}
      buttonImgMod={buttonImgCrossMod}
      onClick={onClick}
    />
  );
}

export default ButtonImgCross;
