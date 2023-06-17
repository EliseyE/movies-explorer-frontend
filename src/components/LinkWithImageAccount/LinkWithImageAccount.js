import React, { useState, useEffect } from "react";
import LinkWithImage from '../LinkWithImage/LinkWithImage';
import './LinkWithImageAccount.css';
import {
  LINK_WITH_IMAGE_LINK,
  LINK_WITH_IMAGE_NAME,
  LINK_WITH_IMAGE_PATH,
  LINK_WITH_IMAGE_WHITE_PATH,
} from './constants';

function LinkWithImageAccount({
  link,
  linkText,
  linkWithImageMod,
  imageMod, linkMod,
  onClick,
  imagePath=LINK_WITH_IMAGE_PATH,
  isWhite
  }) {

  const [image, setImage] = useState(LINK_WITH_IMAGE_PATH);

  useEffect(() => {
    if(isWhite) setImage(LINK_WITH_IMAGE_WHITE_PATH);
    else setImage(LINK_WITH_IMAGE_PATH);
  }, [isWhite]);

  return(
    <LinkWithImage
      link={link || LINK_WITH_IMAGE_LINK}
      linkText={linkText || LINK_WITH_IMAGE_NAME}
      linkWithImageMod={linkWithImageMod || ''}
      imagePath={image || ''}
      imageMod={imageMod || ''}
      linkMod={linkMod || ''}
      onClick={onClick || undefined}
      isWhite={isWhite}
    />
  );
};

export default LinkWithImageAccount;
