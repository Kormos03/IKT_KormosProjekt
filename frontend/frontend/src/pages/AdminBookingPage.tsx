import { AdminNavigationBar } from "../Components/AdminNavigationBar";
import { AdminBookingInsert } from "../Components/AdminBookingInsert";
import { AdminBookingNotReserved } from "../Components/AdminBookingNotReserved";
import { AdminBookingReserved } from "../Components/AdminBookingReserved";

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