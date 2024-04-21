import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { groupBy } from 'lodash';
import { datesToReadableFormatFunc } from "./datesToReadableFormatFunc";
import { BookingModel } from "../BookingModel";
import { renderGroupedBookings } from "./renderGroupedBookings";

export function AdminBookingReserved() {
    const { token } = useAuth();
    const [bookingData, setBookingData] = useState([] as BookingModel[]);
    const [checkedStates, setCheckedStates] = useState({});
    const [open, setOpen] = useState({});

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
    }, []);

   //delete booking
   async function deleteCheckedBookings(bookingIDOfButton: BookingModel) {
    console.log(Object.keys(checkedStates).length)
    if(Object.keys(checkedStates).length !== 0){
    for(const bookingId in checkedStates){
        const response = await fetch('http://localhost:3000/booking/reserved/' + bookingId, {
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
            const response = await fetch('http://localhost:3000/booking/reserved/' + bookingIDOfButton, {
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
        <>
        <div className="container login">
        <h1>Lefoglalt időpontok kezelése</h1> Összes kijelölése <input type="checkbox" onChange={handleMasterCheckboxChange} />
       {
        renderGroupedBookings(groupedBookings, open, setOpen, checkedStates, deleteCheckedBookings, handleCheckboxChange, datesToReadableFormatFunc, true)
       }
        </div>
        </>
    )
}