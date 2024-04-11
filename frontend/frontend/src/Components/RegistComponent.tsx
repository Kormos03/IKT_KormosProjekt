import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function RegistComponent(){
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [passAgain, setPassAgain] = useState('');
    const [registError, setRegistError] = useState('');
    const [backendRoute, setBackendRoute] = useState("http://localhost:3000/users/regist");
    const navigate = useNavigate();


    async function registration(e: FormEvent) {
        e.preventDefault();
        //regex for email, name, password for validation
        const nameRegex = /^([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+ ){1,3}[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+$/;    
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(!emailRegex.test(email)){
            setRegistError('Kérjük, adjon meg egy érvényes e-mail címet!');
            console.log(registError);
            return;
        }

        if(!nameRegex.test(name)){
            setRegistError('Kérjük, adjon meg egy érvényes teljes nevet! (pl.: Nagy János)');
            console.log(registError);
            return;
        }

        if(pass !== passAgain || pass === '' || passAgain === ''){
            setRegistError('A két jelszó nem egyezik!');
            console.log(registError);
            return;
        }

        if(!passwordRegex.test(pass)){
            setRegistError('A jelszónak tartalmaznia kell legalább 8 karaktert,\n egy nagybetűt, egy számot\n és egy speciális karaktert!');
            console.log(registError);
            return;
        }
        setRegistError('');


        const loginData = {
            email: email,
            name: name,
            password: pass,
            passwordAgain: passAgain,
        }

        console.log(loginData);

        //send the new data to the backend
        const response = await fetch(backendRoute, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        //Error handling
        if(response.ok){
            console.log('Sikeres regisztráció!');
            const tokenObj = await response.json();
        await localStorage.setItem('token', tokenObj.token);
        console.log(tokenObj);
        navigate('/');
        }

        if (!response.ok) {
            const errorObj = await response.json();
            setRegistError(errorObj.message);
            return;
        }
        
        
    }

    return <div>
    <div className="container login">
        <h3>Regisztráció</h3>
        <form>
            <label htmlFor="email">Email cím</label><br />
            <input type="email" id="email" name="email"  onChange={e => setEmail(e.currentTarget.value)}/><br />

            <label htmlFor="name">Teljes név</label><br />
            <input type="text" id="name" name="name" onChange={e => setName(e.currentTarget.value)} /><br />
            <label htmlFor="password">Jelszó</label><br />
            <input type="password" id="password" name="password"  onChange={e => setPass(e.currentTarget.value)}/><br />

            <label htmlFor="password-again">Jelszó újra</label><br />
            <input type="password" id="password-again" name="password-again"  onChange={e => setPassAgain(e.currentTarget.value)} /><br />

            <button type="submit" onClick={registration}>Regisztráció</button><br />

        </form>
        <p>{registError}</p> 
    </div >
    </div>
}