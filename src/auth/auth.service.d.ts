import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class AuthService {
    private readonly db;
    constructor(db: PrismaService);
    generateTokenFor(user: User, loggedIn: boolean): Promise<string>;
    findUserByToken(token: string): Promise<{
        name: string;
        admin: boolean;
        id: number;
        email: string;
        password: string;
    }>;
    tokenCleanup(): Promise<void>;
}
