import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';
import { singleMovie } from '../../utils/data'

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
      <MoviesCard movie={singleMovie} />
      {isLoading && <Preloader preloaderWheelMod='preloader__wheel_place_movies' /> }
    </section>
  );
}
export default Movies;
