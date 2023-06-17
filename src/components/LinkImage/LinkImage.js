import React from 'react';
import './LinkImage.css';
import { Link } from 'react-router-dom'

function LinkImage({
  link = '/',
  imagePath='' ,
  altText='altText',
  linkImageMod='',
  linkImageImgMod='',
  onClick = undefined
  }) {
  return(
    <Link to={link} className={`link-image ${linkImageMod}`} onClick={onClick}>
      <img src={imagePath} alt={altText} className={`link-image__image ${linkImageImgMod}`} />
    </Link>
  );
}

export default LinkImage;
