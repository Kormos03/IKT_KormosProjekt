import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ImagesService {
    private readonly db;
    constructor(db: PrismaService);
    create(createImageDto: any, typeofnail: string): import(".prisma/client").Prisma.Prisma__ImagesClient<{
        name: string;
        type: string;
        id: number;
        url: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        type: string;
        id: number;
        url: string | null;
    }[]>;
    findOne(name: any): import(".prisma/client").Prisma.Prisma__ImagesClient<{
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
    remove(id: number): import(".prisma/client").Prisma.Prisma__ImagesClient<{
        name: string;
        type: string;
        id: number;
        url: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createImageName(createImageDto: CreateImageDto): Promise<string>;
    getTheHighestName(): Promise<number>;
}
