import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../User";
import { AdminNavigationBar } from "../Components/AdminNavigationBar";
import useAuth from "../Components/useAuth";
import { RequestFunc } from "../RequestFunc";

export function AdminPage(){
  //It calls the useAuth function from useAuth.tsx that authenticates the user
  const { token, user,error, setToken, setUser, setError } = useAuth();
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [backendRoute, setBackendRoute] = useState("http://localhost:3000/users/me");
    const navigate = useNavigate();
  
  
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
      else{
        navigate('/secret/adminlogin');
    }
    }, [] || token);  
  
    return <>         
     <AdminNavigationBar/>
        <div>
            <h1>THIS IS THE ADMINPAGE</h1>
        </div>
        </>
}