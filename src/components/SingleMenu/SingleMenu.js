import React from 'react';
import './SingleMenu.css';
import { Link } from 'react-router-dom'

function SingleMenu({
  text='Do you want change page?',
  link='/',
  linkText='Home page',
  singleMenuMod='',
  textMod='',
  linkMod='',
  onClick=''
  }) {

  return(
    <nav className={`single-menu ${singleMenuMod}`}>
      <p className={`single-menu__text ${textMod}`}>{text}</p>
      <Link onClick={onClick} className={`single-menu__link ${linkMod}`} to={link} >{linkText}</Link>
    </nav>
  );
};

export default SingleMenu;
