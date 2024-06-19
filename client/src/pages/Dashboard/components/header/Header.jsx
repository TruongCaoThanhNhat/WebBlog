import React from 'react'
import './header.scss'
import Logo from '../Logo/Logo'
import SearchBar from '../searchBar/SearchBar'
import Nav from '../nav/Nav'



function Header() {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
        <Logo/>
       
         <SearchBar/>
        
          <Nav/>
    </header>
  )
}

export default Header