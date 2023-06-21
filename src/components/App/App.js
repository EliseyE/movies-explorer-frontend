import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

// CONFIG
import {
  BEATFILM_MOVIES_BASE_URL_API,
  PROPERTIES_FOR_SEARCHNG_ARRAY,
} from '../../appConfig';

// UTILS
import {
  getArrayKeyWords,
  searchInArrayByProperties,
} from '../../utils/utils'

// API
import { beatfilmMoviesApiModule } from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';

// COMPONENTS
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import PopupMenuNav from '../PopupMenuNav/PopupMenuNav';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';

// CONTEXT
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  // UTILS
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // USER
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', _id: '' });

  // MOVIES
  const [moviesList, setMoviesList] = useState([]);
  const [moviesSavedList, setMoviesSavedList] = useState([]);

  // SEARCH
  const [foundMoviesList, setFoundMoviesList] = useState([]);
  const [foundSavedMoviesList, setFoundSavedMoviesList] = useState([]);
  const [moviesFilterState, setMoviesFilterState] = useState({ shortMovieDuration: 40 });
  const [savedMoviesFilterState, setSavedMoviesFilterState] = useState({ shortMovieDuration: 40 });
  const [searchQueryStateMovies, setSearchQueryStateMovies] = useState('');
  const [searchQueryStateSavedMovies, setSearchQueryStateSavedMovies] = useState('');


  // UI
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMenuNavOpen, setIsMenuNavOpen] = useState(false);

// UI FUNCTIONS

  function handleMenuNavClick() {
    setIsPopupOpen(true);
    setIsMenuNavOpen(true);
  };

  function closeAllPopups() {
    setIsPopupOpen(false);
    setIsMenuNavOpen(false);
  };

  // CLICK ESC TO CLOSE POPUP
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === 'Escape') {
        closeAllPopups();
        document.removeEventListener('keydown', handleEscapeKey);
      }
    };

    if(isPopupOpen)
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isPopupOpen]);


// FILTER MOVIES
function filterMovies(moviesListArray, filterValue) {
  if(filterValue.shortMovies)
    return moviesListArray.filter(movie => movie.duration < filterValue.shortMovieDuration);
  return moviesListArray;
};

// MARK SAVED MOVIES
function markMoviesAsSaved(moveis) {
  return moveis.map(movie => {
    const savedMovie = moviesSavedList.find(savedMovieItem => savedMovieItem.movieId === movie.movieId);
    if(savedMovie)
      return {...movie, _id: savedMovie._id };
    return movie;
  });
};

// TOGGLE MARK MOVIE SAVED\NOT_SAVED
function toggleMarkMovieAsSaved(movie) {
  if(foundMoviesList.length > 0) {
    let movies = [...foundMoviesList];
    const movieIndex = movies.findIndex(
      foundMovie => foundMovie.movieId === movie.movieId);
    if(movies[movieIndex]._id === undefined) {
      movies[movieIndex] = {...movies[movieIndex], _id: movie._id };
      setFoundMoviesList(movies);
      return;
    }
    movies[movieIndex] = { ...movies[movieIndex], _id: undefined };
    setFoundMoviesList(movies);
  }
};

// SEARCHING OF MOVIES
async function handleSearchMovies(searchQuery, filterValue) {
  setFoundMoviesList([]);
  const movies = await handleGetMovies();

  const keyWordsArray = getArrayKeyWords(searchQuery);
  let foundMovies = searchInArrayByProperties(PROPERTIES_FOR_SEARCHNG_ARRAY, movies, keyWordsArray);

  foundMovies = filterMovies(foundMovies, filterValue);
  foundMovies = markMoviesAsSaved(foundMovies);

  setMoviesFilterState({...moviesFilterState, ...filterValue});
  setSearchQueryStateMovies(searchQuery);
  setFoundMoviesList(foundMovies);
};

// SEARCHING OF SAVED MOVIES
async function handleSearchSavedMovies(searchQuery, filterValue) {
  setFoundSavedMoviesList([]);
  const keyWordsArray = getArrayKeyWords(searchQuery);
  let foundSavedMovies = searchInArrayByProperties(PROPERTIES_FOR_SEARCHNG_ARRAY, moviesSavedList, keyWordsArray);

  foundSavedMovies = filterMovies(foundSavedMovies, filterValue);

  setSavedMoviesFilterState({...savedMoviesFilterState, ...filterValue});
  setSearchQueryStateSavedMovies(searchQuery);
  setFoundSavedMoviesList(foundSavedMovies);
};

// API

// BEATFILM MOVIES API
  async function handleGetMovies() {
    let movies = await beatfilmMoviesApiModule.getInitialCards();
    movies = movies.map(item => {
      return {
          country: item.country,
          director: item.director,
          duration: item.duration,
          year: item.year,
          description: item.description,
          image: `${BEATFILM_MOVIES_BASE_URL_API}${item.image.url}`,
          trailer: item.trailerLink,
          thumbnail: `${BEATFILM_MOVIES_BASE_URL_API}${item.image.formats.thumbnail.url}`,
          movieId: item.id,
          nameRU: item.nameRU,
          nameEN: item.nameEN,
        }
      }
    );
    setMoviesList(movies)
    return movies;
  };

// MOVIES EXPLORER API
  // REGISTER
  async function handleRegister(regData) {
    try {
      const res = await mainApi.register(regData);
      navigate('/signin', { replace: true });
      console.log(res.resData);
    } catch (err) {
      console.log(err);
    }
  };

  // CHECK TOKEN
  const tokenCheck = useCallback( async () => {
    try {
      const jwtCheckRes = await mainApi.checkTokenAPI();
      if(!jwtCheckRes.resData._id)
        throw new Error('JWT is empty');
      const resUser = await mainApi.getUserInfo();
      if(resUser) {
        setIsLoggedIn(true);
        setCurrentUser({ ...currentUser, ...resUser.resData });
        console.log('jwt check!')
      }
      const resSavedMovies = await mainApi.getSavedMovies();
      if(resSavedMovies) {
        setMoviesSavedList(resSavedMovies.resData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    tokenCheck();
  }, []);

  // AUTHORIZE
  const handleAuthorize = useCallback( async () => {
    await tokenCheck();
    navigate('/movies', {replace: true});
  }, []);

  // LOGIN
  async function handleLogIn(logInData) {
    try {
      const res = await mainApi.authorize(logInData);
      console.log(res.resData);
      if(res.resData) handleAuthorize();
    } catch (err) {
      console.log(err);
    }
  };

  // LOGOUT
  function handleLogOut() {
    mainApi.logout();
    setIsLoggedIn(false);
    setMoviesList([]);
    navigate('/', {replace: true});
  };

  // SAVE MOVIE
  async function handleMovieSave(movie) {
    try {
      const res = await mainApi.saveMovie(movie);
      setMoviesSavedList([res.resData, ...moviesSavedList]);
      toggleMarkMovieAsSaved(res.resData);
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE MOVIE FROM ARRAY BY MOVIEID
  function deleteMovieFromList(movie, array) {
    let list = [...array];
    const itemIndex = list.findIndex(
      item => item.movieId === movie.movieId);
      list.splice(itemIndex, 1);
    return list;
  };

  // DELETE MOVIE FROM SAVED
  async function handleMovieSavedDelete(movie_Id) {
    try {
      const res = await mainApi.deleteSavedMovie(movie_Id);
      const movie = res.resData.movie;

      const updatedMoviesSavedList = deleteMovieFromList(movie, moviesSavedList);
      setMoviesSavedList(updatedMoviesSavedList);

      const updatedFoundSavedMoviesList = deleteMovieFromList(movie, foundSavedMoviesList);
      setFoundSavedMoviesList(updatedFoundSavedMoviesList);

      toggleMarkMovieAsSaved(movie);
    } catch (err) {
      console.log(err);
    }
  };

  return(
    <>
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route path='/' element={
            <>
              <Header
                headerMod='header_place_page'
                buttonMenuNavClick={handleMenuNavClick}
                isLoggedIn={isLoggedIn}
                isColored={true}
              />
              <Main />
              <Footer footerMod='footer_place_page'/>
            </> }
          />

          <Route path='/movies' element={
            <>
              <Header
                headerMod='header_place_page'
                buttonMenuNavClick={handleMenuNavClick}
                isLoggedIn={isLoggedIn}
              />
              <Movies
                foundMovies={foundMoviesList}
                onSearchMovies={handleSearchMovies}
                onMovieSave={handleMovieSave}
                onMovieSavedDelete={handleMovieSavedDelete}
                filterState={moviesFilterState}
                searchQueryState={searchQueryStateMovies}
              />
              <Footer footerMod='footer_place_page'/>
            </> }
          />

          <Route path='/saved-movies' element={
            <>
            <Header
              headerMod='header_place_page'
              buttonMenuNavClick={handleMenuNavClick}
              isLoggedIn={isLoggedIn}
            />
            <SavedMovies
              moviesList={ searchQueryStateSavedMovies !== '' ? foundSavedMoviesList : moviesSavedList}
              onSearchMovies={handleSearchSavedMovies}
              onMovieSavedDelete={handleMovieSavedDelete}
              filterState={savedMoviesFilterState}
              searchQueryState={searchQueryStateSavedMovies}
            />
            <Footer footerMod='footer_place_page'/>
            </> }
          />

          <Route path='/profile' element={
            <>
            <Header
              headerMod='header_place_page'
              buttonMenuNavClick={handleMenuNavClick}
              isLoggedIn={isLoggedIn}
            />
            <Profile onUpdateUser onLogOut={handleLogOut} />
            </> }
          />

          <Route path='/signup' element={ <Register onRegister={handleRegister}  /> } />
          <Route path='/signin' element={ <Login onLogIn={handleLogIn} /> } />

          <Route path="/*" element={
            <>
              <Navigate to="/404" replace={true} />
              <NotFoundPage className='not-found-page_place_page' />
            </> }
          />

        </Routes>
      </div>
    </CurrentUserContext.Provider>

      <PopupMenuNav
        isOpen={isMenuNavOpen}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
