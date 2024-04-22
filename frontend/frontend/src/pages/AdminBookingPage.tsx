import { AdminNavigationBar } from "../Components/AdminComponents/AdminNavigationBar";
import { AdminBookingInsert } from "../Components/AdminComponents/AdminBookingInsert";
import { AdminBookingNotReserved } from "../Components/AdminComponents/AdminBookingNotReserved";
import { AdminBookingReserved } from "../Components/AdminComponents/AdminBookingReserved";

export function AdminBookingPage() {
    return (
        <>
            <AdminNavigationBar />
            <div className="container main-content">
                <div className="row">
                    <div className="col">
                        <AdminBookingNotReserved />
                    </div>
                    <div className="col">
                        <AdminBookingInsert />
                    </div>
                    <div className="col">
                        <AdminBookingReserved />
                    </div>
                </div>
            </div>
        </>
    );
}