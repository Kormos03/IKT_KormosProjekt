import { Button, Collapse } from "react-bootstrap";
import { FiChevronDown } from "react-icons/fi";

    export function renderGroupedBookings(groupedBookings: any, open: any, setOpen: any, checkedStates: any, deleteCheckedBookings: any, handleCheckboxChange: any, datesToReadableFormatFunc: any, needName: boolean = false) {
        return Object.entries(groupedBookings)
            .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
            .map(([date, bookings]) => {
                return (
                    <div key={date}>
                        <Button
                            className="btn btn-success"
                            onClick={() => setOpen((prevOpen: { [x: string]: any; }) => ({ ...prevOpen, [date]: !prevOpen[date] }))}
                            aria-controls={`collapse-${date}`}
                            aria-expanded={open[date]}
                        >
                           {date}
                            <FiChevronDown style={{ marginLeft: '10px', transition: 'transform 0.3s', transform: `rotate(${open[date] ? 180 : 0}deg)` }} />
                        </Button>
                        
                        <Collapse in={open[date]}>
                            <div id={`collapse-${date}`}>
                                {
                                    (bookings as any[]).sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()).map((booking: any) => (
                                        <p key={booking.id}>{needName? booking.name + " - " : " "}  {datesToReadableFormatFunc(booking)} <button className="btn btn-danger btn-sm" onClick={() => deleteCheckedBookings(booking.id)} >Törlés</button> <input type="checkbox" checked={checkedStates[booking.id] || false} onChange={e => handleCheckboxChange(booking.id, e)} /> </p>
                                    ))
                                }
                            </div>
                        </Collapse>
                    </div>
                )
            })
    }