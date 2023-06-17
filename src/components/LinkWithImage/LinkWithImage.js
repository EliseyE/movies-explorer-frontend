import React from "react";
import './LinkWithImage.css';
import { Link } from 'react-router-dom'

function LinkWithImage({
  link='/',
  linkText='link',
  linkWithImageMod='',
  imagePath='',
  imageMod='',
  linkMod='',
  onClick=undefined,
  isWhite
  }) {

  return(
    <nav className={`link-with-image ${linkWithImageMod}`}>
      <Link
        onClick={onClick}
        className={`
        link-with-image__link
        ${isWhite && 'link-with-image__link_color_white'}
        ${linkMod}`}
        to={link} >{linkText}</Link>
      <div
        className={`link-with-image__image ${imageMod}`}
        style={{ backgroundImage: `url('${imagePath}')` }}>
      </div>
    </nav>
  );
};

export default LinkWithImage;
