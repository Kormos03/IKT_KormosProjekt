import { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'
import { NavLink, Outlet } from 'react-router-dom'
import { NavigationBar } from './Components/NavigationBar'
import { UserContext } from './pages/AdminLoginPage'
import { AdminNavigationBar } from './Components/AdminNavigationBar'

function getLogoFromBackend(){
  //
}


function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') == '1');
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null || localStorage.getItem('user'));
  function toggleDarkMode() {
    const newDarkMode = !darkMode;
    localStorage.setItem('darkMode', newDarkMode ? '1' : '0');
    setDarkMode(newDarkMode);

  }


  return (
    <>
     
      <div className={darkMode ? 'dark' : ''}>
        
        
        <main className=''>
          <Outlet />
        </main>
      </div>
      <footer>

      </footer>

    </>
  )
}

export default App
