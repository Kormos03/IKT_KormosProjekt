import { useEffect, useState } from "react";
import { GalleryImg } from "../assets/GalleryImg";
import { CardComponent } from "../Components/CardComponent";
import { NavigationBar } from "../Components/NavigationBar";

const API_URL = 'http://localhost:3000/images/';

export function GalleryPage() {
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        async function fetchGallery() {
            try {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                });
                const data = await response.json();
                setGallery(data);
            } catch (error : any) {
                throw new Error(error.message);
            }
        }
        fetchGallery();
    }, []);
    
    return (
        <>
            <NavigationBar />
            <div className="container login main-content">
                <h1>Képek</h1> <br />
                <CardComponent cards={gallery as GalleryImg[]} />
            </div>
        </>
    );
}

