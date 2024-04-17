import { useEffect, useState } from "react";
import { GalleryImg } from "../GalleryImg";
import { CardComponent } from "../Components/CardComponent";
import { NavigationBar } from "../Components/NavigationBar";

export function GalleryPage() {
    const [gallery, setGallery] = useState([]);
    const [backendRoute, setBackendRoute] = useState("http://localhost:3000/images/");
    console.log("gallery:" +gallery)
    async function fetchGallery() {
        try {
            const response = await fetch(backendRoute, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const data = await response.json();
            setGallery(data);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    useEffect(() => {
        fetchGallery();
    }, []);
    
    return <>
        <NavigationBar  />
        <div className="container login main-content">
            <div className="row">
                <h1 className="col">Képek</h1>
            </div> <br />
            <div className="row">
            <CardComponent cards={gallery as GalleryImg[]} />
        </div>

      
        </div>
        </>
}

