import { useEffect, useState } from "react";
import { AdminNavigationBar } from "../Components/AdminNavigationBar";
import { GalleryImg } from "../GalleryImg";
import { CardComponentForAdmin } from "../Components/CardComponentForAdmin";
import SingleFileUploader from "../Components/SingleFileUploader";
import useAuthAdmin from "../Components/useAuthAdmin";

const API_URL = 'http://localhost:3000/images';

export function AdminGalleryPage() {
    const { token, setToken } = useAuthAdmin();
    const [gallery, setGallery] = useState([])

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, [] || token);

    useEffect(() => {
        async function loadImages() {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setGallery(data);
            } catch (error: any) {
                throw new Error(error.message);
            }
        }
        loadImages();
    }, []);
    
    return (
        <>
            <AdminNavigationBar />
            <div className="container login gallery main-content">
                <SingleFileUploader />
                <div className="row">
                    <h1 className="col">Képek módosítása</h1>
                    <div className="row">
                        <CardComponentForAdmin cards={gallery as GalleryImg[]} />
                    </div>
                </div>
            </div>
        </>
    );
}