import { NavigationBar } from "../Components/NavigationBar"
import useAuth from "../Components/useAuth";

export function BookingUserPage(){
    const { token, user,error, setToken, setUser, setError } = useAuth();
    return <>
    <NavigationBar/>
    <h1>Itt lehet időpontot foglalni</h1>
    </>
}