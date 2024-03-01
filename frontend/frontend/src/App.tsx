import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'
import { NavLink, Outlet } from 'react-router-dom'
import { NavigationBar } from './NavigationBar'
/*
async function getBackground(background) {
  try {
    const response = await fetch(background);
    const data = await response;
    console.log(data);
    return data.json();
  } catch (error) {
    throw new Error(error.message)
  }
}*/


function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') == '1');

  function toggleDarkMode() {
    const newDarkMode = !darkMode;
    localStorage.setItem('darkMode', newDarkMode ? '1' : '0');
    setDarkMode(newDarkMode);

  }

  useEffect(() => {
   
  }, []);

  return (
    <>
      <style>
        {`body{
        background-image: url("https://as2.ftcdn.net/v2/jpg/04/81/66/19/1000_F_481661950_DozZV5h8tZO87DN7W6pv0IyAIDRX9MzJ.jpg");
        }
      }`}
      </style>
      <div className={darkMode ? 'dark' : ''}>
        <NavigationBar></NavigationBar>
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
