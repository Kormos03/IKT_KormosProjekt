import { NavigationBar } from "../Components/NavigationBar";
import { RegistComponent } from "../Components/RegistComponent";
import useAuth from "../Components/useAuth";

export function RegisterPage() {
   // const { token, user,error, setToken, setUser, setError } = useAuth();
    return <>
    <NavigationBar />
     <RegistComponent />
    </>
}