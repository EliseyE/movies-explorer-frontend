import React from 'react';
import './ButtonImgThreeLines.css';
import ButtonImg from '../ButtonImg/ButtonImg';
import {
  IMAGE_THREE_LINES_PATH,
  IMAGE_THREE_LINES_WHITE_PATH,
}
from './constants'

function ButtonImgThreeLines({ buttonImgThreeLinesMod='', onClick, isWhite }) {

  return(
    <ButtonImg
      imagePath={isWhite ? IMAGE_THREE_LINES_WHITE_PATH : IMAGE_THREE_LINES_PATH}
      buttonImgMod={buttonImgThreeLinesMod}
      onClick={onClick}
    />
  );
}

export default ButtonImgThreeLines;
