import { useNavigate } from "react-router-dom";
import useAuthAdmin from "./useAuthAdmin";
import { GLOBAL_API_URL } from "../../../GLOBAL_API_URL";

const API_URL = GLOBAL_API_URL + "/images/";

export function CardComponentForAdmin({cards}: {cards: {url: string, id: number}[]}) {
  const { token } = useAuthAdmin();
  const navigate = useNavigate();
   
  async function deleteImage(id: number){
    const response = fetch(API_URL + id, {
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
    } else {
      console.log('Sikertelen törlés')
    }
  }

  return (
    <div className="container">
      <div className="row">
        {cards.map((card, index) => (
          <div className="col-md-4" key={index}>
            <div className="card">
              <img src={card.url} alt="" className="card-header admin_gallery_img"/>
              <input className="btn btn-danger btn-md card-title" type="button" value='Törlés' onClick={() => deleteImage(card.id)}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}