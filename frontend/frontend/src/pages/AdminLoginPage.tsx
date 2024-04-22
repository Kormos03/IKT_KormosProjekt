import { Outlet, useNavigate } from "react-router-dom";
import { LoginFormAdmin } from "../Components/LoginFormAdmin";
import useAuthAdmin from "../Components/useAuthAdmin";

export function AdminLoginPage() {
    const { token, user, error, setToken, setUser, setError } = useAuthAdmin();
    const navigate = useNavigate();

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