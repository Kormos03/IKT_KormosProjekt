import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    me(req: any): {
        email: string;
        name: string;
        admin: boolean;
    };
    adminMe(req: any): {
        email: string;
        name: string;
        admin: true;
    };
    create(createUserDto: CreateUserDto): Promise<{
        token: any;
    }>;
    findAll(req: any): string;
    findOne(id: string): string;
    update(email: string, updateUserDto: UpdateUserDto): any;
    remove(id: string): string;
}
