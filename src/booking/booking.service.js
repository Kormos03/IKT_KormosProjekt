"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
function parseDate(dateString) {
    const [date, time] = dateString.split(' ');
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);
    return new Date(Date.UTC(year, month - 1, day, hour, minute));
}
let BookingService = class BookingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBookingDto) {
        try {
            const halfHourSlots = generateHalfHourSlots(new Date(createBookingDto.dateStart), new Date(createBookingDto.dateEnd));
            const notReserved = await Promise.all(halfHourSlots.map(async (time) => {
                let hour = time.split(":")[0];
                let minute = time.split(":")[1];
                let start = new Date(createBookingDto.dateStart);
                start.setHours(Number(hour), Number(minute), 0, 0);
                let end = new Date(start);
                end.setMinutes(start.getMinutes() + 30);
                const intoTheTableStart = start.toISOString();
                const intoTheTableEnd = end.toISOString();
                console.log("the startdate is: ", intoTheTableStart);
                return this.prisma.not_Reserved.create({
                    data: {
                        name: createBookingDto.name,
                        dateStart: intoTheTableStart,
                        dateEnd: intoTheTableEnd,
                        extra: createBookingDto.extra,
                        type: '',
                    },
                });
            }));
        }
        catch (e) {
            return "Booking already exists";
        }
    }
    async createReserved(createBookingDto) {
        try {
            const slotsToDelete = await this.prisma.not_Reserved.findMany({
                where: {
                    AND: [
                        { dateStart: { gte: new Date(createBookingDto.dateStart) } },
                        { dateEnd: { lte: new Date(createBookingDto.dateEnd) } },
                    ],
                },
            });
            slotsToDelete.forEach(async (slot) => { this.removeNotReserved(slot.id); });
            if (createBookingDto.dateStart > createBookingDto.dateEnd || createBookingDto.dateStart == null || createBookingDto.dateEnd == null) {
                throw new Error("Date is null, or the start date is later than the end date!");
            }
            const not_reservedSlotsLowerThanDto = await this.prisma.not_Reserved.findMany({
                where: {
                    AND: [
                        { dateStart: { lte: new Date(createBookingDto.dateStart) } },
                    ],
                },
            });
            if (await not_reservedSlotsLowerThanDto.length < 4) {
                not_reservedSlotsLowerThanDto.map(async (slot) => {
                    this.removeNotReserved(slot.id);
                });
            }
            const reserved = this.prisma.reserved.create({ data: createBookingDto });
            const createSlotsToNotReserve = this.prisma.reserved.create({
                data: {
                    name: createBookingDto.name,
                    dateStart: new Date(createBookingDto.dateStart),
                    dateEnd: new Date(createBookingDto.dateEnd),
                    type: createBookingDto.type,
                    extra: createBookingDto.extra,
                },
            });
            return reserved;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async findAllNotReserved() {
        const notReserved = await this.prisma.not_Reserved.findMany();
        const exactDay = new Date();
        exactDay.setHours(exactDay.getHours() + 2);
        if (notReserved.length == 0) {
            return;
        }
        if (notReserved.length <= 2) {
            this.removeNotReserved(notReserved[0].id);
        }
        notReserved.map((slot) => {
            if (slot.dateStart < exactDay) {
                this.removeNotReserved(slot.id);
            }
        });
        return this.prisma.not_Reserved.findMany();
    }
    async findAllReserved() {
        const reserved = await this.prisma.reserved.findMany();
        const exactDay = new Date();
        exactDay.setHours(exactDay.getHours() + 2);
        if (reserved.length == 0) {
            return;
        }
        reserved.map((slot) => {
            if (slot.dateStart < exactDay) {
                this.removeReserved(slot.name);
            }
        });
        return this.prisma.reserved.findMany();
    }
    findOne(id) {
        if (id == null) {
            throw new Error("Az id null");
        }
        ;
        return this.prisma.not_Reserved.findFirst({
            where: { id: id },
        });
    }
    findOneReserved(name) {
        if (name == null) {
            throw new Error("Az id null");
        }
        ;
        return this.prisma.reserved.findFirst({
            where: { name: name },
        });
    }
    findAllByDateNotReserved(date) {
        if (date == null) {
            throw new Error("Date is null");
        }
        ;
        if (date.length != 10) {
            throw new Error("A dátum formátuma nem megfelelő");
        }
        const targetDate = new Date(date);
        const nextDay = new Date(targetDate);
        nextDay.setDate(targetDate.getDate() + 1);
        return this.prisma.not_Reserved.findMany({
            where: {
                AND: [
                    { dateStart: { gte: targetDate } },
                    { dateEnd: { lt: nextDay } },
                ],
            },
        });
    }
    update(id, updateBookingDto, reserved) {
        if (id == null) {
            throw new Error("Az id null");
        }
        ;
        if (reserved) {
            return this.prisma.reserved.update({
                where: { id: id },
                data: updateBookingDto,
            });
        }
        else {
            return this.prisma.not_Reserved.update({
                where: { id: id },
                data: updateBookingDto,
            });
        }
    }
    async removeReserved(name, id) {
        if (id) {
            if (await this.prisma.reserved.findFirst({ where: { id: id } }) == null) {
                return;
            }
            return await this.prisma.reserved.delete({
                where: { id: id },
            });
        }
        if (await this.prisma.reserved.findFirst({ where: { name: name } }) == null) {
            return;
        }
        return await this.prisma.reserved.deleteMany({
            where: { name: name },
        });
    }
    async removeNotReserved(id) {
        if (await this.prisma.not_Reserved.findFirst({ where: { id: id } }) == null) {
            return;
        }
        return await this.prisma.not_Reserved.delete({
            where: { id: id },
        });
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingService);
function generateHalfHourSlots(dateStart, dateEnd) {
    const halfHourSlots = [];
    let currentTime = new Date(dateStart);
    while (currentTime < dateEnd) {
        halfHourSlots.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        currentTime.setMinutes(currentTime.getMinutes() + 30);
    }
    return halfHourSlots;
}
//# sourceMappingURL=booking.service.js.map