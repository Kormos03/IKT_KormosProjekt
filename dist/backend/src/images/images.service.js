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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("src/prisma.service");
let ImagesService = class ImagesService {
    constructor(db) {
        this.db = db;
    }
    create(createImageDto) {
        if (!createImageDto.url) {
            createImageDto.url = "http://localhost:3000/images/" + createImageDto.originalname;
        }
        const correctname = createImageDto.originalname.split(".")[0];
        return this.db.images.create({
            data: {
                url: createImageDto.url,
                name: correctname
            }
        });
    }
    findAll() {
        return this.db.images.findMany();
    }
    findOne(id) {
        return this.db.images.findFirst({
            where: { id }
        });
    }
    update(name, updateImageDto) {
        return this.db.images.update({
            where: { name },
            data: updateImageDto
        });
    }
    remove(id) {
        return this.db.images.delete({
            where: { id }
        });
    }
    async createImageName(createImageDto) {
        const lastImage = await this.getTheHighestName();
        let thecorrectname = '';
        if (await isNaN(lastImage)) {
            thecorrectname = "0.jpeg";
        }
        else {
            thecorrectname = await lastImage + ".jpeg";
        }
        return await thecorrectname.toString();
    }
    async getTheHighestName() {
        let tempImagename = '';
        const lastImage = await this.db.images.findMany();
        await lastImage.map((image) => {
            tempImagename = image.name;
        });
        return (parseInt(tempImagename) + 1);
    }
};
exports.ImagesService = ImagesService;
exports.ImagesService = ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], ImagesService);
//# sourceMappingURL=images.service.js.map