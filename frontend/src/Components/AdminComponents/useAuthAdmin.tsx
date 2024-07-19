import { useState, useEffect } from 'react';
import { User } from '../../assets/User';
import { useNavigate } from 'react-router-dom';
import { GLOBAL_API_URL } from '../../../GLOBAL_API_URL';

const API_URL = GLOBAL_API_URL + '/users/adminMe';

function useAuthAdmin() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function loadUserData() {
            const storedToken = localStorage.getItem('token');
            //if there is no token, navigate to the login page
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
                //if the user is an admin, then navigate to the booking page
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } 
                //if the user is not an admin, then navigate to the root page
                else if (response.status === 401) {
                    console.error('Unauthorized');
                    navigate('/');
                }
                else if (response.status === 500) {
                    console.error('Unauthorized');
                    navigate('/');
                }
                if(response.ok && location.pathname == '/secret/adminlogin'){
                    navigate('/secret/adminlogin/booking');
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