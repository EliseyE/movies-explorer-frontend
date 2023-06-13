import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import PopupMenuNav from '../PopupMenuNav/PopupMenuNav';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

// TEMPORARY DATA
import { dataArray, dataArraySaved } from '../../utils/data'

function App() {

  // UTILS
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // USER
  const [currentUser, setCurrentUser] = useState( {name: '', email: '', _id: '' } );


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
      <div className='page'>
        <Header headerMod='header__place_page' buttonMenuNavClick={handleMenuNavClick} isLoggedIn={isLoggedIn} />

        <Routes>
          {/* <Main /> */}

          <Route path='/' element={ <Main /> } />

          {/* <Movies  cardList={dataArray}/> */}
          <Route path='/movies' element={ <Movies  cardList={dataArray} /> } />

          {/* <SavedMovies cardList={dataArraySaved} /> */}
          <Route path='/saved-movies' element={ <SavedMovies cardList={dataArraySaved} /> } />

          <Route path="/*" element={
            <>
              <NotFoundPage className='not-found-page_place_page' />
              <Navigate to="/404" replace={true} />
            </> }
          />

        </Routes>

        <Footer footerMod='footer__place_page'/>

      </div>


      {/* <Routes>
      </Routes> */}

      <PopupMenuNav
        isOpen={isMenuNavOpen}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
