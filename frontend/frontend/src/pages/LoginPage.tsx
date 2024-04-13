import { useEffect, useState } from "react";
import { LoginForm } from "../Components/LoginForm";
import { User } from "../User";
import { UserProfile } from "../Components/UserProfile";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";
import useAuth from "../Components/useAuth";

export function LoginPage() {
 //const { token, user,error, setToken, setUser, setError } = useAuth();
  const navigate = useNavigate();

 /* useEffect(() => {
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
  }, []);*/

  

  
  function login(token: string) {
   // setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userLoggedIn', '1');
    navigate('/');
  }

    return <>
         <NavigationBar />
      <LoginForm onSuccessfulLogin={login} />
      
    </>
}