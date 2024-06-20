import React from 'react'
import './main.scss'
import PageTitle from './PageTitle'
import Dashboard from './Dashboard';

function Main() {
  return (
    <main id="main" className="main">
      <PageTitle page="Dashboard"/>
      <Dashboard />
    </main>
  )
}

export default Main;