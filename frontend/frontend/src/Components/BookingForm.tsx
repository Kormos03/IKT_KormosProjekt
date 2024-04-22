import { useEffect, useState } from "react";
import { GetBooking } from "../assets/GetBooking";
import useAuth from "./useAuth";
import { BookingModel } from "../assets/BookingModel";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import GetReservationForUser from "./GetReservationForUser";
import { useNavigate } from "react-router-dom";

interface TypeFromLocal{
    name: string;
    value: string;
}

const API_URL1 = 'http://localhost:3000/booking/not_reserved/';
const API_URL2 = 'http://localhost:3000/booking/reserved/';

export function BookingForm(){
    const { token, user, error, setError } = useAuth();
    const [getBooking, setGetBooking] = useState([] as GetBooking[]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [type, setType] = useState('' || {} as TypeFromLocal);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [extra, setExtra] = useState(false);
    const navigate = useNavigate();
    const {reservation} = GetReservationForUser();

    const selected = false;

    useEffect(() => {
        if(reservation){
            setError("Önnek már van lefoglalt időpontja")
        }
        const typefromlocal = localStorage.getItem('service');
        if(typefromlocal){
            const parsedType = JSON.parse(typefromlocal);
            if(parsedType.value == "extrafestesvagykovek"){
                setExtra(true);
                setType({name: 'Egyéb', value: 'egyeb'});
                return;
            }
            setType(parsedType as TypeFromLocal);
        }
    },[]);

    useEffect(() => {
        if (availableTimes.length > 0) {
            setTime(availableTimes[0]);
        }
    }, [availableTimes]);

    useEffect(() => {
        getDatesFromBackend();
    }, []);

    const getDatesFromBackend = async () => {
        const response = await fetch(API_URL1, {
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
        const convertedBookings: any = convertISOToHTMLDateAndTimeString(bookingObj);
        setGetBooking(convertedBookings);
    }

    const convertISOToHTMLDateAndTimeString = (bookings: GetBooking[]) => {
        return bookings.map((booking) => {
            const date = new Date(booking.dateStart);
            const htmlDate = date.toISOString().split('T')[0];
            const time = date.toTimeString().split(' ')[0].substring(0, 5);
            return { htmlDate, time };
        });
    }

    const postRequestForfindAllByDate = async (dateInFunction: string) => {
        const response = await fetch(API_URL1 + 'bydate/', {
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
        let times = bookingObj.map((booking: BookingModel) => booking.dateStart);
        times = times.sort().slice(0, -3)
        setAvailableTimes(times);
    }

    const timesToReadableFormat = (time: string) => {
        return time.split('T')[1].substring(0, 5);
    }

    const sendReservation = async (e: any) => {
        e.preventDefault();
        if (!type || !type.value || type.value.trim() === '') {
            setError('Nem választottál típust!');
            return;
        }
        if(time == '' ){
            setError('Nem választottál időpontot!');
            return;
        }
        const dateEnd = new Date(time);
        if(type.value == 'manikur' || type.value == 'pedikur' || type.value == 'gellakk'){
            dateEnd.setHours(dateEnd.getHours() + 1); 
            dateEnd.setMinutes(dateEnd.getMinutes() + 30);
        }
        else if (type.value == "mukoromepites" || type.value == 'mukoromtoltes' || type.value == 'egyeb'){
            dateEnd.setHours(dateEnd.getHours() + 2);
        }
        localStorage.removeItem('service');
        
        const reservationData = {
            name: user!.name,
            dateStart: time,
            dateEnd: dateEnd.toISOString(),
            extra: extra,
            type: type.value? type.value : type,
        }

        const response = await fetch(API_URL2, {
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
        }
    }

    const onDayClick = (day: { getFullYear: () => any; getMonth: () => number; getDate: () => string; }, { selected }: any) => {
        let date = selected ? null : `${day.getFullYear()}-${('0' + (day.getMonth() + 1)).slice(-2)}-${('0' + day.getDate()).slice(-2)}`;
        setDate(date?.toString().split('T')[0] || '');
        postRequestForfindAllByDate(date?.toString().split('T')[0] || ''); 
    };

    return (
        <>
          <form onSubmit={sendReservation} className="login">
            <h1>Foglalás</h1>
            <label htmlFor="type">Típus</label><br />
            <select onChange={e => setType({name: "", value: e.currentTarget.value})}>
              <option value={type ? type.value : ""}>{type ? type.name : ""}</option>
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
              <input className="form-check-input" type="checkbox" id="extra" name="extra" onChange={e => e.currentTarget.checked ? setExtra(true) : setExtra(false)} checked={extra}/>
              <label htmlFor="extra">Kérsz hozzá extrát? (például: kövek)</label> 
            </div>
            <label htmlFor="date">Dátum</label>

            <DayPicker selected={new Date(date)} onDayClick={(day: any) => onDayClick(day, { selected })}/><br />
            {getBooking.length === 0 ? <p>Nincs elérhető dátum</p> : <h2>Elérhető napok</h2>}
            {getBooking.reduce((unique: GetBooking[], bookingDate: any) => unique.includes(bookingDate.htmlDate) ? unique : [...unique, bookingDate.htmlDate], []).map((date: any) => <p>{date}</p>)}
            <label htmlFor="time">Időpont</label><br />
            <select id="time" name="time" onChange={e => setTime(e.currentTarget.value)} className="custom-select">
              {availableTimes.length === 0 ? <option>Nincs szabad időpont ezen a napon</option> : availableTimes.sort().map((time, index) => <option key={index} value={time}>{timesToReadableFormat(time)}</option>)}
            </select><br />
            {reservation ? <p>Önnek már van lefoglalt időpontja</p> : <button className="btn btn-primary btn-lg" type="submit">Foglalás</button>}
            <p>{error}</p>
          </form>
        </>
      );
}