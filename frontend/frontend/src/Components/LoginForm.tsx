import { FormEvent, useState } from "react";
import { StyledInput } from "./StyledInput";
import { NavLink } from "react-router-dom";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";

interface Props {
    onSuccessfulLogin: (token: string) => void;
}

//const API_URL = "http://localhost:3000/auth/login";
const API_URL = `${GLOBAL_API_URL}/auth/login`;

export function LoginForm({ onSuccessfulLogin }: Props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loginError, setLoginError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    async function login(e: FormEvent) {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            setLoginError('Kérjük, adjon meg egy érvényes e-mail címet!');
            return;
        }

        const loginData = {
            email: email,
            password: pass,
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            const errorObj = await response.json();
            setLoginError(errorObj.message);
            return;
        }
        const tokenObj = await response.json();
        onSuccessfulLogin(tokenObj.token);

        setLoginError('');
        setEmail('');
        setPass('');
    }

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    }

    return (
        <div className="container login">
            <h3>Bejelentkezés</h3>
            <form onSubmit={login}>
                <label htmlFor="email">Email cím</label><br />
                <StyledInput type="email" id="email" name="email"  onChange={e => setEmail(e.currentTarget.value)} placeholder="email cím"/><br />
                <label htmlFor="password">Jelszó</label><br />
                <StyledInput type="password" id="password" name="password"  onChange={e => setPass(e.currentTarget.value)} placeholder="jelszó"/><br />
                <div className="form-check">
                <label className="form-check-label"><input className="form-check-input" type='checkbox' onChange={() => handleRememberMe()}/>Bejelentkezve maradok</label>
                </div>
                <input className="btn btn-primary btn-md btnLogin" type='submit' value='Bejelentkezés' />
                <p>{loginError}</p>
            </form>
            <NavLink className="nav-link" to="/register" >Nincs még fiókod? Regisztrálj</NavLink>
        </div>
    );
}