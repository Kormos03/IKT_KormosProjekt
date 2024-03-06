import { User } from "../User";

export function validateAdmin(user: User){
    if(user!.admin){
        return true;
    }
    return false;
}