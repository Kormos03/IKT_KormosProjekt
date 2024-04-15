import { useEffect, useState } from "react";
import { GetBooking } from "../GetBooking";
import useAuth from "./useAuth";
import { BookingModel } from "../BookingModel";
import { TimeModel } from "../TimeModel";
import { DayModifiers, DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import GetReservationForUser from "../GetReservationForUser";
import { useNavigate } from "react-router-dom";
//This part of the project was difficulty, because of the converts and requests and new components, I have to make a custom modifier for the react-dday-picker component

interface TypeFromLocal{
    name: string;
    value: string;
}


export function BookingForm(){
    const { token, user,error, setToken, setUser, setError } = useAuth();
    const [getBooking, setGetBooking] = useState([] as GetBooking[]); //
    const [availableTimes, setAvailableTimes] = useState([]);
    const allofthebookings = [];
    const [type, setType] = useState('' || {} as TypeFromLocal);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [extra, setExtra] = useState(false);
    const navigate = useNavigate();
    const {reservation} = GetReservationForUser();

// Convert the availableDates array to an object where the keys are the dates in 'YYYY-MM-DD' format
const highlights = getBooking.map((bookingDate) => {
    allofthebookings.push(bookingDate);
    return { from: new Date(allofthebookings[0]),
    to: new Date(allofthebookings[allofthebookings.length - 1]),
    }
})



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
            return;
        }
        const bookingObj = await response.json();
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

    //get the type from the local storage
    useEffect(() => {
        if(!typeof reservation == undefined){
            setError("Önnek már van lefoglalt időpontja")
        }
        const typefromlocal = localStorage.getItem('service');
        
        if(typefromlocal){
        const parsedType = JSON.parse(typefromlocal);
        if(parsedType.value == "extrafestesvagykovek")
            {
                setExtra(true);
                setType({name: 'Egyéb', value: 'egyeb'});
                //localStorage.removeItem('service');
                console.log('Típus a bookingformban', parsedType);
                return;
            }
         setType(parsedType as TypeFromLocal);
        //  localStorage.removeItem('service');
          console.log('Típus a bookingformban', parsedType);
        }
        

    },[]);

    //set the first available time
    useEffect(() => {
        if (availableTimes.length > 0) {
            setTime(availableTimes[0]);
        }
    }, [availableTimes] || [time] || [] );
    //set the first type
   /* useEffect(() => {
        if (getBooking.length > 0) {
            setType(getBooking[0].type);
        }
    }, [getBooking]  || [time] || []);*/
    //ellenőrzés


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
        const date = new Date(booking.dateStart);
        const htmlDate = date.toISOString().split('T')[0];
        const time = date.toTimeString().split(' ')[0].substring(0, 5);
        allofthebookings.push( { htmlDate, time });
        allofthebookings.push({ htmlDate, time});
        })
        return allofthebookings;
    }

    async function sendReservation(e: any) {
        //Error handling

        await console.log(type.value)
        e.preventDefault();
         // Check if type is defined and has a value
        if (!type || !type.value || type.value.trim() === '') {
         setError('Nem választottál típust!');
            return;
}        if(time == '' ){setError('Nem választottál időpontot!');  return;}
        const dateEnd = new Date(time);
        if(type.value == 'manikur' || type.value == 'pedikur' || type.value == 'gellakk'){dateEnd.setHours(dateEnd.getHours() + 1); dateEnd.setMinutes(dateEnd.getMinutes() + 30);}
        else if (type.value == "mukoromepites" || type.value == 'mukoromtoltes' || type.value == 'egyeb'){dateEnd.setHours(dateEnd.getHours() + 2);}
        localStorage.removeItem('service');
        
        const reservationData = {
            name: user!.name,
            dateStart: time,
            dateEnd: dateEnd.toISOString(),
            extra: extra,
            type: type.value? type.value : type,

        }
        console.log(reservationData);
        if(reservationData){
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
        if(response.ok){
            setError('Sikeres foglalás');
            navigate(0)
        }}
       

    }

    // DayPicker component callback to handle day clicks. If the date is not disabled, then it sets the date and sends a post request to get all available times for that date.
    const onDayClick = (day, { selected }) => {

            let date = selected ? null : `${day.getFullYear()}-${('0' + (day.getMonth() + 1)).slice(-2)}-${('0' + day.getDate()).slice(-2)}`;
            setDate(date?.toString().split('T')[0]); // Convert date to 'yyyy-mm-dd' format
            postRequestForfindAllByDate(date?.toString().split('T')[0]);
    };

    return <>

    <form onSubmit={sendReservation} className="login">
    <h1>Foglalás</h1>
    <label htmlFor="type">Típus</label><br />
    <select onChange={ e => {
        setType({name: "",value: e.currentTarget.value});
    }}>
        <option value={type? type.value : ""}>{type? type.name : ""}</option>
     <option value="manikur">Manikűr</option>
     <option value="pedikur">Pedikűr</option>
     <option disabled>-----------------</option>
     <option value="gellakk">Géllakk</option>
     <option value="mukoromepites">Műköröm építés</option>
     <option value="mukoromtoltes">Műköröm töltés</option>
     <option disabled>-----------------</option>
     <option value="egyeb">Egyéb</option>
     </select><br />

        <div className="form-check form-switch">
        
        <input className="form-check-input" type="checkbox" id="extra" name="extra" onChange={ e => e.currentTarget.checked? setExtra(true) : setExtra(false)} checked={extra}/>
        <label htmlFor="extra">Kérsz hozzá extrát? (például: kövek)</label> 
        </div>
        {
            //This is a react component that shows the dates and can disable the dates that are not available
        }
        <br />
        <label htmlFor="date">Dátum</label>
        <DayPicker selected={new Date(date)} onDayClick={onDayClick}/><br />
    {
        getBooking.length == 0 ? <p>Nincs elérhető dátum</p> : <h2>Elérhető napok</h2>
    }
        {
            //avaliable dates:
          getBooking.reduce((unique, bookingDate) => {
        return unique.includes(bookingDate.htmlDate) ? unique : [...unique, bookingDate.htmlDate];
    }, []).map((date) => {
        return <p>{date}</p>
    }) 
        }

        <label htmlFor="time">Időpont</label><br />
        <select id="time" name="time" onChange={ e => setTime(e.currentTarget.value)}  className="custom-select">
    {availableTimes.length == 0 ? <option>Nincs szabad időpont ezen a napon</option> :
    availableTimes.sort().map((time, index) => (
        <option key={index} value={time}>{timesToReadableFormat(time)}</option>
        ))}
        </select><br />
        {reservation? <p>Önnek már van lefoglalt időpontja</p> :  <button className="btn btn-primary btn-lg" type="submit">Foglalás</button>}
       
        <p>{error}</p>
    </form>
    </>
}