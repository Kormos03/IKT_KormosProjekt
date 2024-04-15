import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { BookingModel } from "../BookingModel";
import { useNavigate } from "react-router-dom";
import { datesToReadableFormatFunc } from "./datesToReadableFormatFunc";
import { Button, Collapse } from "react-bootstrap";
import { groupBy } from 'lodash';
import { FiChevronDown } from "react-icons/fi";

export function AdminBookingNotReserved() {
    const { token, user,error, setToken, setUser, setError } = useAuth();
    const [open, setOpen] = useState({});
    const [bookingData, setBookingData] = useState([] as BookingModel[]);
   // const [not_reserved_AllChecked, set_Not_reserved_AllChecked] = useState(false);
   const [checkedStates, setCheckedStates] = useState({});
   const navigate = useNavigate();
   const groupedBookings = groupBy(bookingData, booking => new Date(booking.dateStart).toDateString());

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
        {//This function groups the bookings by date and displays them in a collapsible list
            Object.entries(groupedBookings).sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime()).map(([date, bookings]) => {
                return (
                    <div key={date}>
                        <Button
                            className="btn btn-success"
                            onClick={() => setOpen(prevOpen => ({ ...prevOpen, [date]: !prevOpen[date] }))}
                            aria-controls={`collapse-${date}`}
                            aria-expanded={open[date]}
                        >
                            {date} 
                            <FiChevronDown style={{ marginLeft: '10px', transition: 'transform 0.3s', transform: `rotate(${open[date] ? 180 : 0}deg)` }} />
                        </Button>
                        <Collapse in={open[date]}>
                            <div id={`collapse-${date}`}>
                                {
                                    bookings.sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()).map((booking: any) => (
                                        <p key={booking.id}>{datesToReadableFormatFunc(booking)} <button className="btn btn-danger btn-sm" onClick={() => deleteCheckedBookings(booking.id)} >Törlés</button> <input type="checkbox" checked={checkedStates[booking.id] || false} onChange={e => handleCheckboxChange(booking.id, e)} /> </p>
                                    ))
                                }
                            </div>
                        </Collapse>
                    </div>
                )
            })
        }
    </div>
);
}