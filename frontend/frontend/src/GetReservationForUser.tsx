import { useEffect, useState } from "react";

//This component is responsible for getting the reservation for the user
export function GetReservationForUser() {
    const [reservation, setReservation] = useState(null as IReservation | null);
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
                console.log(user)
                setReservation(user as IReservation);
            }
            else{
                console.log('Hiba a lekérdezés során');
                setReservation(null);
            }
        }
        fetchData();
        }
    },[]);
    
    return{reservation}

}

export default GetReservationForUser;