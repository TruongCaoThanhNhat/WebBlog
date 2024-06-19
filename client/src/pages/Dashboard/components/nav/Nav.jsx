import React from 'react'
import './nav.scss'
import Navnotice from './Navnotice';
import NavMessage from './NavMessage';
import NavAvt from './NavAvt';

function Nav() {
  return (
    <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <Navnotice/>
          <NavMessage/>
          <NavAvt />
        </ul>

    </nav>
  );
}

export default Nav;