"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetReservationForUser = void 0;
const react_1 = require("react");
const GLOBAL_API_URL_1 = require("../../GLOBAL_API_URL");
const API_URL = GLOBAL_API_URL_1.GLOBAL_API_URL + '/booking/reserved/getone';
function GetReservationForUser() {
    const [reservation, setReservation] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const tokenFromLocalStorage = localStorage.getItem('token');
        if (tokenFromLocalStorage) {
            async function fetchData() {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        "Authorization": `Bearer ${tokenFromLocalStorage}`
                    }
                });
                if (response.ok) {
                    const user = await response.json();
                    setReservation(user);
                }
                else {
                    setReservation(null);
                }
            }
            fetchData();
        }
    }, []);
    return { reservation };
}
exports.GetReservationForUser = GetReservationForUser;
exports.default = GetReservationForUser;
//# sourceMappingURL=GetReservationForUser.js.map