import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { groupBy } from 'lodash';
import { datesToReadableFormatFunc } from "../../assets/datesToReadableFormatFunc";
import { BookingModel } from "../../assets/BookingModel";
import { renderGroupedBookings } from "./renderGroupedBookings";
import useAuthAdmin from "./useAuthAdmin";
import { GLOBAL_API_URL } from "../../../GLOBAL_API_URL";

const API_URL = GLOBAL_API_URL +  '/booking/not_reserved/';

export function AdminBookingNotReserved() {
    const { token } = useAuthAdmin();
    const [bookingData, setBookingData] = useState([] as BookingModel[]);
    const [checkedStates, setCheckedStates] = useState({});
    const [isModalOpen, setIsModalOpen] = useState({});

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
        fetchAllNotReservedBookings();
    }, []);

    async function fetchAllNotReservedBookings() {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Hiba történt a lekérdezés során');
            }
            const data = await response.json();
            setBookingData(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteCheckedBookings(bookingIDOfButton: BookingModel) {
        try {
            if(Object.keys(checkedStates).length !== 0){
                for(const bookingId in checkedStates){
                    await deleteBooking(bookingId);
                }
            } else {
                await deleteBooking(bookingIDOfButton);
            }
            navigate(0);
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteBooking(bookingId: string | BookingModel) {
        const response = await fetch(API_URL + bookingId, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Hiba történt a törlés során');
        }
    }

    return (
        <div className="container login">
            <h1>Szabad időpontok kezelése</h1> 
            Összes kijelölése <input type="checkbox" onChange={handleMasterCheckboxChange} />
            {
                renderGroupedBookings(groupedBookings, isModalOpen, setIsModalOpen, checkedStates, deleteCheckedBookings, handleCheckboxChange, datesToReadableFormatFunc, false)
            }
        </div>
    )
}