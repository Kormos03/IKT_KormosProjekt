import { FormEvent, useState } from "react";

interface Props {
    onSuccessfulLogin: (token: string) => void;
}

export function LoginFormAdmin({ onSuccessfulLogin }: Props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loginError, setLoginError] = useState('');
    const [backendRoute, setBackendRoute] = useState("http://localhost:3000/auth/katus/admin/login");

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
        console.log(response.status)
        if (!response.ok) {
            const errorObj = await response.json();
            setLoginError(errorObj.message);
            return;
        }
        if(response.status === 500){
            setLoginError('Server error');
            return;
        }
        if(response.status == 201){
        const tokenObj = await response.json();
        localStorage.setItem('token', tokenObj.token);
        console.log('Token:'+ localStorage.getItem('token'));
        onSuccessfulLogin(tokenObj.token);
    }
        setLoginError('');
        setEmail('');
        setPass('');
    }

    return <form onSubmit={login} className="login">
        Email: <input type='email' onChange={e => setEmail(e.currentTarget.value)} />
        Password: <input type='password' onChange={e => setPass(e.currentTarget.value)} />
        <input type='submit' value='Login' />
        <p>{loginError}</p>
    </form>
}

