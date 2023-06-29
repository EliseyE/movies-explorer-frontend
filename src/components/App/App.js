import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

// IMAGES
import imageSuccess from '../../images/icons/image-success.svg';
import imageFail from '../../images/icons/image-fail.svg';

// CONFIG
import {
  BEATFILM_MOVIES_BASE_URL_API,
  PROPERTIES_FOR_SEARCHNG_ARRAY,
  SHORT_MOVIES_DURATION,
  MOVIES_GRID_LARGE,
  MOVIES_GRID_MEDIUM,
  MOVIES_GRID_SMALL,
} from '../../appConfig';

// UTILS
import {
  getArrayKeyWords,
  searchInArrayByProperties,
  debounce,
  putItemIntoLocalstorageJson,
  getItemFromLocalstorageJson,
  putStringIntoLocalstorage,
  getStringFromLocalstorage,
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import PopupResult from '../PopupResult/PopupResult';

// CONTEXT
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import Preloader from '../Preloader/Preloader';

function App() {

// UTILS
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState({ resOk: false, resStatus: '' , resMessage: ''  });
  const navigate = useNavigate();

// USER
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', _id: '' });

// MOVIES LISTS
  const [moviesList, setMoviesList] = useState([]);
  const [moviesSavedList, setMoviesSavedList] = useState([]);

// SEARCH
  const [foundMoviesList, setFoundMoviesList] = useState([]);
  const [foundFilteredMoviesList, setFoundFilteredMoviesList] = useState([]);
  const [moviesFilterState, setMoviesFilterState] = useState({});
  const [searchQueryStateMovies, setSearchQueryStateMovies] = useState('');
  const [moviesMessage, setMoviesMessage] = useState('');

  const [foundSavedMoviesList, setFoundSavedMoviesList] = useState([]);
  const [foundFilteredSavedMoviesList, setFoundFilteredSavedMoviesList] = useState([]);
  const [savedMoviesFilterState, setSavedMoviesFilterState] = useState({});
  const [searchQueryStateSavedMovies, setSearchQueryStateSavedMovies] = useState('');
  const [savedMoviesMessage, setSavedMoviesMessage] = useState('');
  const [isSearchSavedMoviesMode, setIsSearchSavedMoviesMode] = useState(false);

  // UI
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMenuNavOpen, setIsMenuNavOpen] = useState(false);
  const [isPopupResultOpen, setIsPopupResultOpen] = useState(false);
  const [popupResultImage, setPopupResultImage] = useState('');
  const [popupResultMessage, setPopupResultMessage] = useState('');

  const [isMoreMoviesButtonActive, setIsMoreMoviesButtonActive] = useState(false);
  const [oneMoreMoviesList, setOneMoreMoviesList] = useState([]);
  const [oneMoreMoviesProterties, setOneMoreMoviesProterties] = useState({
    maxInitial: MOVIES_GRID_LARGE.maxInitial, addQuantity: MOVIES_GRID_LARGE.addQuantity });
  const [moreMoviesCounter, setMoreMoviesCounter] = useState(0);
  const [isResizeMode, setIsResizeMode] = useState(false);


// UI FUNCTIONS

  function handleMenuNavClick() {
    setIsPopupOpen(true);
    setIsMenuNavOpen(true);
  };

  function closeAllPopups() {
    setIsPopupOpen(false);
    setIsMenuNavOpen(false);

    setIsPopupResultOpen(false);
    setTimeout(() => {
     setPopupResultImage('');
    }, 200);
    setPopupResultMessage('');
  };

  function handleOpenPopupResult(res) {
    setIsPopupOpen(true);
    setPopupResultImage(res.resOk ? imageSuccess : imageFail );
    setPopupResultMessage(res.resMessage);
    setIsPopupResultOpen(true);

    console.log(res.resOk, res.resMessage);
    console.log(res);

  };

  // CLICK ESC TO CLOSE POPUP
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === 'Escape') {
        closeAllPopups();
        document.removeEventListener('keydown', handleEscapeKey);
      }
    };

    if (isPopupOpen)
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isPopupOpen]);


// FILTER MOVIES
function filterMovies(moviesListArray, filterValue) {
  if (filterValue.shortMovies)
    return moviesListArray.filter(movie => movie.duration < SHORT_MOVIES_DURATION);
  return moviesListArray;
};

// MARK SAVED MOVIES
function markMoviesAsSaved(moveis) {
  return moveis.map(movie => {
    const savedMovie = moviesSavedList.find(savedMovieItem => savedMovieItem.movieId === movie.movieId);
    if (savedMovie)
      return {...movie, _id: savedMovie._id };
    return movie;
  });
};

// TOGGLE MARK MOVIE SAVED\NOT_SAVED
function toggleMarkMovieAsSaved(movie) {
  if (foundMoviesList.length > 0) {
    let movies = [...foundMoviesList];
    const movieIndex = movies.findIndex(
      foundMovie => foundMovie.movieId === movie.movieId);
    if (movies[movieIndex]._id === undefined) {
      movies[movieIndex] = {...movies[movieIndex], _id: movie._id };
      setFoundMoviesList(movies);
      const filteredMovies = filterMovies(movies, moviesFilterState);
      setFoundFilteredMoviesList(filteredMovies);
      return;
    }

    movies[movieIndex] = { ...movies[movieIndex], _id: undefined };
    setFoundMoviesList(movies);
    const filteredMovies = filterMovies(movies, moviesFilterState);
    setFoundFilteredMoviesList(filteredMovies);
  }
};

// SEARCHING OF MOVIES
async function handleSearchMovies(searchQuery) {
  setSearchQueryStateMovies(searchQuery);
  setFoundMoviesList([]);
  setFoundFilteredMoviesList([]);
  setOneMoreMoviesList([]);
  let movies = [];
  setIsLoading(true);
  try {
    movies = await handleGetMovies();
  } catch(err) {
      console.log('Error:', err);
      setMoviesMessage(`
        Во время запроса произошла ошибка.\n
        Возможно, проблема с соединением или сервер недоступен.\n
        Подождите немного и попробуйте ещё раз
      `);
  }
    const keyWordsArray = getArrayKeyWords(searchQuery);
    let foundMovies = searchInArrayByProperties(PROPERTIES_FOR_SEARCHNG_ARRAY, movies, keyWordsArray);

    if(foundMovies.length === 0) {
      setMoviesMessage('Ничего не найдено');
      setIsLoading(false);
      return;
    } else {
      changeOneMoreButtonProterties();
      setIsResizeMode(true);

      foundMovies = markMoviesAsSaved(foundMovies);
      setFoundMoviesList(foundMovies);
      const foundFilteredMovies = filterMovies(foundMovies, moviesFilterState);
      setFoundFilteredMoviesList(foundFilteredMovies);

      setIsLoading(false);
    }
};

// FILTERING MOVIES BY TOGGLE
function handleUpdateMoviesFilter(filterNewState) {
  if( moviesFilterState.shortMovies !==  filterNewState.shortMovies )
    setMoviesFilterState({...moviesFilterState, ...filterNewState});
  else return;

  setIsLoading(true);
  if  (foundMoviesList.length > 0) {
    setOneMoreMoviesList([]);
    const filteredMovies = filterMovies(foundMoviesList, {...moviesFilterState, ...filterNewState});
    setFoundFilteredMoviesList(filteredMovies);
    setMoviesMessage(filteredMovies.length === 0 ? 'Ничего не найдено' : '');
  };
  setIsLoading(false);

};

// SEARCHING OF SAVED MOVIES
async function handleSearchSavedMovies(searchQuery) {
  setIsSearchSavedMoviesMode(true);
  setSearchQueryStateSavedMovies(searchQuery);
  setFoundSavedMoviesList([]);
  setFoundFilteredSavedMoviesList([]);
  const keyWordsArray = getArrayKeyWords(searchQuery);
  let foundSavedMovies = searchInArrayByProperties(PROPERTIES_FOR_SEARCHNG_ARRAY, moviesSavedList, keyWordsArray);

  if(foundSavedMovies.length === 0) {
    setSavedMoviesMessage('Ничего не найдено');
    return;
  }
  setFoundSavedMoviesList(foundSavedMovies);

  const foundFilteredSavedMovies = filterMovies(foundSavedMovies, savedMoviesFilterState);
  setFoundFilteredSavedMoviesList(foundFilteredSavedMovies);
};

// FILTERING SAVED MOVIES BY TOGGLE
function handleUpdateSavedMoviesFilter(filterNewState) {
  if( moviesFilterState.shortMovies !==  filterNewState.shortMovies )
    setMoviesFilterState({...moviesFilterState, ...filterNewState});
  else return;
  setIsSearchSavedMoviesMode(true);

  let filter = {...savedMoviesFilterState, ...filterNewState};
  setSavedMoviesFilterState(filter);

  function handleFilterSavedMovies(list) {
    const filteredSavedMovies = filterMovies(list, filter);
    setFoundFilteredSavedMoviesList(filteredSavedMovies);
    setSavedMoviesMessage(filteredSavedMovies.length === 0 ? 'Ничего не найдено' : '');
  }

  handleFilterSavedMovies(searchQueryStateSavedMovies ? foundSavedMoviesList : moviesSavedList);
  console.log('toggle');

};

function handleInitSavedMovies() {
  setIsSearchSavedMoviesMode(false);
  setSavedMoviesMessage('');
}

// LOCAL STORAGE
useEffect(() => {
// MOVIES FROM STORAGE
setSearchQueryStateMovies(getStringFromLocalstorage('searchQueryStateMovies') ?? '');
setMoviesMessage(getStringFromLocalstorage('moviesMessage') ?? '');
setMoviesFilterState(getItemFromLocalstorageJson('moviesFilterState') ?? {});
setFoundMoviesList(getItemFromLocalstorageJson('foundMoviesList') ?? []);
setFoundFilteredMoviesList(getItemFromLocalstorageJson('foundFilteredMoviesList') ?? []);
setOneMoreMoviesList(getItemFromLocalstorageJson('oneMoreMoviesList') ?? []);
setIsResizeMode(getItemFromLocalstorageJson('isResizeMode') ?? false);


// SAVED MOVIES FROM STORAGE
setMoviesSavedList(getItemFromLocalstorageJson('moviesSavedList') ?? []);
}, []);

// MOVIES TO STORAGE
useEffect(() => {
  putStringIntoLocalstorage('searchQueryStateMovies', searchQueryStateMovies  ?? '');
}, [searchQueryStateMovies]);

useEffect(() => {
  putStringIntoLocalstorage('moviesMessage', moviesMessage  ?? '');
}, [moviesMessage]);

useEffect(() => {
  putItemIntoLocalstorageJson('moviesFilterState', moviesFilterState  ?? {});
}, [moviesFilterState]);

useEffect(() => {
  putItemIntoLocalstorageJson('foundMoviesList', foundMoviesList ?? []);
}, [foundMoviesList]);

useEffect(() => {
  putItemIntoLocalstorageJson('foundFilteredMoviesList', foundFilteredMoviesList ?? []);
}, [foundFilteredMoviesList]);

useEffect(() => {
  putItemIntoLocalstorageJson('oneMoreMoviesList', oneMoreMoviesList ?? []);
}, [oneMoreMoviesList]);

useEffect(() => {
  putItemIntoLocalstorageJson('isResizeMode', isResizeMode ?? false);
}, [isResizeMode]);


// SAVED MOVIES TO STORAGE
useEffect(() => {
  putStringIntoLocalstorage('savedMoviesMessage', savedMoviesMessage ?? '');
}, [savedMoviesMessage]);


// API

// BEATFILM MOVIES API
  async function handleGetMovies() {
    let movies = [];
      movies = await beatfilmMoviesApiModule.getInitialCards();
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
    setIsLoading(true);
    try {
      const res = await mainApi.register(regData);
      handleOpenPopupResult({resOk: res.resValues.ok, resMessage: res.resData.message});
      handleUpdateLastResponse(res);
      await handleLogIn({
        email: regData.email,
        password: regData.password,
      });
      navigate('/movies', { replace: true });
    } catch (err) {
      console.log(err);
      if (!err.resValues.ok && (err.resValues.status !== 409)) {
        setApiResponse({
          ...apiResponse,
          resOk: err.resValues.ok,
          resStatus: err.resValues.status,
          resMessage: 'При регистрации пользователя произошла ошибка'});
      } else handleUpdateLastResponse(err);
    } finally {
      setIsLoading(false);
    }
  };

  // CHECK TOKEN
  const tokenCheck = useCallback( async () => {
    try {
      const jwtCheckRes = await mainApi.checkTokenAPI();
      if(!jwtCheckRes.resData._id)
        throw new Error('JWT IS EMPTY');
      const resUser = await mainApi.getUserInfo();
      if(resUser) {
        setIsLoggedIn(true);
        setCurrentUser({ ...currentUser, ...resUser.resData });
        console.log('>>> JWT CHECKED')
      }
      const resSavedMovies = await mainApi.getSavedMovies();
      if(resSavedMovies) {
        setMoviesSavedList(resSavedMovies.resData);
      }
    } catch (err) {
      console.log(err);
      setIsInitialLoading(false);
    } finally {
      setIsInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    tokenCheck();
    changeOneMoreButtonProterties();
  }, []);

  // AUTHORIZE
  const handleAuthorize = useCallback( async () => {
    await tokenCheck();
    setIsLoading(false);
  }, []);

  // LOGIN
  async function handleLogIn(logInData) {
      setIsLoading(true);
    try {
      const res = await mainApi.authorize(logInData);
      if(res.resData) {
        await handleAuthorize();
        navigate('/movies', {replace: true});
      }
        handleUpdateLastResponse(res);

    } catch (err) {
      console.log(err);
      handleUpdateLastResponse(err);
      setIsLoading(false);
    }
  };

  // LOGOUT
  async function handleLogOut() {
    setIsLoading(true);
    try {
      await mainApi.logout();
      setIsLoggedIn(false);
      setMoviesList([]);

    // MOVIES FROM STORAGE
    setSearchQueryStateMovies('');
    setMoviesMessage('');
    setMoviesFilterState({});
    setFoundMoviesList([]);
    setFoundFilteredMoviesList([]);
    setOneMoreMoviesList([]);
    setIsResizeMode(false);

    // SAVED MOVIES FROM STORAGE
    setMoviesSavedList([]);

      navigate('/', {replace: true});
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
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

      const updatedFoundFilteredSavedMoviesList = deleteMovieFromList(movie, foundFilteredSavedMoviesList);
      setFoundFilteredSavedMoviesList(updatedFoundFilteredSavedMoviesList);

      toggleMarkMovieAsSaved(movie);
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE PROFILE INFO
  async function handleUpdateUserInfo(userData) {
  setIsLoading(true);
    try {
      const res = await mainApi.updateUserInfo(userData);
      setCurrentUser({ ...currentUser, ...res.resData.user });
      handleUpdateLastResponse(res);
      handleOpenPopupResult({resOk: res.resValues.ok, resMessage: res.resData.message});
    } catch (err) {
      if (!err.resValues.ok && (err.resValues.status !== 409)) {
        setApiResponse({
          ...apiResponse,
          resOk: err.resValues.ok,
          resStatus: err.resValues.status,
          resMessage: 'При обновлении профиля произошла ошибка'});
        handleOpenPopupResult({resOk: err.resValues.ok, resMessage: 'При обновлении профиля произошла ошибка'});
      }
      else handleUpdateLastResponse(err);
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATE LAST RESPONSE RECORD
  function handleUpdateLastResponse(res) {
    setApiResponse({
      ...apiResponse,
      resOk: res.resValues.ok,
      resStatus: res.resValues.status,
      resMessage: res.resData.message
    });
  };

// ONE MORE MOVIES
  const changeOneMoreButtonProterties = function() {
    const windowWidth = window.innerWidth;

    if(windowWidth >= MOVIES_GRID_LARGE.breakPoint)
      setOneMoreMoviesProterties(
        {...oneMoreMoviesProterties,
          maxInitial: MOVIES_GRID_LARGE.maxInitial,
          addQuantity: MOVIES_GRID_LARGE.addQuantity,
        });

    if((windowWidth < MOVIES_GRID_LARGE.breakPoint) && (windowWidth > MOVIES_GRID_MEDIUM.breakPoint))
      setOneMoreMoviesProterties(
        {...oneMoreMoviesProterties,
          maxInitial: MOVIES_GRID_MEDIUM.maxInitial,
          addQuantity: MOVIES_GRID_MEDIUM.addQuantity,
        });

    if(windowWidth <= MOVIES_GRID_SMALL.breakPoint)
      setOneMoreMoviesProterties(
        {...oneMoreMoviesProterties,
          maxInitial: MOVIES_GRID_SMALL.maxInitial,
          addQuantity: MOVIES_GRID_SMALL.addQuantity,
        });
  };

  // MORE MOVIES BUTTON ACTION
  function handleMoreMovies() {
    const listLength = foundFilteredMoviesList.length;
    const oneMoreMoviesListLength = oneMoreMoviesList.length;
    const list = [...foundFilteredMoviesList];

    const delta = listLength - oneMoreMoviesListLength;

    if(delta <= oneMoreMoviesProterties.addQuantity) {
      setOneMoreMoviesList([...list]);
      setIsMoreMoviesButtonActive(false);
      setMoreMoviesCounter(moreMoviesCounter + delta);
      setIsResizeMode(false);
    };

    if(delta > oneMoreMoviesProterties.addQuantity) {
      setOneMoreMoviesList([...list.slice(0 , oneMoreMoviesListLength + oneMoreMoviesProterties.addQuantity )]);
      setMoreMoviesCounter(moreMoviesCounter + oneMoreMoviesProterties.addQuantity);
    };
  };

// ONE MORE MOVIES RESIZING
  useEffect(() => {
    const listLength = foundFilteredMoviesList.length;
    const oneMoreMoviesListLength = oneMoreMoviesList.length;

  // UPDATING ONEMOREMOVIES LIST
    const list = [...foundFilteredMoviesList];

    // RESET TO BLANK
    if ( listLength === 0 ) {
      setOneMoreMoviesList([]);
    };

    // ADD INITIAL PORTION
    if ( (oneMoreMoviesListLength === 0) && ( listLength !== 0 ) ) {
      setOneMoreMoviesList([...list.slice(0 , oneMoreMoviesProterties.maxInitial )]);
      setMoreMoviesCounter(oneMoreMoviesProterties.maxInitial);
    };

    // UPDATE LIST WHEN SAVE/DELETE SAVED
    if ( (oneMoreMoviesListLength > 0) && ( listLength !== 0 ) ) {
      setOneMoreMoviesList([...list.slice(0 , oneMoreMoviesListLength )]);
    }

  // IS BUTTON MORE EXIST
    if ( (oneMoreMoviesListLength < listLength ) &&
        (listLength > oneMoreMoviesProterties.maxInitial) )
      setIsMoreMoviesButtonActive(true);
    else setIsMoreMoviesButtonActive(false);

    if (oneMoreMoviesListLength === listLength) setIsMoreMoviesButtonActive(false);

  }, [foundFilteredMoviesList, oneMoreMoviesProterties]);

  useEffect(() => {
    function handleResize() {
      changeOneMoreButtonProterties();
      if ((foundFilteredMoviesList.length === moreMoviesCounter) && (moreMoviesCounter !== 0) ) {
          window.removeEventListener('resize', changeWindowWidthCallback);
          setMoreMoviesCounter(0);
      };
    };
    const changeWindowWidthCallback = debounce(handleResize, 300);

    if (isResizeMode) {
      window.addEventListener('resize', changeWindowWidthCallback);
      return () => window.removeEventListener('resize', changeWindowWidthCallback);
    }
  }, [moreMoviesCounter, foundFilteredMoviesList, isResizeMode]);



  // LOADING SPINNER
  if(isInitialLoading)
    return <Preloader />;

  return(
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <IsLoadingContext.Provider value={isLoading}>
          <div className='page'>
            {
              ( window.location.pathname !== '/signin' &&
                window.location.pathname !== '/signup' &&
                window.location.pathname !== '/404' ) &&
              <Header
              headerMod='header_place_page'
              buttonMenuNavClick={handleMenuNavClick}
              isLoggedIn={isLoggedIn}
              isColored={window.location.pathname === '/'}
            />}
            <div className='page__content'>
              <Routes  >
                <Route path='/' element={<Main />} />

                <Route path='/movies' element={
                  <>
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    element={Movies}
                      foundMovies={oneMoreMoviesList}
                      onSearchMovies={handleSearchMovies}
                      onMovieSave={handleMovieSave}
                      onMovieSavedDelete={handleMovieSavedDelete}
                      filterState={moviesFilterState}
                      searchQueryState={searchQueryStateMovies}
                      message={moviesMessage}
                      isMore={isMoreMoviesButtonActive}
                      onMore={handleMoreMovies}
                      onUpdateFilter={handleUpdateMoviesFilter}
                  /> </>}
                />

                <Route path='/saved-movies' element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    element={SavedMovies}
                      moviesList={
                        isSearchSavedMoviesMode
                        ? foundFilteredSavedMoviesList
                        : moviesSavedList
                      }
                      onSearchMovies={handleSearchSavedMovies}
                      onMovieSavedDelete={handleMovieSavedDelete}
                      message={savedMoviesMessage}
                      onUpdateFilter={handleUpdateSavedMoviesFilter}
                      onInitSavedMovies={handleInitSavedMovies}
                  />}
                />

                <Route path='/profile' element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    element={Profile}
                      onUpdateUser={handleUpdateUserInfo}
                      onLogOut={handleLogOut}
                      apiResponse={apiResponse}
                  />}
                />

                <Route path='/signup'
                  element={isLoggedIn
                  ? <Navigate to="/movies" replace />
                  :  <Register
                      onRegister={handleRegister}
                      message={apiResponse.resMessage}
                    /> }
                />
                <Route path='/signin'
                  element={isLoggedIn
                    ? <Navigate to="/movies" replace />
                    : <Login
                        onLogIn={handleLogIn}
                        message={apiResponse.resMessage}
                      /> }
                />

                <Route path="/*" element={
                  <>
                    <Navigate to="/404" replace={true} />
                    <NotFoundPage className='not-found-page_place_page' />
                  </> }
                />
              </Routes>
            </div>
            {( window.location.pathname !== '/signin' &&
                window.location.pathname !== '/signup' &&
                window.location.pathname !== '/profile' &&
                window.location.pathname !== '/404' ) &&
                <Footer footerMod='footer_place_page'/> }
          </div>
        </IsLoadingContext.Provider>
      </CurrentUserContext.Provider>

      <PopupMenuNav
        isOpen={isMenuNavOpen}
        onClose={closeAllPopups}
      />

      <PopupResult
        isOpen={(popupResultImage !== '') && isPopupResultOpen}
        onClose={closeAllPopups}
        image={popupResultImage}
        message={popupResultMessage}
      />
    </>
  );
}

export default App;
