"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const GLOBAL_API_URL_1 = require("../../../GLOBAL_API_URL");
const API_URL = GLOBAL_API_URL_1.GLOBAL_API_URL + '/users/adminMe';
function useAuthAdmin() {
    const [token, setToken] = (0, react_1.useState)(localStorage.getItem('token') || '');
    const [user, setUser] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        async function loadUserData() {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                navigate('/secret/adminlogin');
                return;
            }
            try {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer ${storedToken}`,
                    }
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                }
                else if (response.status === 401) {
                    console.error('Unauthorized');
                    navigate('/');
                }
                else if (response.status === 500) {
                    console.error('Unauthorized');
                    navigate('/');
                }
                if (response.ok && location.pathname == '/secret/adminlogin') {
                    navigate('/secret/adminlogin/booking');
                }
            }
            catch (err) {
                setError('Hiba történt az autentikáció során');
            }
        }
        loadUserData();
    }, [token, navigate]);
    return { token, user, error, setToken, setUser, setError };
}
exports.default = useAuthAdmin;
//# sourceMappingURL=useAuthAdmin.js.map