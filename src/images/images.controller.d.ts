import { ImagesService } from './images.service';
import { UpdateImageDto } from './dto/update-image.dto';
export declare class ImagesController {
    private imagesService;
    constructor(imagesService: ImagesService);
    uploadFile(file: any, typeofnail: string): Promise<{
        name: string;
        type: string;
        id: number;
        url: string | null;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        type: string;
        id: number;
        url: string | null;
    }[]>;
    findOne(name: string): import(".prisma/client").Prisma.Prisma__ImagesClient<{
        name: string;
        type: string;
        id: number;
        url: string | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(name: string, updateImageDto: UpdateImageDto): import(".prisma/client").Prisma.Prisma__ImagesClient<{
        name: string;
        type: string;
        id: number;
        url: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): Promise<{
        name: string;
        type: string;
        id: number;
        url: string | null;
    }>;
}
