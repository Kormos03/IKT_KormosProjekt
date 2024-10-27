import { AuthService } from "./auth.service";
declare const TokenStrategy_base: new (...args: any[]) => any;
export declare class TokenStrategy extends TokenStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(token: string): Promise<{
        name: string;
        admin: boolean;
        id: number;
        email: string;
        password: string;
    }>;
}
export {};
