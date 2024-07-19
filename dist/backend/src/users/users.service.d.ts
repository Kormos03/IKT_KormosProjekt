import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
export declare class UsersService {
    private readonly db;
    constructor(db: PrismaService);
    findByEmail(email: string): any;
    create(createUserDto: CreateUserDto): void;
    registration(createUserDto: CreateUserDto): Promise<any>;
    findAll(): string;
    findOne(id: number): string;
    update(email: string, updateUserDto: UpdateUserDto): any;
    remove(id: number): string;
}
