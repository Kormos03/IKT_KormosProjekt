import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../User";
import { AdminNavigationBar } from "../Components/AdminNavigationBar";

export function AdminPage(){
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
      async function loadUserData() {
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
          //If the user is not an admin, redirect to the main page
          if(!userData.admin){
            navigate('/');
          }
        } else if (response.status === 401) {
          navigate("secret/adminlogin/")
          setToken('');
          localStorage.removeItem('token');
          setError('Please login again');
          //console.log(error)
          return;
        } else {
          setError('An error occurred, try again later');
          //console.log(error)
        }
      }
      loadUserData();
  
    }, []);
  
  
    return <>         
     <AdminNavigationBar/>
        <div>
            <h1>THIS IS THE ADMINPAGE</h1>
        </div>
        </>
}