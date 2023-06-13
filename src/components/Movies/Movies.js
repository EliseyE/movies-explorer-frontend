import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

// TEMPORARY DATA
import { dataArray } from '../../utils/data'

function Movies() {
  const [isLoading, setIsLoading] = useState(false);
  const [moviesFilterState, setIsMoviesFilterState] = useState({});


  function handleSetSearchFiltert(moviesFilterNewState) {
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
        setSearchFilter={handleSetSearchFiltert}
        searchMovies={handleSearchMovies}
        formMod='search-form__place_movies'
      />
      <MoviesCardList cardList={dataArray} moviesCardListMod='movies-card-list_place_movies' />
      {isLoading && <Preloader preloaderWheelMod='preloader__wheel_place_movies' /> }
    </section>
  );
}
export default Movies;
