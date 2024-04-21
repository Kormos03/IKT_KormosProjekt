import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { BookingModel } from "../BookingModel";
import { useNavigate } from "react-router-dom";
import { datesToReadableFormatFunc } from "./datesToReadableFormatFunc";
import { groupBy } from 'lodash';
import { renderGroupedBookings } from "./renderGroupedBookings";

export function AdminBookingNotReserved() {
    const { token } = useAuth();
    const [open, setOpen] = useState({});
    const [bookingData, setBookingData] = useState([] as BookingModel[]);
   const [checkedStates, setCheckedStates] = useState({});

   const navigate = useNavigate();

   const groupedBookings = groupBy(bookingData, booking => new Date(booking.dateStart).toDateString());

   const handleMasterCheckboxChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const newCheckedStates: { [key: number]: boolean } = {};
    bookingData.forEach((booking) => {
        newCheckedStates[booking.id] = isChecked;
    });
    setCheckedStates(newCheckedStates);
};

const handleCheckboxChange = (bookingId : number, e : React.ChangeEvent<HTMLInputElement>) => {
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
    },  []);

    //delete booking
   async function deleteCheckedBookings(bookingIDOfButton: BookingModel) {
        console.log(Object.keys(checkedStates).length)
        if(Object.keys(checkedStates).length !== 0){
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
            }}}
            else{
                const response = await fetch('http://localhost:3000/booking/not_reserved/' + bookingIDOfButton, {
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
                navigate(0);
}

return (
    <div className="container login">
        <h1>Szabad időpontok kezelése</h1> Összes kijelölése <input type="checkbox" onChange={handleMasterCheckboxChange} />
        {
        //This function groups the bookings by date and displays them in a collapsible list
            renderGroupedBookings(groupedBookings, open, setOpen, checkedStates, deleteCheckedBookings, handleCheckboxChange, datesToReadableFormatFunc, false)
        }
    </div>
);
}