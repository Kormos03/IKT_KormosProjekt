import { FormEvent, useState } from "react";
import { GLOBAL_API_URL } from "../../GLOBAL_API_URL";

interface Props {
    onSuccessfulLogin: (token: string) => void;
}

//const API_URL = "http://localhost:3000/auth/katus/admin/login";
const API_URL = `${GLOBAL_API_URL}/auth/katus/admin/login`;

export function LoginFormAdmin({ onSuccessfulLogin }: Props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loginError, setLoginError] = useState('');

    async function login(e: FormEvent) {
        e.preventDefault();

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

        if (!response.ok || response.status === 500) {
            const errorObj = await response.json();
            setLoginError(errorObj.message);
            localStorage.removeItem('token');
            return;
        }

        if(response.status === 201){
            const tokenObj = await response.json();
            localStorage.setItem('token', tokenObj.token);
            onSuccessfulLogin(tokenObj.token);
        }

        setLoginError('');
        setEmail('');
        setPass('');
    }

    return (
        <div className="container">
            <form onSubmit={login} className="login">
                <h3>Bejelentkezés Admin</h3>
                Email: <input type='email' onChange={e => setEmail(e.currentTarget.value)} />
                Password: <input type='password' onChange={e => setPass(e.currentTarget.value)} /> <br />
                <input className="btn btn-primary btn-md" type='submit' value='Login' />
                <p>{loginError}</p>
            </form>
        </div>
    );
}