import React from 'react';
import './NavTab.css';

import ButtonTranspapentGrey from '../ButtonTranspapentGrey/ButtonTranspapentGrey';

function NavTab() {

  return(
    <nav className='navtab'>
      <a href='#about'><ButtonTranspapentGrey text='Узнать больше'/></a>
    </nav>
  );
}
export default NavTab;
