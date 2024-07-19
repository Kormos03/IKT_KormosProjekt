import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
export declare class ImagesController {
    private imagesService;
    constructor(imagesService: ImagesService);
    create(createImageDto: CreateImageDto): any;
    uploadFile(file: any): Promise<any>;
    findAll(): any;
    findOne(name: string): any;
    update(name: string, updateImageDto: UpdateImageDto): any;
    remove(id: string): Promise<any>;
}
