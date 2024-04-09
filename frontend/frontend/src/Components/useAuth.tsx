import { useState, useEffect } from 'react';
import { User } from '../User';

function useAuth(admin: boolean = false) {
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // token is stored in local storage
  const [user, setUser] = useState(null as User|null);
  const [ error, setError ] = useState('');
  const [backendRoute, setBackendRoute] = useState('http://localhost:3000/users/me');


 
  
  useEffect(() => {
    if (admin) {
      setBackendRoute('http://localhost:3000/users/adminMe');
    }
    else{
      setBackendRoute('http://localhost:3000/users/me');
    }
    async function loadUserData() {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setError('Please login again');
        return;
      }
        try{
        const response = await fetch(backendRoute, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${storedToken}`,
          }
        })
        if (response.status === 401) {
            setError('Please login again');
          return;
        }
        if (!response.ok) {
          setError('An error occured, try again later');
          return;
        }
        
        const userData = await response.json() as User;
        setUser(userData);
        if (userData) {
          //onsole.log(user);
        } else {
          console.log('User is not loaded yet');
        }
        
        localStorage.setItem('userLoggedIn', '1');
  
     
  } catch (err) {
    setError('An error occured, try again later');
    console.error(err);
  }}
      loadUserData();
  }, []);
//  console.log('User: ', user);
  return { token, user, error, setToken, setUser, setError };
}

export default useAuth;