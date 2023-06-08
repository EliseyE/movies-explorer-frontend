import React from 'react';
import './Promo.css';
import {
  PROMO_TITLE_TEXT,
  PROMO_TEXT,
} from './constants.js';
import NavTab from '../NavTab/NavTab';

function Promo() {

  return(
    <section className='promo'>
      <div className='promo__back' />
      <div className='promo__info'>
        <h1 className='promo__title'>{PROMO_TITLE_TEXT}</h1>
        <p className='promo__text'>{PROMO_TEXT}</p>
        <NavTab />
      </div>
      <div className='promo__image' />
    </section>
  );
}
export default Promo;
