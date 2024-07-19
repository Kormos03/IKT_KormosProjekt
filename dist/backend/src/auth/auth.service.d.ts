import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class AuthService {
    private readonly db;
    constructor(db: PrismaService);
    generateTokenFor(user: User): Promise<string>;
    findUserByToken(token: string): Promise<any>;
}
