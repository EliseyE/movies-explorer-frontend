import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom'
import { NAVIGATION_INITIL_LINKS } from './constants'

function Navigation({navigationNavMod = '', navigationLinkMod = '', menuArray = NAVIGATION_INITIL_LINKS}) {

  return(
    <nav className={`navigation ${navigationNavMod}`}>
      {menuArray.map((item, index) => (
        <NavLink
          key={index}
          className={({isActive}) => `navigation__link ${navigationLinkMod} ${isActive ? "navigation__link_active" : ""}`}
          to={item.link} >{item.name}</NavLink>
        )
      )}
    </nav>
  );
}

export default Navigation;
