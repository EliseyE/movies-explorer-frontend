import React from "react";
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

  const imageDefaultPath = isWhite ? LINK_WITH_IMAGE_WHITE_PATH : LINK_WITH_IMAGE_PATH;

  return(
    <LinkWithImage
      link={link || LINK_WITH_IMAGE_LINK}
      linkText={linkText || LINK_WITH_IMAGE_NAME}
      linkWithImageMod={linkWithImageMod || ''}
      imagePath={imageDefaultPath || ''}
      imageMod={imageMod || ''}
      linkMod={linkMod || ''}
      onClick={onClick || undefined}
      isWhite={isWhite}
    />
  );
};

export default LinkWithImageAccount;
