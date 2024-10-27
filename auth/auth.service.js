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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const prisma_service_1 = require("../prisma.service");
let AuthService = class AuthService {
    constructor(db) {
        this.db = db;
    }
    async generateTokenFor(user, loggedIn) {
        let expiration = new Date(Date.now() + 1000 * 60 * 60 * 24);
        if (loggedIn) {
            expiration = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        }
        const randomBuffer = (0, crypto_1.randomBytes)(32);
        const randomString = randomBuffer.toString('hex');
        await this.db.token.create({
            data: {
                token: randomString,
                userId: user.id,
                expiration: expiration,
            },
        });
        console.log("generating token for: ", user);
        return randomString;
    }
    async findUserByToken(token) {
        const tokenObj = await this.db.token.findUnique({
            where: { token }
        });
        if (tokenObj == null) {
            return null;
        }
        return await this.db.user.findUniqueOrThrow({
            where: { id: tokenObj.userId }
        });
    }
    async tokenCleanup() {
        await this.db.token.deleteMany({
            where: {
                expiration: {
                    lt: new Date()
                }
            }
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map