import { NavigationBar } from "../Components/NavigationBar";
import useAuth from "../Components/useAuth";

export function RegisterPage() {
    const { token, user,error, setToken, setUser, setError } = useAuth();
    return <>
    <NavigationBar />
     <div className="container">
        <h3>Regisztráció</h3>
        <form>
            <label htmlFor="username">Felhasználónév</label><br />
            <input type="text" id="username" name="username" /><br />
            <label htmlFor="password">Jelszó</label><br />
            <input type="password" id="password" name="password" /><br />
            <label htmlFor="password-again">Jelszó újra</label><br />
            <input type="password" id="password-again" name="password-again" /><br />
            <button type="submit">Regisztráció</button><br />
        </form>
    </div >
    </>
}