import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';


function SavedMovies({ onMovieSavedDelete, cardList }) {

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
    <section className='saved-movies'>
      <SearchForm
        name='movies'
        placeholder='Фильм'
        setSearchFilter={handleSetSearchFilter}
        searchMovies={handleSearchMovies}
        formMod='search-form__place_saved-movies'
      />
      <MoviesCardList
        cardList={cardList}
        moviesCardTypeSaved={true}
        onMovieSavedDelete={onMovieSavedDelete}
        moviesCardListMod='movies-card-list_place_saved-movies'
      />
      {isLoading && <Preloader preloaderWheelMod='preloader__wheel_place_saved-movies' /> }
    </section>
  );
}
export default SavedMovies;
