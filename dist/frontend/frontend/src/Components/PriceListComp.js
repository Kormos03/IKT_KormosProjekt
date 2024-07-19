"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceListComp = void 0;
require("bootstrap/dist/css/bootstrap.min.css");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const toLowerAlphaNumeric_1 = require("../assets/toLowerAlphaNumeric");
function PriceListComp() {
    const [hoveredCard, setHoveredCard] = (0, react_1.useState)(-1);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const services = [
        { name: 'Manikűr', price: '3,000 Ft', img: '/manikur.jpeg' },
        { name: 'Gél lakk', price: '4,500 Ft', img: '/gellakk.jpeg' },
        { name: 'Műköröm építés', price: '6,000 Ft', img: '/mukoromepites.jpeg' },
        { name: 'Műköröm töltés', price: '5,000 Ft', img: '/mukoromtoltes.jpeg' },
        { name: 'Pedikűr', price: '4,000 Ft', img: '/pedikur.jpg' },
        { name: 'Extra festés vagy kövek', price: '+500 Ft', img: '/extra.jpeg' },
    ];
    function handleClick() {
        const service = { name: services[hoveredCard].name, value: (0, toLowerAlphaNumeric_1.toLowerAlphaNumeric)(services[hoveredCard].name) };
        localStorage.setItem('service', JSON.stringify(service));
        navigate('/bookingUser');
    }
    return (<div className="row">
            {services.map((service, index) => (<div key={index} className="col-md-4 mb-4">
                    <div className="card gallery_img" onMouseEnter={() => { setHoveredCard(index); }} onMouseLeave={() => { setHoveredCard(-1); }}>
                        <img src={service.img} className="card-img-top priceListImg" alt={service.name}/>
                        <div className="card-body">
                            <h5 className="card-title">{service.name}</h5>
                            <p className="card-text">{service.price} {hoveredCard === index && <button className="btn btn-primary" style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleClick}>Foglalás</button>} </p>
                            </div>
                    </div>
                </div>))}
        </div>);
}
exports.PriceListComp = PriceListComp;
;
exports.default = PriceListComp;
//# sourceMappingURL=PriceListComp.js.map