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
exports.CreateBookingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateBookingDto {
}
exports.CreateBookingDto = CreateBookingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Az admin jogosultság megadása',
        example: 'true'
    }),
    __metadata("design:type", Boolean)
], CreateBookingDto.prototype, "admin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'A foglalás azonosítója',
        example: '140'
    }),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'A foglaló neve',
        example: 'Aron'
    }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'A kezdő dátum',
        example: '2022-01-01T00:00:00.000Z'
    }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "dateStart", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'A befejező dátum megadása kötelező' }),
    (0, swagger_1.ApiProperty)({
        description: 'A befejező dátum',
        example: '2022-01-01T10:00:00.000Z'
    }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "dateEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'A foglalás típusa',
        example: 'műköröm'
    }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({
        description: 'Extra igények megadása, pl körömre kövek felrakása',
        example: 'false'
    }),
    __metadata("design:type", Boolean)
], CreateBookingDto.prototype, "extra", void 0);
//# sourceMappingURL=create-booking.dto.js.map