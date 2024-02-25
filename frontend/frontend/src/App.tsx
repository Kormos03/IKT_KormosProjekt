import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'
import { NavLink, Outlet } from 'react-router-dom'
import { NavigationBar } from './NavigationBar'




function App() {
  const [background, setBackground] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') == '1');

  function toggleDarkMode() {
    const newDarkMode = !darkMode;
    localStorage.setItem('darkMode', newDarkMode ? '1' : '0');
    setDarkMode(newDarkMode);

  }

  async function getBackground() {
    try {
      const response = await fetch("https://as2.ftcdn.net/v2/jpg/04/81/66/19/1000_F_481661950_DozZV5h8tZO87DN7W6pv0IyAIDRX9MzJ.jpg");
      const data = await response;
      console.log(data);
      setBackground(data.url);
    } catch (error) {
      throw new Error(error.message)
    }
  }

  useEffect(() => {
    getBackground();
  }, []);

  return (
    <>
      <style>
        {`body{
        background-image: url(${background});
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
