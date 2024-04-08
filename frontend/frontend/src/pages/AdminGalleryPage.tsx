import { useEffect, useState } from "react";
import { AdminNavigationBar } from "../Components/AdminNavigationBar";
import { useNavigate } from "react-router-dom";
import useAuth from "../Components/useAuth";
import { CardComponent } from "../Components/CardComponent";
import { GalleryImg } from "../GalleryImg";
import { CardComponentForAdmin } from "../Components/CardComponentForAdmin";
import SingleFileUploader from "../Components/SingleFileUploader";

export function AdminGalleryPage() {
    const { token, user,error, setToken, setUser, setError } = useAuth();
    const [gallery, setGallery] = useState([])
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
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setGallery(data);
            } catch (error) {
                throw new Error(error.message);
            }        }
            loadImages()
    },[])

    return <>

        <AdminNavigationBar />
        <SingleFileUploader />
        <div className="container gallery">
            <div className="row">
                <h1 className="col">Képek módosítása</h1>
            
            <div className="row">
            <CardComponentForAdmin cards={gallery as GalleryImg[]} />
        </div>
        </div>
        </div>
        
    </>
}