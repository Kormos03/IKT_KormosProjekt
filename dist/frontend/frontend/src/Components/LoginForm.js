"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginForm = void 0;
const react_1 = require("react");
const StyledInput_1 = require("./StyledInput");
const react_router_dom_1 = require("react-router-dom");
const GLOBAL_API_URL_1 = require("../../GLOBAL_API_URL");
const API_URL = `${GLOBAL_API_URL_1.GLOBAL_API_URL}/auth/login`;
function LoginForm({ onSuccessfulLogin }) {
    const [email, setEmail] = (0, react_1.useState)('');
    const [pass, setPass] = (0, react_1.useState)('');
    const [loginError, setLoginError] = (0, react_1.useState)('');
    const [rememberMe, setRememberMe] = (0, react_1.useState)(false);
    async function login(e) {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setLoginError('Kérjük, adjon meg egy érvényes e-mail címet!');
            return;
        }
        const loginData = {
            email: email,
            password: pass,
            rememberMe: rememberMe,
        };
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
    };
    return (<div className="container login">
            <h3>Bejelentkezés</h3>
            <form onSubmit={login}>
                <label htmlFor="email">Email cím</label><br />
                <StyledInput_1.StyledInput type="email" id="email" name="email" onChange={e => setEmail(e.currentTarget.value)} placeholder="email cím"/><br />
                <label htmlFor="password">Jelszó</label><br />
                <StyledInput_1.StyledInput type="password" id="password" name="password" onChange={e => setPass(e.currentTarget.value)} placeholder="jelszó"/><br />
                <div className="form-check">
                <label className="form-check-label"><input className="form-check-input" type='checkbox' onChange={() => handleRememberMe()}/>Bejelentkezve maradok</label>
                </div>
                <input className="btn btn-primary btn-md btnLogin" type='submit' value='Bejelentkezés'/>
                <p>{loginError}</p>
            </form>
            <react_router_dom_1.NavLink className="nav-link" to="/register">Nincs még fiókod? Regisztrálj</react_router_dom_1.NavLink>
        </div>);
}
exports.LoginForm = LoginForm;
//# sourceMappingURL=LoginForm.js.map