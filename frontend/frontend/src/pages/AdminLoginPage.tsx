import { createContext, useEffect, useState } from "react";
import { User } from "../User";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { LoginFormAdmin } from "../Components/LoginFormAdmin";
import useAuth from "../Components/useAuth";
import useAuthAdmin from "../Components/useAuthAdmin";

export const UserContext = createContext({ user: null as User|null});

export function AdminLoginPage() {
  const { token, user,error, setToken, setUser, setError } = useAuthAdmin();
  const [ isLoggedIn, setIsLoggedIn ] = useState('0');
  const [backendRoute, setBackendRoute] = useState("http://localhost:3000/users/me");
  const navigate = useNavigate();


  
  useEffect(() => {

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);

    }
    

  }, [token]);



  function login(token: string) {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    console.log('Token:'+ localStorage.getItem('token'));
    localStorage.setItem('user', JSON.stringify(user?.admin));
    navigate('adminPage');
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

    <Outlet/>
    {
      isLoggedIn == '1' ? null : <LoginFormAdmin onSuccessfulLogin={login}/> 
    }        
    {
      error ? <>{console.log("Error: "+error)}</> : null
    }
   
    </div >
}