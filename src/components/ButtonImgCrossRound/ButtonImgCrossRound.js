import React from 'react';
import './ButtonImgCrossRound.css';
import ButtonImg from '../ButtonImg/ButtonImg';
import {
  IMAGE_CROSS_SMALL_PATH,
}
from './constants'

function ButtonImgCrossRound({ ButtonImgCrossRoundMod='', onClick }) {

  return(
    <ButtonImg
      imagePath={IMAGE_CROSS_SMALL_PATH}
      buttonImgMod={`button-img-cross__type_round ${ButtonImgCrossRoundMod}`}
      onClick={onClick}
    />
  );
}

export default ButtonImgCrossRound;
