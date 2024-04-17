import { BookingForm } from "../Components/BookingForm";
import { NavigationBar } from "../Components/NavigationBar"
import useAuth from "../Components/useAuth";

export function BookingUserPage(){

    return <>
    <NavigationBar/>
    <div className="main-content">
    <BookingForm/>
    </div>
    </>
}