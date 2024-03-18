import { useEffect, useState } from "react";
import { AdminNavigationBar } from "../Components/AdminNavigationBar";
import { useNavigate } from "react-router-dom";
import useAuth from "../Components/useAuth";

export function AdminGalleryPage() {
    const { token, user,error, setToken, setUser, setError } = useAuth();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [backendRoute, setBackendRoute] = useState("http://localhost:3000/images");
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        else{
            navigate('/secret/adminlogin');
        }
    }, [] || token);

    useEffect(() => {
        async function loadImages(){
            try {
                const response = await fetch(backendRoute, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setGallery(data);
            } catch (error) {
                throw new Error(error.message);
            }        }
    },[])
    return (<>
        <AdminNavigationBar />
        <div>
            <h1>THIS IS THE ADMIN GALLERY PAGE</h1>
           
        </div>
    </>);
}