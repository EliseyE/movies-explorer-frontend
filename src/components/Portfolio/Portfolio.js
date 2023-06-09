import React from 'react';
import './Portfolio.css';
import {
  PORTFOLIO__TITLE,
  PORTFOLIO_LINKS_LIST,
  PORTFOLIO__ARROW,
} from './constants'
import { Link } from 'react-router-dom'

function Portfolio({ portfolioMod='' }) {

  return(
    <section className={`portfolio ${portfolioMod}`}>
      <h2 className='portfolio__title'>{PORTFOLIO__TITLE}</h2>
      <nav className='portfolio__nav'>
      {PORTFOLIO_LINKS_LIST.map((item, index) => (
        <li
        className='portfolio__nav-item'
        key={index}>
          <Link to={item.link} className='portfolio__link'>{item.name}</Link>
          <p className='portfolio__link-symbol'>{PORTFOLIO__ARROW}</p>
        </li>
        )
      )}
      </nav>
    </section>
  );
}
export default Portfolio;
