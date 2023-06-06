import React from 'react';
import './UserEntryMenu.css';
import ButtonGreen from '../ButtonGreen/ButtonGreen';
import { Link } from 'react-router-dom'

import {
  USERENTRYMENU_LINK1_URL,
  USERENTRYMENU_LINK1_TEXT,
  USERENTRYMENU_LINK2_URL,
  USERENTRYMENU_LINK2_TEXT,
} from './constants';


function UserEntryMenu() {

  return(
    <nav className='user-entry-menu'>
      <Link to={USERENTRYMENU_LINK1_URL} className='user-entry-menu__link' >
      {USERENTRYMENU_LINK1_TEXT}
      </Link>
      <Link to={USERENTRYMENU_LINK2_URL} >
        <ButtonGreen text={USERENTRYMENU_LINK2_TEXT} buttonMod='user-entry-menu__signin-button'/>
      </Link>
    </nav>
  );
}

export default UserEntryMenu;
