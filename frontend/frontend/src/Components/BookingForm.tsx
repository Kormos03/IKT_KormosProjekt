import { useEffect, useState } from "react";
import { GetBooking } from "../GetBooking";
import useAuth from "./useAuth";

export function BookingForm(){
    const { token, user,error, setToken, setUser, setError } = useAuth();
    const [getBooking, setGetBooking] = useState([] as GetBooking[]); //
    const allofthebookings = [];
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [extra, setExtra] = useState(false);

    //post request to get all timestamps for a given date
    async function postRequestForfindAllByDate(dateInFunction: string){
        //I need to send the date in the format of yyyy-mm-dd
        const response = await fetch('http://localhost:3000/booking/not_reserved/bydate/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ date: dateInFunction }),
        });

        if (!response.ok) {
            const errorObj = await response.json();
            setError(errorObj.message);
            console.log('Date in function:',dateInFunction);
            return;
        }
        const bookingObj = await response.json();
       await console.log('Chosen date:',bookingObj);
    }


    //ellenőrzés
    useEffect(() => {
        console.log(type);
        console.log(extra);
        console.log(date);
        console.log(time);
    }, [type] || [extra] || [date] || [time] || []);

    //get all dates from backend
    useEffect(() => {
        
        async function getDatesFromBackend(){
            const response = await fetch('http://localhost:3000/booking/not_reserved/', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                const errorObj = await response.json();
                setError(errorObj.message);
                return;
            }
            const bookingObj = await response.json();
            console.log(bookingObj);
            const convertedBookings = convertISOToHTMLDateAndTimeString(bookingObj);
            setGetBooking(convertedBookings);
        }
        function getDatesFromBackendNotAsync(){
            getDatesFromBackend();
        }
        getDatesFromBackendNotAsync();

    }, [] || [getBooking] || [type]);

    function convertISOToHTMLDateAndTimeString(bookings: GetBooking[]) {
        const allofthebookings = [];
        bookings.map((booking) => {
        console.log('Booking inside the map: ',booking.dateStart);
        const date = new Date(booking.dateStart);
        const htmlDate = date.toISOString().split('T')[0];
        const time = date.toTimeString().split(' ')[0].substring(0, 5);
        allofthebookings.push( { htmlDate, time });
        allofthebookings.push({ htmlDate, time});
        })
        return allofthebookings;
    }

    return <>
    <form className="login">
    <label htmlFor="type">Típus</label><br />
    <select onChange={ e => {
        setType(e.currentTarget.value)
        //PostRequestFor();
    }}>
     <option value="manikur">Manikűr</option>
     <option value="pedikur">Pedikűr</option>
     <option disabled>-----------------</option>
     <option value="zsele">Zselé</option>
     <option value="akrel">Akril</option>
     <option value="porcelan">Porcelán</option>
     <option disabled>-----------------</option>
     <option value="egyeb">Egyéb</option>
     </select><br />
        <label htmlFor="extra">Extra</label>
        <input type="checkbox" id="extra" name="extra" onChange={ e => e.currentTarget.checked? setExtra(true) : setExtra(false)}/><br />
        <label htmlFor="date">Dátum</label><br />
        <input type="date" id="date" name="date" onChange={ e => 
        {
            setDate(e.currentTarget.value);
            console.log('Date:',e.currentTarget.value);
            postRequestForfindAllByDate(e.currentTarget.value);
        }
        }/><br />
        <label htmlFor="time">Időpont</label><br />
        <input type="time" id="time" name="time" onChange={ e => setTime(e.currentTarget.value)}/><br />

        <button type="submit">Foglalás</button><br />
        {
            allofthebookings!.length > 0 ?
            allofthebookings.map((booking) => {
                return <div>
                    <p>{booking}</p>
                </div>
            }) : <p>Nincs elérhető időpont</p>
        }
    </form>
    </>
}