import { Outlet, useNavigate } from "react-router-dom";
import { LoginFormAdmin } from "../Components/AdminComponents/LoginFormAdmin";
import useAuthAdmin from "../Components/AdminComponents/useAuthAdmin";
import { useEffect } from "react";

export function AdminLoginPage() {
    const { token, user, error, setToken, setUser, setError } = useAuthAdmin();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('useEffect');
        const token = localStorage.getItem('token');
        if (token) {
            user?.admin ? navigate('secret/adminlogin/booking') :
           navigate('/'); 
        }
    }, []);

    function login(token: string) {
        try {
            setToken(token);
            setUser(user);
            localStorage.setItem('token', token);
            navigate('booking');
        } catch (error) {
            setError('Hiba történt a bejelentkezés során');
        }
        setError('');
    }

    return (
        <div className="container login">
            <Outlet />
            {!token && <LoginFormAdmin onSuccessfulLogin={login} />}
            {error && <p>{error}</p>}
        </div>
    );
}