import { useState, useEffect } from 'react';
import { User } from '../User';

function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // token is stored in local storage
  const [user, setUser] = useState(null as User|null);
  const [ error, setError ] = useState('');
  const [backendRoute, setBackendRoute] = useState('http://localhost:3000/users/me');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    async function loadUserData() {
        try{
        const response = await fetch(backendRoute, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
        if (response.status === 401) {
            setError('Please login again');
         setToken('');
          localStorage.removeItem('token');
          setError('Please login again');
          return;
        }
        if (!response.ok) {
          setError('An error occured, try again later');
          return;
        }
        
        const userData = await response.json() as User;
        setUser(userData);
        if (user) {
          console.log(user);
        } else {
          console.log('User is not loaded yet');
        }
        
        localStorage.setItem('userLoggedIn', '1');
  
     
  } catch (err) {
    setError('An error occured, try again later');
    console.error(err);
  }}
      loadUserData();
  }, [token] || [user] || []);

  return { token, user, error, setToken, setUser, setError };
}

export default useAuth;