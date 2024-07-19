"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeLoggedIn = void 0;
const GLOBAL_API_URL_1 = require("../../GLOBAL_API_URL");
const GetReservationForUser_1 = require("./GetReservationForUser");
const react_router_dom_1 = require("react-router-dom");
const API_URL = GLOBAL_API_URL_1.GLOBAL_API_URL + "/booking/reserved/delete";
function WelcomeLoggedIn() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { reservation } = (0, GetReservationForUser_1.default)();
    const reservedTime = () => {
        if (!reservation)
            return <react_router_dom_1.NavLink className="bookFromWelcomePage" to="/bookingUser">Még nincs lefoglalt időpontja</react_router_dom_1.NavLink>;
        const dateStart = reservation.dateStart.split('T')[0] + " " + (reservation.dateStart.split(':')[0]).split('T')[1] + ':' + reservation.dateStart.split(':')[1];
        const dateEnd = (reservation.dateEnd.split(':')[0]).split('T')[1] + ':' + reservation.dateEnd.split(':')[1];
        const now = new Date();
        const reservationDate = new Date(reservation.dateStart);
        const diffHours = Math.abs(reservationDate.getTime() - now.getTime()) / (1000 * 60 * 60);
        return (<>
                <h2>Az Ön lefoglalt időpontja:</h2>
                <p>{dateStart} - {dateEnd}</p>
                {diffHours > 48 && <button className="btn btn-danger btn-sm" onClick={deleteReservation}>Foglalás törlése</button>}
            </>);
    };
    async function deleteReservation() {
        const token = localStorage.getItem('token');
        const response = await fetch(API_URL, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            const errorObj = await response.json();
            console.error(errorObj);
            return;
        }
        if (response.ok) {
            alert('Sikeres törlés');
            navigate(0);
        }
    }
    return (<div>
                <p className="lead">Ez a főoldal, ahol a legfontosabb információkat találja.</p>
                <p className="lead">A menüsoron keresztül elérheti a galériát, ahol a kész munkákat tekintheti meg.</p>
                <p className="lead">A menüsoron keresztül elérheti a foglalást, ahol foglalhat időpontot.</p>
                <br />
                <div className="card">
                    <div className="card-body">
                        {reservedTime()}
                        <p className="lead">Ha van lefoglalt időpontja, akkor azt 48 órán belül törölheti</p>
                    </div>
                </div>
            </div>);
}
exports.WelcomeLoggedIn = WelcomeLoggedIn;
//# sourceMappingURL=WelcomeLoggedIn.js.map