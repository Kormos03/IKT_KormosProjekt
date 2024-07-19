import { BookingForm } from "../Components/BookingForm";
import { NavigationBar } from "../Components/NavigationBar";

export function BookingUserPage(){

    return <>
    <NavigationBar/>
    <div className="main-content">
    <BookingForm/>
    </div>
    </>
}