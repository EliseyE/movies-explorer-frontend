import React from 'react';
import './Footer.css';
import {
  FOOTER_TITLE_TEXT,
  FOOTER_LINK1_URL,
  FOOTER_LINK1_TEXT,
  FOOTER_LINK2_URL,
  FOOTER_LINK2_TEXT,
  FOOTER_YEAR
} from './constants';
import { Link } from 'react-router-dom'


function Footer() {

  return(
    <footer className='footer'>
      <h2 className='footer__title'>{FOOTER_TITLE_TEXT}</h2>

      <div className='footer__info'>
        <p className='footer__copyright'>&copy; {FOOTER_YEAR}</p>
        <nav className='footer__nav'>
          <Link className='footer__link' target='_blank' to={FOOTER_LINK1_URL} >{FOOTER_LINK1_TEXT}</Link>
          <Link className='footer__link' target='_blank' to={FOOTER_LINK2_URL} >{FOOTER_LINK2_TEXT}</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
