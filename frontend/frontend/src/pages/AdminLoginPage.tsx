import { Outlet, useNavigate } from "react-router-dom";
import { LoginFormAdmin } from "../Components/LoginFormAdmin";
import useAuthAdmin from "../Components/useAuthAdmin";

export function AdminLoginPage() {
  const { token, user,error, setToken, setUser, setError } = useAuthAdmin();;
  const navigate = useNavigate();

  function login(token: string) {
    try{
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    console.log('Token:'+ localStorage.getItem('token'));
    navigate('booking');
    }
    catch(error){
      setError('Hiba történt a bejelentkezés során');
    }
    setError('');
    }

    return <div className="container login">
    <Outlet/>
    {
      token ? null : <LoginFormAdmin onSuccessfulLogin={login}/> 
    }        
    {
     <p>{error}</p>
    }
    </div >
}