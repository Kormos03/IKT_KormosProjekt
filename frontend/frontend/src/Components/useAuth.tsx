import { useState, useEffect } from 'react';
import { User } from '../User';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/users/me';

function useAuth() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function loadUserData() {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                handleLogout();
                return;
            }

            try {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${storedToken}`,
                    }
                });

                if (response.status === 401) {
                    handleLogout();
                    return;
                }

                if (!response.ok) {
                    setError('An error occurred, try again later');
                    return;
                }

                const userData = await response.json() as User;
                setUser(userData);
                localStorage.setItem('userLoggedIn', '1');
            } catch (err) {
                setError('An error occurred during authentication');
                console.error(err);
            }
        }

        loadUserData();
    }, [token]);

    function handleLogout() {
        setError('Please login again');
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('user');
        navigate('/');
    }

    return { token, user, error, setToken, setUser, setError };
}

export default useAuth;