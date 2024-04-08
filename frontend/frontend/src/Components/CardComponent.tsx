import { useEffect, useState } from "react";
import { NavigationBar } from "./NavigationBar";

//El kell különíteni kategóriákra a képeket -> Majd a kategóriákra kattintva megjeleníteni a képeket, de ezt már csak a vizsga után fogom megcsinálni
export function CardComponent({cards}) {
    const [backendRoute, setBackendRoute] = useState("http://localhost:3000/images");

  
    
    return <> 
      <div className="container">
        <div className="row">
          {cards!.map((card, index) => (
            <div className="col-md-4" key={index}>
              <div className="card">
                  <img src={card.url} alt="" className="card-body gallery_img"/> <br />


              </div>
            </div>
          ))}
        </div>
      </div>
      </>
  }