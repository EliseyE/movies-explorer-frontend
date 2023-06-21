import React, { useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';


function SavedMovies({
  onMovieSavedDelete,
  moviesList,
  filterState,
  searchQueryState,
  onSearchMovies
  }) {

  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(filterState);


  function handleSetSearchFilter(moviesFilterNewState) {
    setFilter(moviesFilterNewState);
  };

  function handleSearchMovies(searchQuery) {
    setIsLoading(true);
    onSearchMovies(searchQuery, filter);
    setIsLoading(false);
  };

  return(
    <section className='saved-movies'>
      <SearchForm
        name='movies'
        placeholder='Фильм'
        setSearchFilter={handleSetSearchFilter}
        searchMovies={handleSearchMovies}
        formMod='search-form__place_saved-movies'
        filterState={filter}
        searchQueryState={searchQueryState}
      />
      <MoviesCardList
        moviesList={moviesList}
        moviesCardTypeSaved={true}
        onMovieSavedDelete={onMovieSavedDelete}
        moviesCardListMod='movies-card-list_place_saved-movies'
      />
      {isLoading && <Preloader preloaderWheelMod='preloader__wheel_place_saved-movies' /> }
    </section>
  );
}
export default SavedMovies;
