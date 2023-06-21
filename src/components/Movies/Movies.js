import React, { useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonGrey from '../ButtonGrey/ButtonGrey';

function Movies({
    foundMovies,
    onMovieSave,
    onMovieSavedDelete,
    onMoreClick,
    onSearchMovies,
    filterState,
    searchQueryState,
    message
  }) {

  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(filterState);


  function handleSetSearchFilter(moviesFilterNewState) {
    setFilter(moviesFilterNewState);
  };

  async function handleSearchMovies(searchQuery) {
    setIsLoading(true);
    await onSearchMovies(searchQuery, filter);
    setIsLoading(false);
  };

  return(
    <section className='movies'>
      <SearchForm
        name='movies'
        placeholder='Фильм'
        setSearchFilter={handleSetSearchFilter}
        searchMovies={handleSearchMovies}
        filterState={filter}
        searchQueryState={searchQueryState}
        formMod='search-form__place_movies'
      />
      {!isLoading &&
      <>
        {
          (foundMovies.length === 0 && searchQueryState) &&
          <span className='movies__message'>{message}</span>
        }
        { (foundMovies.length > 0) &&
          <MoviesCardList
            moviesList={foundMovies}
            onMovieSave={onMovieSave}
            onMovieSavedDelete={onMovieSavedDelete}
            moviesCardListMod='movies-card-list_place_movies'
          />
        }

          <ButtonGrey text='Ещё' buttonMod='button-grey__place_movies' onClick={onMoreClick} />
        </>
      }
      {isLoading && <div className='movies__preloader-container'><Preloader /></div> }
    </section>
  );
}
export default Movies;
