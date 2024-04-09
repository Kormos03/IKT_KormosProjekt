import { useEffect, useState } from "react";
import { UserProfile } from "../Components/UserProfile";
import { User } from "../User";
import { NavLink, useNavigate } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";
import useAuth from "../Components/useAuth";

export function AdminProfilePage(){
  const { token, user,error, setToken, setUser, setError } = useAuth();

    const [backendRoute, setBackendRoute] = useState('http://localhost:3000/users/me');
    const navigate = useNavigate();
  
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      }, []);

 
      function changeProfile(){
        //send a request to the backend to change the profile name, or email, maybe the password
      }

    return (
        <>
        <NavigationBar/>
        <div className="container">
            {
      user? <UserProfile user={user} /> : null
            }
            {
                error? <p>{error}</p> : null
            }

        <input type="button" value="Profil szerkesztése" onClick={changeProfile}/>
            </div>
        </>
    );
}