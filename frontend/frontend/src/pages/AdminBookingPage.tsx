import { useEffect, useState } from "react";
import { AdminNavigationBar } from "../Components/AdminNavigationBar";
import { useNavigate } from "react-router-dom";
import useAuth from "../Components/useAuth";

export function AdminBookingPage() {
    const { token, user,error, setToken, setUser, setError } = useAuth();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [backendRoute, setBackendRoute] = useState("http://localhost:3000/users/me");
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);
    return (<>
        <AdminNavigationBar />
        <div>
            <h1>THIS IS THE ADMIN BOOKING PAGE</h1>
        </div>
    </>);
}