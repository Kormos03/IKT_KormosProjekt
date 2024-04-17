import { useEffect, useState } from "react";
import { UserProfile } from "../Components/UserProfile";
import { User } from "../User";
import { NavLink, useNavigate } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";
import useAuth from "../Components/useAuth";
import { AdminNavigationBar } from "../Components/AdminNavigationBar";
import useAuthAdmin from "../Components/useAuthAdmin";

export function AdminProfilePage(){
  const { token, user,error, setToken, setUser, setError } = useAuthAdmin();

    const [backendRoute, setBackendRoute] = useState('http://localhost:3000/users/me');
    const navigate = useNavigate();
  
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      }, []);
    return (
        <>
        <AdminNavigationBar />
        <div className="container  main-content">
            {
      user? <UserProfile/> : null
            }
            {
                error? <p>{error}</p> : null
            }


            </div>
        </>
    );
}