"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfile = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const GLOBAL_API_URL_1 = require("../../GLOBAL_API_URL");
const useAuth_1 = require("./useAuth");
const API_URL = GLOBAL_API_URL_1.GLOBAL_API_URL + '/users/';
function UserProfile() {
    const { token, user: userFromAuth, error, setError } = (0, useAuth_1.default)();
    const [user, setUser] = (0, react_1.useState)(userFromAuth);
    const [modify, setModify] = (0, react_1.useState)(false);
    const [isNameChanged, setIsNameChanged] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const changeProfile = async () => {
        setModify(!modify);
        if (modify && isNameChanged) {
            if (!user || !user.name) {
                window.alert("A név nem lehet üres");
                navigate(0);
                return;
            }
            const modifyauthorization = window.confirm('Biztosan módosítja a profilját?');
            if (!modifyauthorization || !isNameChanged) {
                return;
            }
        }
        if (modify && user && user.name && user.email) {
            const response = await fetch(API_URL + user.email, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });
            setIsNameChanged(false);
            if (!response.ok)
                setError('Nem sikerült a profil frissítése');
        }
    };
    (0, react_1.useEffect)(() => {
        setUser(userFromAuth);
    }, [userFromAuth]);
    return (<div className="container">
            <strong>Teljes név</strong>
            {modify ? (<input type="text" value={user?.name} onChange={(e) => {
                setUser(user ? { ...user, name: e.currentTarget.value } : user);
                setIsNameChanged(true);
            }}/>) : (<p>{user?.name}</p>)}
    
            <strong>Email cím</strong>
            <p>{user?.email}</p>
    
            {user?.admin && <strong>Jogosultság: <p>Admin</p></strong>}
    
            <input type="button" value="Profil szerkesztése" onClick={changeProfile}/>
            <p>{error}</p>
        </div>);
}
exports.UserProfile = UserProfile;
//# sourceMappingURL=UserProfile.js.map