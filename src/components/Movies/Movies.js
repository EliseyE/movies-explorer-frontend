import React, { useContext } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonGrey from '../ButtonGrey/ButtonGrey';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';

function Movies({
    foundMovies,
    onMovieSave,
    onMovieSavedDelete,
    onMore,
    isMore,
    onSearchMovies,
    filterState,
    searchQueryState,
    message,
    onUpdateFilter,
  }) {

  const isLoading = useContext(IsLoadingContext);

  function handleSetSearchFilter(moviesFilterNewState) {
    onUpdateFilter(moviesFilterNewState);
  };

  async function handleSearchMovies(searchQuery) {
    await onSearchMovies(searchQuery);
  };

  return(
      <section className='movies'>
        <SearchForm
          name='movies'
          placeholder='Фильм'
          setSearchFilter={handleSetSearchFilter}
          searchMovies={handleSearchMovies}
          filterState={filterState}
          searchQueryState={searchQueryState}
          formMod='search-form__place_movies'
          isLoading={isLoading}
        />
        {!isLoading
          ? <>
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
            { isMore && <ButtonGrey text='Ещё' buttonMod='button-grey__place_movies' onClick={onMore} /> }
            </>

          : <div className='movies__preloader-container'><Preloader /></div> }
      </section>
  );
}
export default Movies;
