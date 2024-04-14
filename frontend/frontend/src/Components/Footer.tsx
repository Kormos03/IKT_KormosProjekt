import { useEffect } from 'react';
import { useDarkMode } from './HandleDarkMode';

export function Footer() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  

  return (
    <footer className={`footer mt-auto py-3 ${isDarkMode ? 'bg-dark' : 'bg-light'}`}>
      <div className="container">
        <span className={`text-${isDarkMode ? 'light' : 'dark'}`}>© 2024 </span>
        <button 
          className={`btn btn-sm ${isDarkMode ? 'btn-light' : 'btn-dark'} float-right`} 
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? 'Világos mód' : 'Sötét mód'}
        </button>
      </div>
    </footer>
  );
}