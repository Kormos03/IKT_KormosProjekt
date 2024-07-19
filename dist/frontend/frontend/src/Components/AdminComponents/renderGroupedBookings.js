"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderGroupedBookings = void 0;
const react_bootstrap_1 = require("react-bootstrap");
const fi_1 = require("react-icons/fi");
function renderGroupedBookings(groupedBookings, open, setOpen, checkedStates, deleteCheckedBookings, handleCheckboxChange, datesToReadableFormatFunc, needName = false) {
    return Object.entries(groupedBookings)
        .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
        .map(([date, bookings]) => {
        return (<div key={date}>
                        <react_bootstrap_1.Button className="btn btn-success" onClick={() => setOpen((prevOpen) => ({ ...prevOpen, [date]: !prevOpen[date] }))} aria-controls={`collapse-${date}`} aria-expanded={open[date]}>
                           {date}
                            <fi_1.FiChevronDown style={{ marginLeft: '10px', transition: 'transform 0.3s', transform: `rotate(${open[date] ? 180 : 0}deg)` }}/>
                        </react_bootstrap_1.Button>
                        
                        <react_bootstrap_1.Collapse in={open[date]}>
                            <div id={`collapse-${date}`}>
                                {bookings.sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()).map((booking) => (<p key={booking.id}>{needName ? booking.name + " - " : " "}  {datesToReadableFormatFunc(booking)} <button className="btn btn-danger btn-sm" onClick={() => deleteCheckedBookings(booking.id)}>Törlés</button> <input type="checkbox" checked={checkedStates[booking.id] || false} onChange={e => handleCheckboxChange(booking.id, e)}/> </p>))}
                            </div>
                        </react_bootstrap_1.Collapse>
                    </div>);
    });
}
exports.renderGroupedBookings = renderGroupedBookings;
//# sourceMappingURL=renderGroupedBookings.js.map