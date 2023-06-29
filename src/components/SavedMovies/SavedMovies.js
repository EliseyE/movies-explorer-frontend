import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';


function SavedMovies({
  onMovieSavedDelete,
  moviesList,
  onSearchMovies,
  message='Ничего не найдено',
  onUpdateFilter,
  onInitSavedMovies
  }) {

  const [isLoading, setIsLoading] = useState(false);

  function handleSetSearchFilter(moviesFilterNewState) {
    onUpdateFilter(moviesFilterNewState);
  };

  function handleSearchMovies(searchQuery) {
    setIsLoading(true);
    onSearchMovies(searchQuery);
    setIsLoading(false);
  };

  useEffect(() => {
    onInitSavedMovies();
  }, []);

  return(
    <section className='saved-movies'>
      <SearchForm
        name='movies'
        placeholder='Фильм'
        setSearchFilter={handleSetSearchFilter}
        searchMovies={handleSearchMovies}
        formMod='search-form__place_saved-movies'
      />
      {!isLoading &&
      <>
        {
          (moviesList.length === 0) &&
          <span className='saved-movies__message'>{message}</span>
        }
        { (moviesList.length > 0) &&
        <MoviesCardList
          moviesList={moviesList}
          moviesCardTypeSaved={true}
          onMovieSavedDelete={onMovieSavedDelete}
          moviesCardListMod='movies-card-list_place_saved-movies'
        />
        }
      </>
      }
      {isLoading && <Preloader preloaderWheelMod='preloader__wheel_place_saved-movies' /> }
    </section>
  );
}
export default SavedMovies;
