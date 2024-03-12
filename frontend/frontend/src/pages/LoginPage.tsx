import { useEffect, useState } from "react";
import { LoginForm } from "../Components/LoginForm";
import { User } from "../User";
import { UserProfile } from "../Components/UserProfile";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";

export function LoginPage() {
    const [ token, setToken ] = useState('');
  const [ error, setError ] = useState('')
  const [ user, setUser ] = useState(null as User|null)
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

  useEffect(() => {
    async function loadUserData() {
      const response = await fetch(`http://localhost/3000/users/me`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      if (response.status === 401) {
        /*setToken('');
        localStorage.removeItem('token');
        setError('Please login again');
        return;*/
      }
      if (!response.ok) {
        setError('An error occured, try again later');
        return;
      }
      
      const userData = await response.json() as User;
      console.log(userData);  
      if(userData.admin == true){
        
      }
      setUser(userData);
    }

    if (token) {
      loadUserData();
    } else {
      setUser(null);
    }
  }, [token])

  
  function login(token: string) {
    setToken(token);
    localStorage.setItem('token', token);
    navigate('/');
  }

  function logout() {
    setToken('');
    localStorage.removeItem('token');
    setUser(null);
    localStorage.removeItem('user');
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