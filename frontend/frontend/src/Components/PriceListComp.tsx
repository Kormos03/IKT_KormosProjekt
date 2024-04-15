import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toLowerAlphaNumeric } from '../toLowerAlphaNumeric';

export function PriceListComp(){
    const [hoveredCard, setHoveredCard] = useState(-1);
    const navigate = useNavigate();
    const services = [
        { name: 'Manikűr', price: '3,000 Ft', img: 'https://elitenails.hu/wp-content/uploads/2020/07/japanese-manicure-elite-nails-salon-budapest-district-1-2.jpg' },
        { name: 'Gél lakk', price: '4,500 Ft', img: 'https://nailshouse.hu/wp-content/uploads/2020/12/Gellakk-Egyszinu-1170x658.jpg' },
        { name: 'Műköröm építés', price: '6,000 Ft', img: 'https://heaveninstyle.hu/wp-content/uploads/2023/04/IMG_8627-1080x675.jpg' },
        { name: 'Műköröm töltés', price: '5,000 Ft', img:'https://alexart.hu/ckfinder/userfiles/images/20201015_171347.jpg' },
        { name: 'Pedikűr', price: '4,000 Ft', img:'https://pediklub.hu/wp-content/uploads/2021/06/blog_kepek_14-845x321.jpg' },
        { name: 'Extra festés vagy kövek', price: '+500 Ft', img:'https://i.ytimg.com/vi/RlYAXoR83PQ/maxresdefault.jpg'},
    ];

    function handleClick(){
        const service = {name: services[hoveredCard].name, value: toLowerAlphaNumeric(services[hoveredCard].name)}
        localStorage.setItem('service', JSON.stringify(service));
        console.log('Foglalás gombra kattintottál', service);
        navigate('/bookingUser');
    }
    
   
   return (
        <div className="row">
            {services.map((service, index) => (
                <div key={index} className="col-md-4 mb-4">
                    <div className="card gallery_img" onMouseEnter={() => { setHoveredCard(index); }} onMouseLeave={() => {setHoveredCard(-1); }}>
                        <img src={service.img} className="card-img-top priceListImg" alt={service.name} />
                        <div className="card-body">
                            <h5 className="card-title">{service.name}</h5>
                            <p className="card-text">{service.price}</p>
                            {hoveredCard === index && <button className="btn btn-primary" style={{backgroundColor: 'blue', color: 'white'}} onClick={handleClick}>Foglalás</button>} 
                            </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PriceListComp;