import { useEffect, useState } from "react";
import { GalleryImg } from "../GalleryImg";

function CardComponent({cards}) {
    console.log(cards);
    return (
      <div className="container">
        <div className="row">
          {cards!.map((card, index) => (
            <div className="col-md-4" key={index}>
              <div className="card">
                  <img src={card.url} alt="" className="card-body gallery_img"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }



export function GalleryPage() {
    const [gallery, setGallery] = useState([]);
    const [backendRoute, setBackendRoute] = useState("http://localhost:3000/images");
    console.log("gallery:" +gallery)
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

    useEffect(() => {
        fetchGallery();
    }, []);
    
    return (
        <div className="container gallery">
            <div className="row">
                <h1 className="col">Képek</h1>
            </div>
            <div className="row">
            <CardComponent cards={gallery as GalleryImg[]} />
        </div>

      
        </div>
    );
}

