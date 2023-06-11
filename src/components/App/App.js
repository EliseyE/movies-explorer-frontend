import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import PopupMenuNav from '../PopupMenuNav/PopupMenuNav';
import SearchForm from '../SearchForm/SearchForm';
import Movies from '../Movies/Movies';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);


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
        <Movies />
        {/* <Main /> */}
        <Footer footerMod='footer__place_page'/>
      </div>


    <Routes>
    {/* <Route path={['/', '/1']} element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} /> */}
     <Route path='/404' element={<NotFoundPage />} />
    </Routes>

    <PopupMenuNav
      isOpen={isMenuNavOpen}
      onClose={closeAllPopups}
    />
  </>
  );
}

export default App;
