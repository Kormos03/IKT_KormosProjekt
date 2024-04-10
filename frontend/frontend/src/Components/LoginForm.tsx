import { FormEvent, useState } from "react";

interface Props {
    onSuccessfulLogin: (token: string) => void;
}

export function LoginForm({ onSuccessfulLogin }: Props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loginError, setLoginError] = useState('');
    const [backendRoute, setBackendRoute] = useState("http://localhost:3000/auth/login");


    async function login(e: FormEvent) {
        e.preventDefault();

        const loginData = {
            email: email,
            password: pass,
        }

        const response = await fetch(backendRoute, {
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

    return <form onSubmit={login} className="login">
        Email: <input type='email' onChange={e => setEmail(e.currentTarget.value)} />
        Password: <input type='password' onChange={e => setPass(e.currentTarget.value)} /> <br />
        <input className="btn btn-primary btn-md" type='submit' value='Login' />
    </form>
}

