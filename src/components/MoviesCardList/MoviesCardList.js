import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  moviesList=[],
  onMovieSave,
  onMovieSavedDelete,
  moviesCardListMod='',
  moviesCardTypeSaved,
  }) {

  return(
    <div className={`movies-card-list ${moviesCardListMod}`}>
      <ul className='movies-card-list__collection'>
        {
          moviesList.map((movie) => (
            <MoviesCard
              key={movie.movieId}
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
