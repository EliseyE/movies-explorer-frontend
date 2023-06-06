import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {

  return(
    <div className='page'>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
