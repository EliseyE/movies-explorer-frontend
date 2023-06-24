import React from 'react';
import './Promo.css';
import {
  PROMO_TITLE_TEXT,
  PROMO_TEXT,
  PROMO_IMG_PATH,
} from './constants.js';
import NavTab from '../NavTab/NavTab';

function Promo({promoMod=''}) {

  return(
    <section className={`promo ${promoMod}`}>
      <div className='promo__info'>
        <h1 className='promo__title'>{PROMO_TITLE_TEXT}</h1>
        <p className='promo__text'>{PROMO_TEXT}</p>
        <NavTab />
      </div>
      <div
        className='promo__image'
        style={{ backgroundImage: `url('${PROMO_IMG_PATH}')` }}
      />
    </section>
  );
}
export default Promo;
