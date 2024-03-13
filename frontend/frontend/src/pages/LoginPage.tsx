import { useEffect, useState } from "react";
import { LoginForm } from "../Components/LoginForm";
import { User } from "../User";
import { UserProfile } from "../Components/UserProfile";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";
import useAuth from "../Components/useAuth";

export function LoginPage() {
  const { token, user,error, setToken, setUser, setError } = useAuth();
  const navigate = useNavigate();

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
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  

  
  function login(token: string) {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userLoggedIn', '1');
    navigate('/');
  }

  function logout() {
    setToken('');
    localStorage.removeItem('token');
    setUser(null);
    localStorage.removeItem('userLoggedIn');
  }

    return <>
     
         <NavigationBar />
    
    <div className="container">
        <h3>Bejelentkezés</h3>
        {
      token ?
        <p>You are logged in. <button onClick={logout}>Log out</button></p>
      : <LoginForm onSuccessfulLogin={login} />
    }
    {
      error ? <p>{error}</p> : null
    }
    {
      user ? <UserProfile user={user} /> : null
    }
    {
      user?.admin? <p>Userek listája</p> : null
    }
    </div >
    </>
}