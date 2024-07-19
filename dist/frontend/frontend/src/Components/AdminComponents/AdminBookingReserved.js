"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBookingReserved = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const lodash_1 = require("lodash");
const datesToReadableFormatFunc_1 = require("../../assets/datesToReadableFormatFunc");
const renderGroupedBookings_1 = require("./renderGroupedBookings");
const useAuthAdmin_1 = require("./useAuthAdmin");
const API_URL = 'http://localhost:3000/booking/reserved/';
function AdminBookingReserved() {
    const { token } = (0, useAuthAdmin_1.default)();
    const [bookingData, setBookingData] = (0, react_1.useState)([]);
    const [checkedStates, setCheckedStates] = (0, react_1.useState)({});
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)({});
    const navigate = (0, react_router_dom_1.useNavigate)();
    const groupedBookings = (0, lodash_1.groupBy)(bookingData, booking => new Date(booking.dateStart).toDateString());
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
    (0, react_1.useEffect)(() => {
        fetchAllReservedBookings();
    }, []);
    async function fetchAllReservedBookings() {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Hiba történt a lekérdezés során');
            }
            const data = await response.json();
            setBookingData(data);
        }
        catch (error) {
            console.error(error);
        }
    }
    async function deleteCheckedBookings(bookingIDOfButton) {
        try {
            if (Object.keys(checkedStates).length !== 0) {
                for (const bookingId in checkedStates) {
                    await deleteBooking(bookingId);
                }
            }
            else {
                await deleteBooking(bookingIDOfButton);
            }
            navigate(0);
        }
        catch (error) {
            console.error(error);
        }
    }
    async function deleteBooking(bookingId) {
        const response = await fetch(API_URL + 'id/' + bookingId, {
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
    return (<div className="container login">
            <h1>Lefoglalt időpontok kezelése</h1> 
            Összes kijelölése <input type="checkbox" onChange={handleMasterCheckboxChange}/>
            {(0, renderGroupedBookings_1.renderGroupedBookings)(groupedBookings, isModalOpen, setIsModalOpen, checkedStates, deleteCheckedBookings, handleCheckboxChange, datesToReadableFormatFunc_1.datesToReadableFormatFunc, true)}
        </div>);
}
exports.AdminBookingReserved = AdminBookingReserved;
//# sourceMappingURL=AdminBookingReserved.js.map