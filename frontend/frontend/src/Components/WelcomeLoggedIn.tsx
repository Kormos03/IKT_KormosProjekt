import { useEffect, useState } from "react";
import GetReservationForUser from "../GetReservationForUser";

export function WelcomeLoggedIn(){
    const {reservation} = GetReservationForUser();

    const reservedTime = () => {
        if(reservation == null || typeof reservation == undefined) return <>Még nincs lefoglalt időpontja</>
            const dateStart = reservation.dateStart.split('T')[0] + " " + (reservation.dateStart.split(':')[0]).split('T')[1] + ':' + reservation.dateStart.split(':')[1];
            const dateEnd = reservation.dateEnd.split('T')[0] + " " + (reservation.dateEnd.split(':')[0]).split('T')[1] + ':' + reservation.dateEnd.split(':')[1];
            return <>
            <h2>Az Ön lefoglalt időpontja:</h2>  <p>{dateStart} - {dateEnd}</p>
            </>

    }

    return <div>
    <p className="lead">Ez a főoldal, ahol a legfontosabb információkat találja.</p>
    <p className="lead">A menüsoron keresztül elérheti a galériát, ahol a kész munkákat tekintheti meg.</p>
    <p className="lead">A menüsoron keresztül elérheti a foglalást, ahol foglalhat időpontot.</p>
    {reservedTime()}
    
    </div>
}