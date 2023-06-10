import React from 'react';
import './PopupMenuNav.css';
import Popup from '../Popup/Popup';
import Navigation from '../Navigation/Navigation';
import LinkWithImageAccount from '../LinkWithImageAccount/LinkWithImageAccount';
import { NAVIGATION_ITEMS_POPUP_MENU } from '../../appConfig';


function PopupMenuNav({ isOpen, onClose }) {

  return(
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      popupMod='popup__position_right'
    >
      <div className='popup-menu-nav'>
        <Navigation
          menuArray={NAVIGATION_ITEMS_POPUP_MENU}
          navigationNavMod='navigation_place_popup-menu-nav'
        />
        <LinkWithImageAccount />
      </div>
    </Popup>
  );
}
export default PopupMenuNav;
