import { useEffect, useState } from "react";
import useAuth from "./useAuth";

export function AdminBookingNotReserved() {
    const { token, user,error, setToken, setUser, setError } = useAuth();
    const [bookingData, setBookingData] = useState([]);
   // const [not_reserved_AllChecked, set_Not_reserved_AllChecked] = useState(false);
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
        <h1>Szabad időpontok kezelése</h1> Összes kijelölése <input type="checkbox" onChange={handleMasterCheckboxChange} />
        {
            bookingData.sort().map((booking: any) => {
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