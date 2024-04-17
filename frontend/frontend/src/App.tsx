import { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'
import { NavLink, Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Footer } from './Components/Footer'
import { NavigationBar } from './Components/NavigationBar'


function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') == '1');

  //A cím megváltoztatásához a Helmet komponenst használjuk
  return (
    <>
        <Helmet>
            <title>Körmös projekt</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="keywords" content="Körmös projekt" />
            <meta name="author" content="Kormos Áron" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <meta name="description" content="Körmös projekt" />
        <meta name="description" content="Körmös projekt" />
        </Helmet>

        <div className={darkMode ? 'dark' : ''}>

        <main className=''>
          <Outlet />
        </main>
      </div>
      <Footer/>

    </>
  )
}

export default App
