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
exports.ImagesController = void 0;
const common_1 = require("@nestjs/common");
const images_service_1 = require("./images.service");
const update_image_dto_1 = require("./dto/update-image.dto");
const passport_1 = require("@nestjs/passport");
const multer_1 = require("@nestjs/platform-express/multer");
const path = require("path");
const fs = require("fs");
const events_1 = require("events");
const fs_1 = require("fs");
const path_1 = require("path");
class FileUploadEmitter extends events_1.EventEmitter {
}
const fileUploadEmitter = new FileUploadEmitter();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: './public/images',
    filename: function (req, file, cb) {
        cb(null, file.originalname + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
let ImagesController = class ImagesController {
    constructor(imagesService) {
        this.imagesService = imagesService;
    }
    async uploadFile(file, typeofnail) {
        console.log(file);
        console.log("Typeofnail: ", typeofnail);
        const filename = this.imagesService.createImageName(file.originalname);
        const fileforsave = file;
        fileforsave.originalname = await filename;
        console.log('file after name change:', await fileforsave);
        const savePath = path.join(__dirname, '..', '..', '..', 'public', 'images', fileforsave.originalname);
        (0, fs_1.writeFileSync)(savePath, file.buffer);
        console.log(`File saved at ${savePath}`);
        return this.imagesService.create(fileforsave, typeofnail);
    }
    findAll() {
        return this.imagesService.findAll();
    }
    findOne(name) {
        return this.imagesService.findOne(name);
    }
    update(name, updateImageDto) {
        return this.imagesService.update(name, updateImageDto);
    }
    async remove(id) {
        const parsedId = parseInt(id);
        const therecord = await this.imagesService.findOne(parsedId);
        console.log('therecord:', await therecord);
        const filePath = await (0, path_1.join)(__dirname, '..', '..', 'public', 'images', therecord.name + '.jpeg');
        try {
            fs.unlinkSync(filePath);
            return this.imagesService.remove(parsedId);
        }
        catch (err) {
            console.error(err);
        }
    }
};
exports.ImagesController = ImagesController;
__decorate([
    (0, common_1.Post)('fileupload'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('bearer')),
    (0, common_1.UseInterceptors)((0, multer_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('typeofnail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':name'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('bearer')),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_image_dto_1.UpdateImageDto]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('bearer')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "remove", null);
exports.ImagesController = ImagesController = __decorate([
    (0, common_1.Controller)('images'),
    __metadata("design:paramtypes", [images_service_1.ImagesService])
], ImagesController);
//# sourceMappingURL=images.controller.js.map