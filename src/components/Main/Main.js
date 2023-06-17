import React from 'react';
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

function Main() {

  return(
    <main className='content'>
      <Promo promoMod='promo_place_content'/>
      <AboutProject aboutProjectMod='about-project_place_content' />
      <Techs techsMod='techs_place_content' />
      <AboutMe aboutMeMod='about-me_place_content' />
      <Portfolio portfolioMod='portfolio_place_content' />
    </main>
  );
}
export default Main;
