import React from 'react';
// import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {

const isLoggedIn = false;

  return(
    <div className='page'>
      <Header headerMod='header__place_page'/>
      <Main />
      <Footer footerMod='footer__place_page'/>
    </div>
  );
}

export default App;
