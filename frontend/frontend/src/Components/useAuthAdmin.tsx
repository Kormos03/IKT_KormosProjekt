import { useState, useEffect } from 'react';
import { User } from '../User';
import { useNavigate } from 'react-router-dom';

function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // token is stored in local storage
  const [user, setUser] = useState(null as User|null);
  const [ error, setError ] = useState('');
  const [backendRoute, setBackendRoute] = useState('http://localhost:3000/users/meAdmin');
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
            'Accept': 'application/json',
            'Authorization': `Bearer ${storedToken}`,
          }
        })
        /*if (response.status === 401) {
            setError('Please login again');
          return;
        }
        if (!response.ok) {
          setError('An error occured, try again later');
          return;
        }*/
        if(response.status === 200) {
          console.log('Response: ', response);
        }
        const userData = await response.json() as User;
        console.log('userdata',userData);
        setUser(userData);
        if(await userData.admin == false) {
            setError('You are not an admin');
            setUser(null);
            setToken('');
            localStorage.removeItem('token');
            console.log('You are not an admin');
            //navigate('/secret/adminlogin');
          return;
        }
        if (userData) {
          console.log(user);
        } else {
          console.log('User is not loaded yet');
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
//  console.log('User: ', user);
  return { token, user, error, setToken, setUser, setError };
}

export default useAuth;