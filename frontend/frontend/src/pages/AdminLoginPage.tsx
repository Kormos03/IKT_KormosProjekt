import { useEffect, useState } from "react";
import { LoginForm } from "../Components/LoginForm";
import { User } from "../User";
import { UserProfile } from "../Components/UserProfile";
import { Navigate } from "react-router-dom";

export function AdminLoginPage() {
    const [ token, setToken ] = useState('');
  const [ error, setError ] = useState('')
  const [ user, setUser ] = useState(null as User|null)
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    async function loadUserData() {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      if (response.status === 200) {
        const userData = await response.json();

        if (!userData!.admin) {
          setError('Access denied. Only admins can access this page.');
          return;
        }
        setUser(userData);
        setIsLoggedIn(true);
      } else if (response.status === 401) {
        setToken('');
        localStorage.removeItem('token');
        setError('Please login again');
        return;
      } else {
        setError('An error occurred, try again later');
      }
    }
    loadUserData();
  }, [token]);

  function login(token: string) {
    setToken(token);
    localStorage.setItem('token', token);
    return <Navigate to="/adminPage" />;
  }

  function logout() {
    setToken('');
    localStorage.removeItem('token');
  }

    return <div className="container">
        <h3>Bejelentkezés admin</h3>
        {
            token ?
                <p>You are logged in. <button onClick={logout}>Log out</button></p>
            : <LoginForm onSuccessfulLogin={login}/>
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
}