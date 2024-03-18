import { useEffect, useState } from "react";
import { AdminNavigationBar } from "../Components/AdminNavigationBar";
import { useNavigate } from "react-router-dom";
import useAuth from "../Components/useAuth";
import { AdminBookingInsert } from "../Components/AdminBookingInsert";

export function AdminBookingPage() {
    const { token, user,error, setToken, setUser, setError } = useAuth();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [backendRoute, setBackendRoute] = useState("http://localhost:3000/booking");
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        else{
            navigate('/secret/adminlogin');
        }
    }, [] || token);
    return (<>
        <AdminNavigationBar />
        <div className="container">
        <AdminBookingInsert/>
        </div>
        <div className="container">
        <h1>Szabad időpontok kezelése</h1>

        </div>
        <div className="container">
        <h1>Foglalások kezelése</h1>

        </div>
    </>);
}