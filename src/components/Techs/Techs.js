import React from 'react';
import './Techs.css';
import {
  TECHS_TITLE,
  TECHS_PH1,
  TECHS_PH2,
  TECHS_LIST,
} from './constants'
import ArticlePage from '../ArticlePage/ArticlePage';

function Techs({ techsMod='' }) {

  return(
    <section className={`techs ${techsMod}`}>
      <ArticlePage
        articlePageMod='article-page_place_techs'
        articlePageTitleMod='techs__title'
        articleName={TECHS_TITLE}>

        <p className='techs__ph1'>{TECHS_PH1}</p>
        <p className='techs__ph2'>{TECHS_PH2}</p>
        <ul className='techs__collection'>
        {TECHS_LIST.map((item, index) => (
          <li
            className='techs__collection-item'
            key={index}
          >{item}</li>
          )
        )}
        </ul>
      </ArticlePage>
    </section>
  );
}

export default Techs;
