import React from 'react';
import './NotFoundPage.css';
import {
  Link,
} from 'react-router-dom';

function NotFoundPage({ notFoundPageMod='' }) {

  return(
    <section className={`not-found-page ${notFoundPageMod}`} >
        <div className='not-found-page__info' >
          <h1 className='not-found-page__title' >404</h1>
          <p className='not-found-page__subtitle' >Страница не найдена</p>
          <Link to={-1} className='not-found-page__link' >Назад</Link>
        </div>
    </section>
  );
}
export default NotFoundPage;
