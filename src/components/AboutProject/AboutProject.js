import React from 'react';
import './AboutProject.css';
import {
  ABOUT_PROJECT_TITLE,
  ABOUT_PROJECT_ID,
  ABOUT_PROJECT_POINTS,
} from './constants'
import ArticlePage from '../ArticlePage/ArticlePage';

function AboutProject({ aboutProjectMod='' }) {

  return(
    <section className={`about-project ${aboutProjectMod}`}>
      <ArticlePage
        articleName={ABOUT_PROJECT_TITLE}
        articlePageId={ABOUT_PROJECT_ID}>

        <ul className='collection-points'>
        {ABOUT_PROJECT_POINTS.map((item, index) => (
          <li
            className='collection-points__item'
            key={index}
          >
            <h3 className='collection-points__title'>{item.title}</h3>
            <p className='collection-points__text'>{item.text}</p>
          </li>
          )
        )}
        </ul>
        <ul className='list infographic'>
          <li className='infographic__item'>
            <p className='infographic__period infographic__period_type_green'>1 неделя</p>
            <p className='infographic__name'>Back-end</p>
          </li>
          <li className='infographic__list'>
            <p className='infographic__period'>4 недели</p>
            <p className='infographic__name'>Front-end</p>
          </li>
        </ul>
      </ArticlePage>
    </section>
  );
}

export default AboutProject;
