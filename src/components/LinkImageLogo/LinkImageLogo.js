import React from 'react';
import LinkImage from '../LinkImage/LinkImage';

import './LinkImageLogo.css';
import {
  LINK_IMAGE_LINK,
  LINK_IMAGE_IMG_ALTTEXT,
  LINK_IMAGE_PATH,
} from './constants';


function LinkImageLogo({
  link,
  imagePath = LINK_IMAGE_PATH ,
  altText = 'altText',
  linkImageMod = '',
  linkImageImgMod = '',
  onClick = undefined
  }) {
  return(
    <LinkImage
      link = {link || LINK_IMAGE_LINK}
      imagePath = {imagePath}
      altText = {altText || LINK_IMAGE_IMG_ALTTEXT}
      linkImageMod = {`link-image-logo ${linkImageMod}`}
      linkImageImgMod = {`link-image-logo-img ${linkImageImgMod}`}
      onClick={onClick}
    />
  );
}

export default LinkImageLogo;
