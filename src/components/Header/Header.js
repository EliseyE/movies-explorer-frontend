import React from 'react';
import './Header.css';
import LinkImageLogo from '../LinkImageLogo/LinkImageLogo';
import Navigation from '../Navigation/Navigation';
import UserEntryMenu from '../UserEntryMenu/UserEntryMenu';
import LinkWithImageAccount from '../LinkWithImageAccount/LinkWithImageAccount';
import ButtonThreeLines from '../ButtonThreeLines/ButtonThreeLines';
import { NAVIGATION_ITEMS_HEADER } from '../../appConfig';

function Header({headerMod=''}) {

  const isLoggedIn = false;

  return(
    <header className={`header ${!isLoggedIn && 'header_color_blue'} ${headerMod}`}>
      <LinkImageLogo linkImageMod='header__logo'/>
      {isLoggedIn &&
        <Navigation menuArray={NAVIGATION_ITEMS_HEADER} navigationNavMod='navigation_place_header'/>}
      {isLoggedIn ? <LinkWithImageAccount linkWithImageMod='header__account'/> : <UserEntryMenu />}
      {isLoggedIn && <ButtonThreeLines buttonThreeLinesMod='header__button-options'/>}
    </header>
  );
}

export default Header;
