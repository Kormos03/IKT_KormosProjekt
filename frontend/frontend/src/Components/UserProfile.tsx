import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const API_URL = 'http://localhost:3000/users/';

export function UserProfile() {
    const { token, user: userFromAuth, setError } = useAuth();
    const [user, setUser] = useState(userFromAuth);
    const [modify, setModify] = useState(false);
    const [isNameChanged, setIsNameChanged] = useState(false);

    const changeProfile = async () => {
        setModify(!modify);
        if (modify && isNameChanged) {
            const modifyauthorization = window.confirm('Biztosan módosítja a profilját?');
            if (!modifyauthorization || !isNameChanged) return;
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
        </div>
    );
}