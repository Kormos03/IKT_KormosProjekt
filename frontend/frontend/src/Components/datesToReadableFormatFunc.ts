import { BookingModel } from "../BookingModel";

export function datesToReadableFormatFunc(reservation: BookingModel) {
    const dateStart = reservation.dateStart.split('T')[0] + " " + (reservation.dateStart.split(':')[0]).split('T')[1] + ':' + reservation.dateStart.split(':')[1];
    const dateEnd =  (reservation.dateEnd.split(':')[0]).split('T')[1] + ':' + reservation.dateEnd.split(':')[1];
    return `${dateStart} - ${dateEnd}`
}