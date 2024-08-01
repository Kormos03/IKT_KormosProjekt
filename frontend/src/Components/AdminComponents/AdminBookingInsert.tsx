import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthAdmin from "./useAuthAdmin";
import { GLOBAL_API_URL } from "../../../GLOBAL_API_URL";

const API_URL = GLOBAL_API_URL +  '/booking';

export function AdminBookingInsert() {
    const { token, user,error, setError } = useAuthAdmin();
    const [date, setDate] = useState(new Date());
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const navigate = useNavigate();
  
    async function insertBooking(e: any) {
        e.preventDefault();
        const startDate = new Date(date);
        const endDate = new Date(date);
        const start = timeStart.split(':');
        const end = timeEnd.split(':');

        startDate.setHours(parseInt(start[0]) + 2, parseInt(start[1]), 0);      //somehow the hours are not correct, so I have to add 2 to the hours
        endDate.setHours(parseInt(end[0]) + 2 , parseInt(end[1]), 0);
        console.log(endDate.getHours() - startDate.getHours())
        console.log('Start: ', startDate);
        console.log('End: ', endDate);
        if (startDate >= endDate || endDate.getHours() - startDate.getHours() < 2 ) {
            console.log('A kezdő időpontnak korábbinak kell lennie, mint a befejező időpont! A foglalásnak legalább 2 órának kell lennie!');
            setError('A kezdő időpontnak korábbinak kell lennie, mint a befejező időpont és a foglalásnak legalább 2 órának kell lennie!');
            return;
        }
        const toSendStart = startDate.toISOString();
        const toSendEnd = endDate.toISOString();
        console.log('Start: ', toSendStart);
        console.log('End: ', toSendEnd);


        const bookingData = {
            admin: user!.admin,
            name: user!.name,
           dateStart: toSendStart,
            dateEnd: toSendEnd,
            extra: false,
            type: '',
        }
        if(!user || !user.name || typeof user.name !== 'string'){
            bookingData.name = '';
        }
        
        console.log('user: ', user)
        console.log(bookingData)
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookingData),
        });
        if(await response.text() == 'Booking already exists'){
            setError('A foglalás már létezik');
        }
        if (!response.ok) {
            const errorObj = await response.json();
            console.log(errorObj);
            setError(errorObj.message);
            return;
        }
        if(response.ok){
            setError('');
            navigate(0)
        }

    }

    return (
        <>
        <div className="container login">
        <h1>Időintervallum feltöltése</h1>
        
            <p style={{color:'red'}}>{error}</p>
        
        <form>
            <div className="form-group">
                <label htmlFor="date">Dátum:</label>
                <input type="date" className="form-control" id="date" onChange={e => {setDate(new Date(e.currentTarget.value))}} />
            </div>
            <div className="form-group">
                <label htmlFor="timeStart">Idő kezdete:</label>
                <input type="time" className="form-control" id="timeStart" onChange={e => {setTimeStart(e.currentTarget.value)}} />
                <label htmlFor="timeEnd">Idő vége:</label>
                <input type="time" className="form-control" id="timeEnd" onChange={e => {setTimeEnd(e.currentTarget.value)}}/>

            </div>
            <button type="submit" className="btn btn-primary" onClick={insertBooking}>Feltöltés</button>
        </form>
        </div>
        </>
    )
}