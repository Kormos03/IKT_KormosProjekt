import { FormEvent, useState } from "react";

export function RegistComponent(){
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [passAgain, setPassAgain] = useState('');
    const [loginError, setLoginError] = useState('');
    const [backendRoute, setBackendRoute] = useState("http://localhost:3000/auth/regist");


    async function registration(e: FormEvent) {
        e.preventDefault();

        const nameRegex = /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+ [A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(!emailRegex.test(email)){
            setLoginError('Kérjük, adjon meg egy érvényes e-mail címet!');
            console.log(loginError);
            return;
        }

        if(!nameRegex.test(name)){
            setLoginError('Kérjük, adjon meg egy érvényes teljes nevet! (pl.: Nagy János)');
            console.log(loginError);
            return;
        }

        if(pass !== passAgain || pass === '' || passAgain === ''){
            setLoginError('A két jelszó nem egyezik!');
            console.log(loginError);
            return;
        }

        if(!passwordRegex.test(pass)){
            setLoginError('A jelszónak tartalmaznia kell legalább 8 karaktert,\n egy nagybetűt, egy számot\n és egy speciális karaktert!');
            console.log(loginError);
            return;
        }
        setLoginError('');


        const loginData = {
            email: email,
            password: pass,
            passwordAgain: passAgain,
        }
        console.log(loginData);
    }
    return <div>
    <div className="container login">
        <h3>Regisztráció</h3>
        <form>
            <label htmlFor="email">Email cím</label><br />
            <input type="email" id="email" name="email"  onChange={e => setEmail(e.currentTarget.value)}/><br />

            <label htmlFor="name">Felhasználónév</label><br />
            <input type="text" id="name" name="name" onChange={e => setName(e.currentTarget.value)} /><br />
            <label htmlFor="password">Jelszó</label><br />
            <input type="password" id="password" name="password"  onChange={e => setPass(e.currentTarget.value)}/><br />

            <label htmlFor="password-again">Jelszó újra</label><br />
            <input type="password" id="password-again" name="password-again"  onChange={e => setPassAgain(e.currentTarget.value)} /><br />

            <button type="submit" onClick={registration}>Regisztráció</button><br />

        </form>
        <p>{loginError}</p> 
    </div >
    </div>
}