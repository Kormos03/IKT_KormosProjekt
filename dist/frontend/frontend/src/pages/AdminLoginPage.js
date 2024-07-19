"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminLoginPage = void 0;
const react_router_dom_1 = require("react-router-dom");
const LoginFormAdmin_1 = require("../Components/AdminComponents/LoginFormAdmin");
const useAuthAdmin_1 = require("../Components/AdminComponents/useAuthAdmin");
const react_1 = require("react");
function AdminLoginPage() {
    const { token, user, error, setToken, setUser, setError } = (0, useAuthAdmin_1.default)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        console.log('useEffect');
    }, []);
    function login(token) {
        try {
            setToken(token);
            setUser(user);
            localStorage.setItem('token', token);
            navigate('booking');
        }
        catch (error) {
            setError('Hiba történt a bejelentkezés során');
        }
        setError('');
    }
    return (<div className="container login">
            <react_router_dom_1.Outlet />
            {!token && <LoginFormAdmin_1.LoginFormAdmin onSuccessfulLogin={login}/>}
            {error && <p>{error}</p>}
        </div>);
}
exports.AdminLoginPage = AdminLoginPage;
//# sourceMappingURL=AdminLoginPage.js.map