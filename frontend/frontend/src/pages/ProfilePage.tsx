import { useEffect, useState } from "react";
import { UserProfile } from "../Components/UserProfile";
import { User } from "../User";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";

export function ProfilePage(){
    const [ token, setToken ] = useState('');
    const [ error, setError ] = useState('')
    const [ user, setUser ] = useState(null as User|null);
    const [backendRoute, setBackendRoute] = useState('http://localhost:3000/users/me');
    const navigate = useNavigate();
  
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      }, []);


    useEffect(() => {
      if(user?.admin || localStorage.getItem('user') == 'true'){
        setToken('');
        localStorage.removeItem('token');
        setUser(null);
        localStorage.removeItem('user');
        setError('You are an admin');
        navigate('/login')
        return;
      }},[user] || [] || token)
  
 
  
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
          /*setToken('');
          localStorage.removeItem('token');
          setError('Please login again');
          return;*/
        }
        if (!response.ok) {
          setError('An error occured, try again later');
          return;
        }
        
        const userData = await response.json() as User;
        console.log(userData);
        setUser(userData);
        localStorage.setItem('userLoggedIn', '1');
  
     
  } catch (err) {
    setError('An error occured, try again later');
    console.error(err);
  }}
      console.log('User: ' +user);
  
      if (token) {
        loadUserData();
      } else {
        setUser(null);
      }
    }, [token] || [])
  

    return (
        <>
        <NavigationBar/>
            {
      user? <UserProfile user={user} /> : null
            }
            {
                error? <p>{error}</p> : null
            }
        </>
    );
}