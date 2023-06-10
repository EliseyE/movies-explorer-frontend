import React from 'react';
import './ButtonImgThreeLines.css';
import ButtonImg from '../ButtonImg/ButtonImg';
import {
  IMAGE_THREE_LINES_PATH,
}
from './constants'

function ButtonImgThreeLines({ buttonImgThreeLinesMod='', onClick }) {

  return(
    <ButtonImg
      imagePath={IMAGE_THREE_LINES_PATH}
      buttonImgMod={buttonImgThreeLinesMod}
      onClick={onClick}
    />
  );
}

export default ButtonImgThreeLines;
