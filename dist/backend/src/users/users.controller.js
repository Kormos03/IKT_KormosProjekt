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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("src/auth/auth.service");
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    me(req) {
        const user = req.user;
        return {
            email: user.email,
            name: user.name,
            admin: user.admin,
        };
    }
    adminMe(req) {
        const user = req.user;
        if (!user.admin) {
            throw new Error('Nincs jogosultságod ehhez a művelethez!');
        }
        return {
            email: user.email,
            name: user.name,
            admin: user.admin,
        };
    }
    async create(createUserDto) {
        try {
            const generatedUser = await this.usersService.registration(createUserDto);
            return {
                token: await this.authService.generateTokenFor(generatedUser)
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    findAll(req) {
        const user = req.user;
        if (user && !user.admin) {
            throw new common_1.ForbiddenException();
        }
        return this.usersService.findAll();
    }
    findOne(id) {
        return this.usersService.findOne(+id);
    }
    update(email, updateUserDto) {
        return this.usersService.update(email, updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(+id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('bearer')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "me", null);
__decorate([
    (0, common_1.Get)('adminMe'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('bearer')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "adminMe", null);
__decorate([
    (0, common_1.Post)('/regist'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('bearer')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService, typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], UsersController);
//# sourceMappingURL=users.controller.js.map