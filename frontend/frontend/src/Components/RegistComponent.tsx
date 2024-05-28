import { FormEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { StyledInput } from "./StyledInput";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";

const API_URL = GLOBAL_API_URL + '/users/regist';

export function RegistComponent() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [passAgain, setPassAgain] = useState('');
    const [registError, setRegistError] = useState('');
    const navigate = useNavigate();

    async function registration(e: FormEvent) {
        e.preventDefault();

        const nameRegex = /^([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+ ){1,3}[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!emailRegex.test(email)) {
            setRegistError('Kérjük, adjon meg egy érvényes e-mail címet!');
            return;
        }

        if (!nameRegex.test(name)) {
            setRegistError('Kérjük, adjon meg egy érvényes teljes nevet! (pl.: Nagy János)');
            return;
        }

        if (pass !== passAgain || pass === '' || passAgain === '') {
            setRegistError('A két jelszó nem egyezik!');
            return;
        }

        if (!passwordRegex.test(pass)) {
            setRegistError('A jelszónak tartalmaznia kell legalább 8 karaktert,\n egy nagybetűt, egy számot\n és egy speciális karaktert!');
            return;
        }
        setRegistError('');
        
        const loginData = {
            email: email,
            name: name,
            password: pass,
            passwordAgain: passAgain,
        }
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
        
        if (response.ok) {
            const tokenObj = await response.json();
            await localStorage.setItem('token', tokenObj.token);
            navigate('/');
        }
        
        if (!response.ok) {
            const errorObj = await response.json();
            setRegistError(errorObj.message);
            return;
        }
    }
        
    return <div className="container login">
    <h3>Regisztráció</h3>
    <form>
        <label htmlFor="email">Email cím</label><br />
        <StyledInput type="email" id="email" name="email"  onChange={e => setEmail(e.currentTarget.value)} placeholder="kiss.jani@gmail.com"/><br />

        <label htmlFor="name">Teljes név</label><br />
        <StyledInput type="text" id="name" name="name" onChange={e => setName(e.currentTarget.value)} placeholder="Kiss János"/><br />

        <label htmlFor="password">Jelszó</label><br />
        <StyledInput type="password" id="password" name="password"  onChange={e => setPass(e.currentTarget.value)} placeholder="Jelszó"/><br />

        <label htmlFor="password-again">Jelszó újra</label><br />
        <StyledInput type="password" id="password-again" name="password-again"  onChange={e => setPassAgain(e.currentTarget.value)} placeholder="Jelszó újra"/><br />

        <button className="btn btn-primary btn-lg" type="submit" onClick={registration}>Regisztráció</button><br />

    </form><br />
    <NavLink className="nav-link" to="/login" >Van már fiókod? Jelentkezz be</NavLink>
    <p>{registError}</p> 
</div >
    }