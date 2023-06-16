import React from 'react';
import './NavTab.css';

import ButtonTranspapentGrey from '../ButtonTranspapentGrey/ButtonTranspapentGrey';

function NavTab() {

  return(
    <nav className='navtab'>
      <ButtonTranspapentGrey text='Узнать больше' onClick={ () => window.location.href='#about' } />
    </nav>
  );
}
export default NavTab;
