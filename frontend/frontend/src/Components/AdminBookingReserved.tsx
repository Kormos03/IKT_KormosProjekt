import { useEffect, useState } from "react";
import useAuth from "./useAuth";

export function AdminBookingReserved() {
    const { token, user,error, setToken, setUser, setError } = useAuth();
    const [bookingData, setBookingData] = useState([]);
    const [checkedStates, setCheckedStates] = useState({});

    const handleMasterCheckboxChange = (e) => {
     const isChecked = e.target.checked;
     const newCheckedStates = {};
     bookingData.forEach((booking) => {
         newCheckedStates[booking.id] = isChecked;
     });
     setCheckedStates(newCheckedStates);
 };
 
 const handleCheckboxChange = (bookingId, e) => {
     setCheckedStates({
         ...checkedStates,
         [bookingId]: e.target.checked,
     });
 };

    useEffect(() => {
        async function getAllReserved() {
             const response = await fetch(`http://localhost:3000/booking/reserved/`, {
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

        getAllReserved();
    }, [bookingData] || [user] || [token] || []);

   //delete booking
   async function deleteCheckedBookings() {
    for(const bookingId in checkedStates){
        const response = await fetch('http://localhost:3000/booking/not_reserved/' + bookingId, {
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
        }}
}

    return (
        <>
        <div className="container login">
        <h1>Lefoglalt időpontok kezelése</h1> Összes kijelölése <input type="checkbox" onChange={handleMasterCheckboxChange} />
        {
            bookingData.sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()).map((booking: any) => {
                return (
                    <div key={booking.id}>
                                          <p>{booking.dateStart} - {booking.dateEnd} <button onClick={() => deleteCheckedBookings()} >Törlés</button> <input type="checkbox" checked={checkedStates[booking.id] || false} onChange={e => handleCheckboxChange(booking.id, e)} /> </p>

                    </div>
                )
            })
        }
        </div>
        </>
    )
}