import { useEffect, useState } from "react";
import { NavigationBar } from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

//El kell különíteni kategóriákra a képeket -> Majd a kategóriákra kattintva megjeleníteni a képeket, de ezt már csak a vizsga után fogom megcsinálni
export function CardComponentForAdmin({cards}) {
  const { token, user,error, setToken, setUser, setError } = useAuth();

    const [backendRoute, setBackendRoute] = useState("http://localhost:3000/images/");
    const navigate = useNavigate();
   
    async function deleteImage(id: number){
        console.log('id:' , id)
        const response = fetch(backendRoute + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({id: id})
        })
        if((await response).ok){
            console.log('Sikeres törlés')
            navigate(0)

        }
        else{
            console.log('Sikertelen törlés')
          }
    }



    return <> 

      <div className="container">
        <div className="row">
          {cards!.map((card, index) => (
            <div className="col-md-4" key={index}>
              <div className="card">
                  <img src={card.url} alt="" className="card-header gallery_img"/>
                   <br />
                  <input className="btn btn-danger btn-md card-title" type="button" value='Törlés' onClick={() => deleteImage(card.id)}/>

              </div>
            </div>
          ))}
        </div>

      </div>
      </>
  }