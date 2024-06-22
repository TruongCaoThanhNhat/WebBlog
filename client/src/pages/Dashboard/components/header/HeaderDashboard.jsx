import React from 'react'
import './headerDashboard.scss'
import Logo from '../Logo/Logo'
import SearchBar from '../searchBar/SearchBar'
import Nav from '../nav/Nav'



function HeaderDashboard() {
  return (
    <header id="headers" className="headers fixed-top d-flex align-items-center">
        <Logo/>
       
         <SearchBar/>
        
          <Nav/>
    </header>
  )
}

export default HeaderDashboard