"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datesToReadableFormatFunc = void 0;
function datesToReadableFormatFunc(reservation) {
    const dateStart = reservation.dateStart.split('T')[0] + " " + (reservation.dateStart.split(':')[0]).split('T')[1] + ':' + reservation.dateStart.split(':')[1];
    const dateEnd = (reservation.dateEnd.split(':')[0]).split('T')[1] + ':' + reservation.dateEnd.split(':')[1];
    return `${dateStart} - ${dateEnd}`;
}
exports.datesToReadableFormatFunc = datesToReadableFormatFunc;
//# sourceMappingURL=datesToReadableFormatFunc.js.map