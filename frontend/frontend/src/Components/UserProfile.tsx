import { useEffect, useState } from "react";
import useAuthAdmin from "./AdminComponents/useAuthAdmin";
import { useNavigate } from "react-router-dom";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";

const API_URL = GLOBAL_API_URL + '/users/';

export function UserProfile() {
    const { token, user: userFromAuth, error, setError } = useAuthAdmin();
    const [user, setUser] = useState(userFromAuth);
    const [modify, setModify] = useState(false);
    const [isNameChanged, setIsNameChanged] = useState(false);
    const navigate = useNavigate();

    const changeProfile = async () => {
        setModify(!modify);
        if (modify && isNameChanged) {
            if(!user || !user.name) {
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
            if (!response.ok) setError('Nem sikerült a profil frissítése');
        }
    };

    useEffect(() => {
        setUser(userFromAuth);
    }, [userFromAuth]);
    
    return (
        <div className="container">
            <strong>Teljes név</strong>
            {modify ? (
                <input
                    type="text"
                    value={user?.name}
                    onChange={(e) => {
                        setUser(user ? { ...user, name: e.currentTarget.value } : user);
                        setIsNameChanged(true);
                    }}
                />
            ) : (
                <p>{user?.name}</p>
            )}
    
            <strong>Email cím</strong>
            <p>{user?.email}</p>
    
            {user?.admin && <strong>Jogosultság: <p>Admin</p></strong>}
    
            <input type="button" value="Profil szerkesztése" onClick={changeProfile} />
            <p>{error}</p>
        </div>
    );
}