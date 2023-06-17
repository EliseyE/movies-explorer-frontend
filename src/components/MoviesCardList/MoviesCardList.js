import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';



function MoviesCardList({
  cardList=[],
  onMovieSave,
  onMovieSavedDelete,
  moviesCardListMod='',
  moviesCardTypeSaved
  }) {

  return(
    <div className={`movies-card-list ${moviesCardListMod}`}>
      <ul className='movies-card-list__collection'>
        {
            cardList.map((movie) => (
              <MoviesCard
                key={movie.id}
                movie={movie}
                onMovieSave={onMovieSave}
                onMovieSavedDelete={onMovieSavedDelete}
                moviesCardTypeSaved={moviesCardTypeSaved}
            />))
          }
        </ul>
    </div>
  );
}
export default MoviesCardList;
