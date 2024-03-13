import { createContext, useEffect, useState } from "react";
import { User } from "../User";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { LoginFormAdmin } from "../Components/LoginFormAdmin";
import useAuth from "../Components/useAuth";

export const UserContext = createContext({ user: null as User|null});

export function AdminLoginPage() {
  const { token, user,error, setToken, setUser, setError } = useAuth();
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
    if(user?.admin){
    localStorage.setItem('user', JSON.stringify(user?.admin));
    navigate('adminPage');
    }
},[user] || [])

  function login(token: string) {
    setToken(token);
    setUser(user);
    console.log('Token:'+ localStorage.getItem('token'));
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user?.admin));

  }


  function logout() {
    setToken('');
    localStorage.removeItem('token');
    setError('');
    setUser(null);
    localStorage.removeItem('user');
  }

    return <div className="container login">
        <UserContext.Provider value={{ user: user}}/>
        <h3>Bejelentkezés admin</h3>
    <Outlet/>
    {
      user?.admin ? null : <LoginFormAdmin onSuccessfulLogin={login}/> 
    }        
    {
      error ? <>{console.log("Error: "+error)}</> : null
    }
   
    </div >
}