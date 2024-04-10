import { useState, useEffect } from 'react';
import { User } from '../User';
import { useNavigate } from 'react-router-dom';

function useAuthAdmin() {
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // token is stored in local storage
  const [user, setUser] = useState(null as User|null);
  const [ error, setError ] = useState('');
  const [backendRoute, setBackendRoute] = useState('http://localhost:3000/users/adminMe');
 const navigate = useNavigate(); 

  useEffect(() => {
    async function loadUserData() {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }

        try{
        const response = await fetch(backendRoute, {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${storedToken}`,
          }
        })

        if(response.ok) {
          const userData = await response.json();
          await console.log('userdata',userData);
          setUser(userData);
        }
        if(response.status === 401) {
          setError('Please login again');
          //setToken('');
          //localStorage.removeItem('token');
          //  navigate('/secret/adminlogin');
          return;
        }
        if(response.status === 500) {
          setError('Nincs jogosultságod az oldal megtekintéséhez');
          setToken('');
          localStorage.removeItem('token');
          navigate('/secret/adminlogin');
          return;
        }
       
        
        localStorage.setItem('userLoggedIn', '1');
  
     
  } catch (err) {
    setError(err.message);
    console.error('Error',err);
  }}
      loadUserData();
      if (!token) {
        setError('Please login again');
        navigate('/secret/adminlogin');
        return;
      }
  }, [token]);
  useEffect(() => {
    if (user) {
      console.log('user',user);
    } else {
      console.log('User is not loaded yet');
    }
  }, [user])
//  console.log('User: ', user);
  return { token, user, error, setToken, setUser, setError };
}

export default useAuthAdmin;