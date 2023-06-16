import React from 'react';
import './Header.css';
import LinkImageLogo from '../LinkImageLogo/LinkImageLogo';
import Navigation from '../Navigation/Navigation';
import UserEntryMenu from '../UserEntryMenu/UserEntryMenu';
import LinkWithImageAccount from '../LinkWithImageAccount/LinkWithImageAccount';
import ButtonImgThreeLines from '../ButtonImgThreeLines/ButtonImgThreeLines';
import { NAVIGATION_ITEMS_HEADER } from '../../appConfig';

function Header({ headerMod='', buttonMenuNavClick, isLoggedIn, isColored }) {

  return(
    <header className={`header ${isColored && 'header_color_blue'} ${headerMod}`}>
      <LinkImageLogo linkImageMod='header__logo'/>
      {isLoggedIn &&
        <Navigation
          menuArray={NAVIGATION_ITEMS_HEADER}
          navigationNavMod='navigation_place_header'
          isWhiteText={isColored}
        />}
      {isLoggedIn ?
        <LinkWithImageAccount linkWithImageMod='header__account' isWhite={isColored} />
        : <UserEntryMenu isWhiteText={isColored} />}
      {isLoggedIn &&
        <ButtonImgThreeLines
          onClick={buttonMenuNavClick}
          buttonImgThreeLinesMod='header__button-options'
          isWhite={isColored}
        />
      }
    </header>
  );
}

export default Header;
