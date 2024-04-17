import { useEffect, useState } from "react";
import { LoginForm } from "../Components/LoginForm";
import { User } from "../User";
import { UserProfile } from "../Components/UserProfile";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";
import useAuth from "../Components/useAuth";

export function LoginPage() {
  const navigate = useNavigate();
  
  function login(token: string) {
   // setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userLoggedIn', '1');
    navigate('/');
  }

    return <>
         <NavigationBar />
         <div className="main-content">
      <LoginForm onSuccessfulLogin={login} />
      </div>
    </>
}