"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePage = void 0;
const react_1 = require("react");
const UserProfile_1 = require("../Components/UserProfile");
const react_router_dom_1 = require("react-router-dom");
const NavigationBar_1 = require("../Components/NavigationBar");
const useAuth_1 = require("../Components/useAuth");
function ProfilePage() {
    const { user, error, setToken, setUser, setError } = (0, useAuth_1.default)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        if (user?.admin) {
            setToken('');
            localStorage.removeItem('token');
            setUser(null);
            localStorage.removeItem('user');
            setError('You are an admin');
            navigate('/login');
            return;
        }
    }, []);
    return (<>
        <NavigationBar_1.NavigationBar />
        <div className="container main-content">
            {user ? <UserProfile_1.UserProfile /> : null}
            {error ? <p>{error}</p> : null}

            </div>
        </>);
}
exports.ProfilePage = ProfilePage;
//# sourceMappingURL=ProfilePage.js.map