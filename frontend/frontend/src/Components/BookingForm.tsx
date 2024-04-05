import { useEffect, useState } from "react";
import { GetBooking } from "../GetBooking";
import useAuth from "./useAuth";
import { BookingModel } from "../BookingModel";
import { TimeModel } from "../TimeModel";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';

export function BookingForm(){
    const { token, user,error, setToken, setUser, setError } = useAuth();
    const [getBooking, setGetBooking] = useState([] as GetBooking[]); //
    const [availableTimes, setAvailableTimes] = useState([]);
    const allofthebookings = [];
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [extra, setExtra] = useState(false);
    const availableDates = getBooking.map(dateStr => new Date(dateStr));

  
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
       let times = await bookingObj.map((booking: BookingModel) => booking.dateStart);
       //show only the available times, but not the last 4
       times = times.sort().slice(0, -3)
       await setAvailableTimes(times);
        
    }

    //convert times into a readable format
    function timesToReadableFormat(time: string) {
        const timeToReturn = time.split('T')[1].substring(0, 5);
        return timeToReturn;
    }

    //set the first available time
    useEffect(() => {
        if (availableTimes.length > 0) {
            setTime(availableTimes[0]);
        }
    }, [availableTimes] || [time] || [] );
    //set the first type
    useEffect(() => {
        if (getBooking.length > 0) {
            setType(getBooking[0].type);
        }
    }, [getBooking]  || [time] || []);
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
          //  console.log(bookingObj);
            const convertedBookings = convertISOToHTMLDateAndTimeString(bookingObj);
            setGetBooking(convertedBookings);
            
        }
        function getDatesFromBackendNotAsync(){
            getDatesFromBackend();
        }
        getDatesFromBackendNotAsync();

    }, [] || [getBooking] || [type]);

    //convert ISO date to HTML date
    function convertISOToHTMLDateAndTimeString(bookings: GetBooking[]) {
        const allofthebookings = [];
        bookings.map((booking) => {
        //console.log('Booking inside the map: ',booking.dateStart);
        const date = new Date(booking.dateStart);
        const htmlDate = date.toISOString().split('T')[0];
        const time = date.toTimeString().split(' ')[0].substring(0, 5);
        allofthebookings.push( { htmlDate, time });
        allofthebookings.push({ htmlDate, time});
        })
        return allofthebookings;
    }

    async function sendReservation(e: any) {
        /*"name":"Betti",
        "dateStart": "2024-03-13T10:00:00Z",
        "dateEnd": "2024-03-13T12:00:00Z",
        "extra":true,
        "type":"műköröm"*/
        e.preventDefault();
        let dateEndTemp = 2;
        const dateEnd = new Date(date);
        if(type == 'manikur' || type == 'pedikur' || type == 'akrel'){dateEnd.setHours(dateEnd.getHours() + 1); dateEnd.setMinutes(dateEnd.getMinutes() + 30);}
        else{dateEnd.setHours(dateEnd.getHours() + 2);}
        console.log('type:',type);  
        const reservationData = {
            name: user!.name,
            dateStart: time,
            dateEnd: dateEnd.toISOString(),
            extra: extra,
            type: type,

        }
        console.log('Reservation data:',reservationData);
        const response = await fetch('http://localhost:3000/booking/reserved', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(reservationData),
        });
        if (!response.ok) {
            const errorObj = await response.json();
            setError(errorObj.message);
            return;
        }
    }

    // DayPicker component callback to handle day clicks. If the date is not disabled, then it sets the date and sends a post request to get all available times for that date.
    const onDayClick = (day, { selected, disabled }) => {
        if (!disabled) {
            let date = selected ? null : `${day.getFullYear()}-${('0' + (day.getMonth() + 1)).slice(-2)}-${('0' + day.getDate()).slice(-2)}`;
            console.log(`clicked on ${date}`);
            setDate(date?.toString().split('T')[0]); // Convert date to 'yyyy-mm-dd' format
            postRequestForfindAllByDate(date?.toString().split('T')[0]);
        }
    };

    return <>
    <form onSubmit={sendReservation} className="login">
    <label htmlFor="type">Típus</label><br />
    <select onChange={ e => {
        setType(e.currentTarget.value)
        //PostRequestFor();
    }}>
        <option value=""></option>
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

        {
            //This is a react component that shows the dates and can disable the dates that are not available
        }
        <label htmlFor="date">Dátum</label>
       <DayPicker selected={new Date(date)} onDayClick={onDayClick}  /><br />


        <label htmlFor="time">Időpont</label><br />
        <select id="time" name="time" onChange={ e => setTime(e.currentTarget.value)}>
    {availableTimes.length == 0 ? <option>Nincs szabad időpont ezen a napon</option> :
    availableTimes.sort().map((time, index) => (
        <option key={index} value={time}>{timesToReadableFormat(time)}</option>
        ))}
        </select><br />


        <button type="submit">Foglalás</button><br />

    </form>
    </>
}