/// <reference types="react" />
import { User } from '../assets/User';
declare function useAuth(): {
    token: string;
    user: User;
    error: string;
    setToken: import("react").Dispatch<import("react").SetStateAction<string>>;
    setUser: import("react").Dispatch<import("react").SetStateAction<User>>;
    setError: import("react").Dispatch<import("react").SetStateAction<string>>;
};
export default useAuth;
