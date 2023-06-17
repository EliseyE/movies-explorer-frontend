import React from 'react';
import './AboutMe.css';
import {
  ABOUT_ME_PHOTO,
  ABOUT_ME_TITLE,
  ABOUT_ME_NAME,
  ABOUT_ME_BRIEF,
  ABOUT_ME_BIOGRAFY,
  ABOUT_ME_GIT_LINK,
  ABOUT_ME_GIT_LINK_TEXT,
} from './constants'
import ArticlePage from '../ArticlePage/ArticlePage';
import { Link } from 'react-router-dom'

function AboutMe({ aboutMeMod='' }) {

  return(
    <section className={`about-me ${aboutMeMod}`}>
      <ArticlePage articlePageMod='about-me' articleName={ABOUT_ME_TITLE}>
        <div className='about-me__container'>
          <div className='about-me__info'>
            <h3 className='about-me__name'>{ABOUT_ME_NAME}</h3>
            <p className='about-me__brief'>{ABOUT_ME_BRIEF}</p>
            <p className='about-me__biografy'>{ABOUT_ME_BIOGRAFY}</p>
            <nav>
              <Link
                className='about-me__link'
                target='_blank'
                to={ABOUT_ME_GIT_LINK} >{ABOUT_ME_GIT_LINK_TEXT}</Link>
            </nav>
          </div>
          <img
            className='about-me__photo'
            src={ABOUT_ME_PHOTO}
            alt={`Фотография ${ABOUT_ME_NAME}`}
          />
          </div>
      </ArticlePage>
    </section>
  );
}

export default AboutMe;
