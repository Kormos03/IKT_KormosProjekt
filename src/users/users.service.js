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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const argon2 = require("argon2");
async function hashPassword(password) {
    try {
        const hash = await argon2.hash(password);
        return hash;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}
let UsersService = class UsersService {
    constructor(db) {
        this.db = db;
    }
    findByEmail(email) {
        return this.db.user.findUnique({
            where: { email }
        });
    }
    create(createUserDto) {
    }
    async registration(createUserDto) {
        try {
            const user = await this.findByEmail(createUserDto.email);
            if (user) {
                throw new common_1.HttpException('Ez az email cím már foglalt!', common_1.HttpStatus.BAD_REQUEST);
            }
            const hashedPassword = await hashPassword(createUserDto.password);
            return this.db.user.create({
                data: {
                    email: createUserDto.email,
                    name: createUserDto.name,
                    password: hashedPassword,
                    admin: false,
                }
            });
        }
        catch (err) {
            console.log(err.message);
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findAll() {
        return `This action returns all users`;
    }
    update(email, updateUserDto) {
        return this.db.user.update({
            where: { email: updateUserDto.email },
            data: {
                name: updateUserDto.name,
                email: updateUserDto.email,
            }
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map