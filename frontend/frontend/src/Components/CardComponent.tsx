import { useEffect } from "react";
import { NavigationBar } from "./NavigationBar";

//El kell különíteni kategóriákra a képeket -> Majd a kategóriákra kattintva megjeleníteni a képeket, de ezt már csak a vizsga után fogom megcsinálni
export function CardComponent({cards}) {
    const [backendRoute, setBackendRoute] = useState("http://localhost:3000/images");

    async function deleteImage(id: number){
        console.log('id:' , id)
        const response = fetch(backendRoute)
    }
    return <> 
      <div className="container">
        <div className="row">
          {cards!.map((card, index) => (
            <div className="col-md-4" key={index}>
              <div className="card">
                  <img src={card.url} alt="" className="card-body gallery_img"/> <br />
                 <input type="button" value='Törlés' onClick={() => deleteImage(card.id)}/>

              </div>
            </div>
          ))}
        </div>
      </div>
      </>
  }