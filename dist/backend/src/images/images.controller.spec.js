"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const images_controller_1 = require("./images.controller");
const images_service_1 = require("./images.service");
describe('ImagesController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [images_controller_1.ImagesController],
            providers: [images_service_1.ImagesService],
        }).compile();
        controller = module.get(images_controller_1.ImagesController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=images.controller.spec.js.map