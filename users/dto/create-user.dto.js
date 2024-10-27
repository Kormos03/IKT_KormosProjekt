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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Az email cím megadása kötelező' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Az email cím formátuma nem megfelelő' }),
    (0, swagger_1.ApiProperty)({
        description: 'Az email cím a felhasználó azonosítására szolgál',
        example: 'someone@email.com'
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'A felhasználónév megadása kötelező' }),
    (0, swagger_1.ApiProperty)({
        description: 'A felhasználó neve, amely a foglaláskor megjelenik az adminnak',
        example: 'someone@email.com'
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'A jelszó megadása kötelező' }),
    (0, swagger_1.ApiProperty)({
        description: 'A jelszó, amely a felhasználó azonosítására szolgál',
        example: 'test'
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Az admin jogosultság megadása',
        example: 'true'
    }),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "admin", void 0);
//# sourceMappingURL=create-user.dto.js.map