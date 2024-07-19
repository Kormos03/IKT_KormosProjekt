"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardComponentForAdmin = void 0;
const react_router_dom_1 = require("react-router-dom");
const useAuthAdmin_1 = require("./useAuthAdmin");
const GLOBAL_API_URL_1 = require("../../../GLOBAL_API_URL");
const API_URL = GLOBAL_API_URL_1.GLOBAL_API_URL + "/images/";
function CardComponentForAdmin({ cards }) {
    const { token } = (0, useAuthAdmin_1.default)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    async function deleteImage(id) {
        const response = fetch(API_URL + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ id: id })
        });
        if ((await response).ok) {
            console.log('Sikeres törlés');
            navigate(0);
        }
        else {
            console.log('Sikertelen törlés');
        }
    }
    return (<div className="container">
      <div className="row">
        {cards.map((card, index) => (<div className="col-md-4" key={index}>
            <div className="card">
              <img src={card.url} alt="" className="card-header admin_gallery_img"/>
              <input className="btn btn-danger btn-md card-title" type="button" value='Törlés' onClick={() => deleteImage(card.id)}/>
            </div>
          </div>))}
      </div>
    </div>);
}
exports.CardComponentForAdmin = CardComponentForAdmin;
//# sourceMappingURL=CardComponentForAdmin.js.map