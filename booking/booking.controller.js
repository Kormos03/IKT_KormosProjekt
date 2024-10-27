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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const update_booking_dto_1 = require("./dto/update-booking.dto");
const passport_1 = require("@nestjs/passport");
const users_service_1 = require("../users/users.service");
let BookingController = class BookingController {
    constructor(bookingService, userService) {
        this.bookingService = bookingService;
        this.userService = userService;
    }
    createReserved(createBookingDto) {
        if (!createBookingDto.type.trim() || !createBookingDto.dateStart.trim() || !createBookingDto.dateEnd.trim()) {
            throw new Error("Nem választottál típust vagy időpontot!");
        }
        return this.bookingService.createReserved(createBookingDto);
    }
    findAllReserved() {
        return this.bookingService.findAllReserved();
    }
    removeReservedAdmin(id) {
        console.log(id);
        return this.bookingService.removeReserved('', +id);
    }
    removeReserved(req) {
        const user = req.user;
        console.log(user.name);
        return this.bookingService.removeReserved(user.name);
    }
    updateReserved(id, updateBookingDto) {
        return this.bookingService.update(+id, updateBookingDto, true);
    }
    findOneReserved(req) {
        const user = req.user;
        return this.bookingService.findOneReserved(user.name);
    }
    async create(createBookingDto) {
        console.log("Reservation is happening");
        if (createBookingDto.admin) {
            const result = await this.bookingService.create(createBookingDto);
            if (result === "Booking already exists") {
                return "Booking already exists";
            }
        }
        else {
            return "You are not authorized to create a booking";
        }
    }
    findAll() {
        return this.bookingService.findAllNotReserved();
    }
    findAllByDate(date) {
        return this.bookingService.findAllByDateNotReserved(date);
    }
    findOne(id) {
        return this.bookingService.findOne(+id);
    }
    update(id, updateBookingDto) {
        return this.bookingService.update(+id, updateBookingDto, false);
    }
    remove(id) {
        return this.bookingService.removeNotReserved(+id);
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Post)('/reserved'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('bearer')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "createReserved", null);
__decorate([
    (0, common_1.Get)('/reserved'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('bearer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "findAllReserved", null);
__decorate([
    (0, common_1.Delete)('/reserved/id/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('bearer')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "removeReservedAdmin", null);
__decorate([
    (0, common_1.Delete)('/reserved/delete'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('bearer')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "removeReserved", null);
__decorate([
    (0, common_1.Patch)('/reserved/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_booking_dto_1.UpdateBookingDto]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "updateReserved", null);
__decorate([
    (0, common_1.Get)('/reserved/getone'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('bearer')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "findOneReserved", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('bearer')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/not_reserved/"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('bearer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/not_reserved/bydate/'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('bearer')),
    __param(0, (0, common_1.Body)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "findAllByDate", null);
__decorate([
    (0, common_1.Get)('/not_reserved/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_booking_dto_1.UpdateBookingDto]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/not_reserved/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "remove", null);
exports.BookingController = BookingController = __decorate([
    (0, common_1.Controller)('booking'),
    __metadata("design:paramtypes", [booking_service_1.BookingService,
        users_service_1.UsersService])
], BookingController);
//# sourceMappingURL=booking.controller.js.map