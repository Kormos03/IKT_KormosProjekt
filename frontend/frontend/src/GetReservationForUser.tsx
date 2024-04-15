import { useEffect, useState } from "react";


export function GetReservationForUser() {
    const [reservation, setReservation] = useState({} as IReservation);
    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem('token');
        if (tokenFromLocalStorage) {
            async function fetchData() {
            const response = await fetch('http://localhost:3000/booking/reserved/getone', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    "Authorization": `Bearer ${tokenFromLocalStorage}`
            }
            });
            if(response.ok){
                const user = await response.json();
                setReservation(user);
            }
            if(!response.ok){
                console.log('Hiba a lekérdezés során');
                setReservation({} as IReservation);
            }
        }
        fetchData();
        }
    },[]);
    return{reservation}
}

export default GetReservationForUser;