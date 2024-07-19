import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ImagesService {
    private readonly db;
    constructor(db: PrismaService);
    create(createImageDto: any): any;
    findAll(): any;
    findOne(id: any): any;
    update(name: string, updateImageDto: UpdateImageDto): any;
    remove(id: number): any;
    createImageName(createImageDto: CreateImageDto): Promise<string>;
    getTheHighestName(): Promise<number>;
}
