import { useEffect, useState } from "react";
import { GLOBAL_API_URL } from "../../GLOBAL_API_URL";

const API_URL = GLOBAL_API_URL + '/booking/reserved/getone';

export function GetReservationForUser() {
    const [reservation, setReservation] = useState(null as IReservation | null);
    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem('token');
        if (tokenFromLocalStorage) {
            async function fetchData() {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    "Authorization": `Bearer ${tokenFromLocalStorage}`
            }
            });
            if(response.ok){
                const user = await response.json();
                setReservation(user as IReservation);
            }
            else{
                setReservation(null);
            }
        }
        fetchData();
        }
    },[]);
    
    return{reservation}

}

export default GetReservationForUser;