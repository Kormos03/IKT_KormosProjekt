import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const darkModeInStorage = localStorage.getItem('darkMode');
    return darkModeInStorage === 'true';
  });

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') == 'true';
    setIsDarkMode(darkMode);
  }, []);


  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light');
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode];
}