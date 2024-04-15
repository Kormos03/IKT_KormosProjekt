import { useEffect, useState } from "react";
import { AdminNavigationBar } from "../Components/AdminNavigationBar";
import { useNavigate } from "react-router-dom";
import { AdminBookingInsert } from "../Components/AdminBookingInsert";
import { AdminBookingNotReserved } from "../Components/AdminBookingNotReserved";
import { AdminBookingReserved } from "../Components/AdminBookingReserved";
import useAuthAdmin from "../Components/useAuthAdmin";

export function AdminBookingPage() {
    const { token, user,error, setToken, setUser, setError } = useAuthAdmin();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [backendRoute, setBackendRoute] = useState("http://localhost:3000/booking");
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);
    return (<>

        <AdminNavigationBar />
        <div className="container">
            <div className="row">
        <div className="col">
        <AdminBookingNotReserved/>
        </div>

        <div className="col">
        <AdminBookingInsert/>
        </div>

        <div className="col">
        <AdminBookingReserved/>
        </div>
        </div>

        </div>
    </>);
}