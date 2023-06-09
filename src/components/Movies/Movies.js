import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonGrey from '../ButtonGrey/ButtonGrey';

function Movies({ cardList, onMovieSave, onMovieSavedDelete, onMoreClick }) {
  const [isLoading, setIsLoading] = useState(false);
  const [moviesFilterState, setIsMoviesFilterState] = useState({});


  function handleSetSearchFilter(moviesFilterNewState) {
    setIsMoviesFilterState({...moviesFilterState, ...moviesFilterNewState});
  };

  function handleSearchMovies(searchQuery) {
    console.log(searchQuery);
  };

  useEffect(() => {
    console.log(moviesFilterState);
  }, [moviesFilterState]);

  return(
    <section className='movies'>
      <SearchForm
        name='movies'
        placeholder='Фильм'
        setSearchFilter={handleSetSearchFilter}
        searchMovies={handleSearchMovies}
        formMod='search-form__place_movies'
      />
      <MoviesCardList
        cardList={cardList}
        onMovieSave={onMovieSave}
        onMovieSavedDelete={onMovieSavedDelete}
        moviesCardListMod='movies-card-list_place_movies'
      />
      <ButtonGrey text='Ещё' buttonMod='button-grey__place_movies' onClick={onMoreClick} />
      {isLoading && <Preloader preloaderWheelMod='preloader__wheel_place_movies' /> }
    </section>
  );
}
export default Movies;
