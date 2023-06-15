import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

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

// TEMPORARY DATA
import { dataArray, dataArraySaved, testUser } from '../../utils/data';

function App() {

  // UTILS
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const navigate = useNavigate();


  // USER
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', _id: '' });


// DEMO MODE

  // LOGIN
  function handleLogIn({ email, password }) {
    if( (testUser.email === email) && (testUser.password === password) ) {
      setIsLoggedIn(true);
      localStorage.setItem('loggedIn', 'true');
      navigate('/', {replace: true});
    };
  };

  // LOGOUT
  function handleLogOut() {
    localStorage.setItem('loggedIn', 'false');
    navigate('/', {replace: true});
    window.location.reload();

  };

  // UPDATE FPROFILE INFO
  function handleUpdateUser({ name, email }) {
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    setCurrentUser({ ...currentUser, name: name, email: email });
  };

  useEffect(() => {
    localStorage.setItem('userName', testUser.name);
    localStorage.setItem('userEmail', testUser.email);
    setCurrentUser(testUser);
  }, []);


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


  return(
    <>
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route path='/' element={
            <>
              <Header
                headerMod='header__place_page'
                buttonMenuNavClick={handleMenuNavClick}
                isLoggedIn={isLoggedIn}
              />
              <Main />
              <Footer footerMod='footer__place_page'/>
            </> }
          />

          <Route path='/movies' element={
            <>
              <Header
                headerMod='header__place_page'
                buttonMenuNavClick={handleMenuNavClick}
                isLoggedIn={isLoggedIn}
              />
              <Movies  cardList={dataArray} />
              <Footer footerMod='footer__place_page'/>
            </> }
          />

          <Route path='/saved-movies' element={
            <>
            <Header
              headerMod='header__place_page'
              buttonMenuNavClick={handleMenuNavClick}
              isLoggedIn={isLoggedIn}
            />
            <SavedMovies cardList={dataArraySaved} />
            <Footer footerMod='footer__place_page'/>
            </> }
          />

          <Route path='/profile' element={
            <>
            <Header
              headerMod='header__place_page'
              buttonMenuNavClick={handleMenuNavClick}
              isLoggedIn={isLoggedIn}
            />
            <Profile onUpdateUser={handleUpdateUser} onLogOut={handleLogOut} />
            </> }
          />

          <Route path='/signup' element={ <Register /> } />
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
