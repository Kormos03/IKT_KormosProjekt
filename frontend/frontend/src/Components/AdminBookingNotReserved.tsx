import { useEffect, useState } from "react";
import useAuth from "./useAuth";

export function AdminBookingNotReserved() {
    const { token, user,error, setToken, setUser, setError } = useAuth();
    const [bookingData, setBookingData] = useState([]);

    useEffect(() => {
        async function getAllNotReserved() {
             const response = await fetch(`http://localhost:3000/booking/not_reserved/`, {
                 method: 'GET',
                 headers: {
                     'Content-type': 'application/json',
                     'Accept': 'application/json',
                     'Authorization': `Bearer ${token}`
                 },
             });
             if (!response.ok) {
                 const errorObj = await response.json();
                 console.log(errorObj);
                 return;
             }
             const data = await response.json();
            await setBookingData(data);
         }

        getAllNotReserved();
    }, [bookingData] || [user] || [token] || []);

    //delete booking
    function deleteBooking(id: number) {
        async function deleteBookingFetch() {
            const response = await fetch('http://localhost:3000/booking/not_reserved/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                const errorObj = await response.json();
                console.log(errorObj);
                return;
            }
    }
    deleteBookingFetch();
}

    return (
        <>
        <div className="container login">
        <h1>Szabad időpontok kezelése</h1> Összes kijelölése <input type="checkbox" />
        {
            bookingData.sort().map((booking: any) => {
                return (
                    <div key={booking.id}>
                        <p>{booking.dateStart} - {booking.dateEnd} <button onClick={() => deleteBooking(booking.id)} >Törlés</button> <input type="checkbox"/> </p>
                    </div>
                )
            })
        }
        </div>
        </>
    )
}