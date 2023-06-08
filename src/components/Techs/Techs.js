import React from 'react';
import './Techs.css';
import {
  TECHS_PROJECT_TITLE,
  TECHS_PROJECT_PH1,
  TECHS_PROJECT_PH2,
  TECHS_PROJECT_LIST,
} from './constants'
import ArticlePage from '../ArticlePage/ArticlePage';

function Techs() {

  return(
    <ArticlePage articlePageMod='techs' articlePageTitleMod='techs__title' articleName={TECHS_PROJECT_TITLE}>
      <div className='techs__back' />
      <p className='techs__ph1'>{TECHS_PROJECT_PH1}</p>
      <p className='techs__ph2'>{TECHS_PROJECT_PH2}</p>
      <ul className='techs__collection'>
      {TECHS_PROJECT_LIST.map((item, index) => (
        <li
          className='techs__collection-item'
          key={index}
        >{item}</li>
        )
      )}
        <li></li>
      </ul>
    </ArticlePage>
  );
}
export default Techs;
