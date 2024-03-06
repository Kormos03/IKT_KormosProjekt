import { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'
import { NavLink, Outlet } from 'react-router-dom'
import { NavigationBar } from './Components/NavigationBar'
import { User } from './User'
import { UserContext } from './pages/AdminLoginPage'
import { AdminNavigationBar } from './Components/AdminNavigationBar'

function getLogoFromBackend(){
  
}


function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') == '1');
  const [isAdmin, setIsAdmin] = useState(false);
  function toggleDarkMode() {
    const newDarkMode = !darkMode;
    localStorage.setItem('darkMode', newDarkMode ? '1' : '0');
    setDarkMode(newDarkMode);

  }
  const user = useContext(UserContext);

  useEffect(() => { 
    console.log(user)
    if(user.user?.admin){
      setIsAdmin(true);
    }
  }, [user]);
  
  return (
    <>
      <style>
        {`body{
        background-image: url("https://as2.ftcdn.net/v2/jpg/04/81/66/19/1000_F_481661950_DozZV5h8tZO87DN7W6pv0IyAIDRX9MzJ.jpg");
        }
      }`}
      </style>
      <div className={darkMode ? 'dark' : ''}>
        {
          isAdmin ? <AdminNavigationBar></AdminNavigationBar> : <NavigationBar></NavigationBar>
        }
        
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
