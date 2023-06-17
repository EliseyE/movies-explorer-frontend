import React from 'react';
import './HelloPage.css';
import LinkImageLogo from '../LinkImageLogo/LinkImageLogo';
import SingleMenu from "../SingleMenu/SingleMenu";

function HelloPage({
  children,
  singleMenuText,
  singleMenuLink,
  singleMenuLinkText,
  singleMenuMod,
  }) {

  return(
    <div className='hello-page'>
      <LinkImageLogo linkImageMod='link-image-logo_place_hello-page' />
      {children}
      <SingleMenu
        text={singleMenuText}
        link={singleMenuLink}
        linkText={singleMenuLinkText}
        singleMenuMod={`single-menu_place_hello-page ${singleMenuMod}`}
      />
    </div>
  );
}
export default HelloPage;
