"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const GLOBAL_API_URL_1 = require("../../GLOBAL_API_URL");
const API_URL = GLOBAL_API_URL_1.GLOBAL_API_URL + '/users/me';
function useAuth() {
    const [token, setToken] = (0, react_1.useState)(localStorage.getItem('token') || '');
    const [user, setUser] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        async function loadUserData() {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                handleLogout();
                return;
            }
            try {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${storedToken}`,
                    }
                });
                if (response.status === 401) {
                    handleLogout();
                    return;
                }
                if (!response.ok) {
                    setError('Hiba történt az autentikáció során');
                    return;
                }
                const userData = await response.json();
                setUser(userData);
            }
            catch (err) {
                setError('Hiba történt az autentikáció során');
                console.error(err);
            }
        }
        loadUserData();
    }, [token]);
    function handleLogout() {
        setError('Please login again');
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('user');
        navigate('/');
    }
    return { token, user, error, setToken, setUser, setError };
}
exports.default = useAuth;
//# sourceMappingURL=useAuth.js.map