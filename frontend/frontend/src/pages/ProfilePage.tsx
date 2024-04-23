import { useEffect } from "react";
import { UserProfile } from "../Components/UserProfile";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";
import useAuth from "../Components/useAuth";

export function ProfilePage(){
  const { user,error, setToken, setUser, setError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if(user?.admin){
        setToken('');
        localStorage.removeItem('token');
        setUser(null);
        localStorage.removeItem('user');
        setError('You are an admin');
        navigate('/login')
        return;
      }}, [])
  
 

    return (
        <>
        <NavigationBar/>
        <div className="container main-content">
            {
      user? <UserProfile /> : null
            }
            {
                error? <p>{error}</p> : null
            }

            </div>
        </>
    );
}