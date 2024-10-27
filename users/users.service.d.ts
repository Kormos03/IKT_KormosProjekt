import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
export declare class UsersService {
    private readonly db;
    constructor(db: PrismaService);
    findByEmail(email: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        admin: boolean;
        id: number;
        email: string;
        password: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(createUserDto: CreateUserDto): void;
    registration(createUserDto: CreateUserDto): Promise<{
        name: string;
        admin: boolean;
        id: number;
        email: string;
        password: string;
    }>;
    findAll(): string;
    update(email: string, updateUserDto: UpdateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        admin: boolean;
        id: number;
        email: string;
        password: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
