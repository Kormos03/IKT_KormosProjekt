import { useEffect, useState } from "react";


export function GalleryPage() {
    const [gallery, setGallery] = useState([]);
    const [backendRoute, setBackendRoute] = useState("http://localhost:3000/images");

    async function fetchGallery() {
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
        }
    }

    async function fetchOne(name: string) {
        try {
            const response = await fetch(backendRoute + `/${name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    useEffect(() => {
        fetchGallery();
    }, []);

    return <div className="container gallery">        
        <div className="row">
          <h1 className="col">Képek</h1>
          </div>
          <div> 
            {gallery.map((image: any, index: number) => {
                return <div key={index} className="gallery-image">
                    <img src={image.url} alt={image.name} />
                    <p>{image.url}</p>
                </div>
            })}
          </div>
    </div >
}

