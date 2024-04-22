import { useEffect, useState } from "react";
import { UserProfile } from "../Components/UserProfile";
import { User } from "../assets/User";
import { NavLink, useNavigate } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";
import useAuth from "../Components/useAuth";

export function ProfilePage(){
  const { token, user,error, setToken, setUser, setError } = useAuth();

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
  
 

    return (
        <>
        <NavigationBar/>
        <div className="container main-content">
            {
      user? <UserProfile user={user} /> : null
            }
            {
                error? <p>{error}</p> : null
            }

            </div>
        </>
    );
}