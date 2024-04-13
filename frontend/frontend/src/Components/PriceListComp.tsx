import 'bootstrap/dist/css/bootstrap.min.css';

export function PriceListComp(){
    const services = [
        { name: 'Manikűr', price: '3,000 Ft', img: 'https://elitenails.hu/wp-content/uploads/2020/07/japanese-manicure-elite-nails-salon-budapest-district-1-2.jpg' },
        { name: 'Gél lakk', price: '4,500 Ft', img: 'https://nailshouse.hu/wp-content/uploads/2020/12/Gellakk-Egyszinu-1170x658.jpg' },
        { name: 'Műköröm építés', price: '6,000 Ft', img: 'https://heaveninstyle.hu/wp-content/uploads/2023/04/IMG_8627-1080x675.jpg' },
        { name: 'Műköröm töltés', price: '5,000 Ft', img:'https://alexart.hu/ckfinder/userfiles/images/20201015_171347.jpg' },
        { name: 'Pedikűr', price: '4,000 Ft', img:'https://pediklub.hu/wp-content/uploads/2021/06/blog_kepek_14-845x321.jpg' },
        { name: 'Extra festés vagy kövek', price: '500 Ft', img:'https://i.ytimg.com/vi/RlYAXoR83PQ/maxresdefault.jpg'},
    ];

   return (
        <div className="row">
            {services.map((service, index) => (
                <div key={index} className="col-md-4 mb-4">
                    <div className="card">
                        <img src={service.img} className="card-img-top priceListImg" alt={service.name} />
                        <div className="card-body">
                            <h5 className="card-title">{service.name}</h5>
                            <p className="card-text">{service.price}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PriceListComp;