import { useState, useEffect } from 'react';
import { User } from '../../assets/User';
import { useNavigate } from 'react-router-dom';
import { GLOBAL_API_URL } from '../../GLOBAL_API_URL';

const API_URL = GLOBAL_API_URL + '/users/adminMe';

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
                else{
                    localStorage.removeItem('token');
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