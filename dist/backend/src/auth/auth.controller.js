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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const users_service_1 = require("src/users/users.service");
const argon2_1 = require("argon2");
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async login(loginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (await user == null) {
            throw new common_1.UnauthorizedException('Hibás email vagy jelszó!');
        }
        if (!await (0, argon2_1.verify)(user.password, loginDto.password)) {
            throw new common_1.UnauthorizedException('Hibás email vagy jelszó!');
        }
        if (await user?.admin) {
            throw new common_1.UnauthorizedException('Nem léphetsz be adminisztrátorként ezen a felületen biztonsági okokból!');
        }
        return {
            token: await this.authService.generateTokenFor(user)
        };
    }
    async adminlogin(loginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (await user == null) {
            throw new common_1.UnauthorizedException('Hibás email vagy jelszó!');
        }
        if (!await (0, argon2_1.verify)(user.password, loginDto.password)) {
            throw new common_1.UnauthorizedException('Hibás email vagy jelszó!');
        }
        if (await !user.admin) {
            throw new common_1.UnauthorizedException('Nincs jogosultságod ehhez a művelethez!');
        }
        const adminToken = await this.authService.generateTokenFor(user);
        return {
            token: await adminToken
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('katus/admin/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminlogin", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], AuthController);
//# sourceMappingURL=auth.controller.js.map