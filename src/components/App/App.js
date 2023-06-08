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
      <Header isLoggedIn={isLoggedIn}/>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
