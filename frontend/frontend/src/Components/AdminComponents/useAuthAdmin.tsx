import { useState, useEffect } from 'react';
import { User } from '../../assets/User';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/users/adminMe';

function useAuthAdmin() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function loadUserData() {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                navigate('/secret/adminlogin');
                return;
            }

            try {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer ${storedToken}`,
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else if (response.status === 401) {
                    navigate('/secret/adminlogin');
                }
            } catch (err) {
                setError('Hiba történt az autentikáció során');
            }
        }

        loadUserData();
    }, [token, navigate]);

    return { token, user, error, setToken, setUser, setError };
}

export default useAuthAdmin;