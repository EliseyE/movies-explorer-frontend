import React from 'react';
import './ButtonThreeLines.css';
import ButtunWithImage from '../ButtunWithImage/ButtunWithImage';
import {
  IMAGE_THREE_LINES_PATH,
}
from './constants'

function ButtonThreeLines({buttonThreeLinesMod=''}) {

  return(
    <ButtunWithImage imagePath={IMAGE_THREE_LINES_PATH} buttonWithImageMod={buttonThreeLinesMod}/>
  );
}

export default ButtonThreeLines;
