import { createContext, useEffect, useState } from "react";
import { User } from "../User";
import { UserProfile } from "../Components/UserProfile";
import { Navigate, useNavigate } from "react-router-dom";
import { LoginFormAdmin } from "../Components/LoginFormAdmin";
import { AdminPage } from "./AdminPage";
import { RequestFunc } from "../RequestFunc";

export const UserContext = createContext({ user: null as User|null});

export function AdminLoginPage() {
    const [ token, setToken ] = useState(localStorage.getItem('token') || '');
  const [ error, setError ] = useState('')
  const [ user, setUser ] = useState(null as User|null)
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [backendRoute, setBackendRoute] = useState("http://localhost:3000/users/me");
  const navigate = useNavigate();


  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    RequestFunc


    async function loadUserData() {
      console.log('Token:'+ token)
      const response = await fetch(backendRoute, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      if (response.status === 200) {
        const userData = await response.json();
        setUser(userData);
        setIsLoggedIn(true);
      } else if (response.status === 401) {
        
        setError('Please login again');
        return;
      } else {
        setError('An error occurred, try again later');
      }
    }
    loadUserData();

  }, [token]);

useEffect(() => {
    if(user!.admin){
    navigate('/adminPage');
    }
},[user])

  function login(token: string) {
    setToken(token);
    setUser(user);
    console.log('Token:'+ localStorage.getItem('token'));
    localStorage.setItem('token', token);
    navigate('adminPage');
  }

  function logout() {
    setToken('');
    localStorage.removeItem('token');
    setError('');
    setUser(null);
  }

    return <div className="container login">
        <UserContext.Provider value={{ user: user}}/>
        <h3>Bejelentkezés admin</h3>
    
             <LoginFormAdmin onSuccessfulLogin={login}/> 
             {
              user?.admin ? <>{navigate('adminPage')}</> : 
             <button onClick={logout}>Kijelentkezés</button>
            }
            
        
        
    {
      error ? <>{console.log("Error: "+error)}</> : null
    }
   
    </div >
}