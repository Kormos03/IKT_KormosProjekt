import { useEffect, useState } from "react";
import useAuth from "./useAuth";


export function UserProfile() {
    const { token, user: userFromAuth, setError } = useAuth();
    const [user, setUser] = useState(userFromAuth); // Create a local state for the user
    const [modify, setModify] = useState(false);
    const [isNameChanged, setIsNameChanged] = useState(false);

   async function changeProfile() {
    modify ? setModify(false) : setModify(true);
        console.log('modify:',modify);
 
        if(modify && isNameChanged){
            const modifyauthorization = window.confirm('Biztosan módosítja a profilját?');
            if(!modifyauthorization || !isNameChanged){
                return;
            }
        }
        if(modify && user && user.name && user.email){
            
            console.log('user:', user);
            //send the new data to the backend
            const response = await fetch('http://localhost:3000/users/' + user.email, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });
            setIsNameChanged(false);
            if(!response.ok){
                setError('Nem sikerült a profil frissítése');
            }

        }
    }

    
    useEffect(() => {
        setUser(userFromAuth); // Update the local user state when the user from the auth context changes
    }, [userFromAuth]);
    //We need to add 3 input field for password change(Old password, new password, new password again)
    return <>
    <strong>Teljes név</strong>
    { 
        modify ? 
            <input type="text" value={user?.name} onChange={(e) => 
                {
                setUser(user? {...user, name: e.currentTarget.value}: user);
                 setIsNameChanged(true)
                }}
                  /> 
            : <p>{ user?.name }</p> 
    }
    
   
    <strong>Email cím</strong>
    
        <p>{ user?.email }</p>
  {
    user?.admin ? <strong>Jogosultság: <p>Admin</p></strong> : null
  }
    <input type="button" value="Profil szerkesztése" onClick={changeProfile}/>
</>
}
