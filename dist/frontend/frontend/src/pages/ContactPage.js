"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactPage = void 0;
const NavigationBar_1 = require("../Components/NavigationBar");
require("leaflet/dist/leaflet.css");
const react_leaflet_1 = require("react-leaflet");
const react_router_dom_1 = require("react-router-dom");
function ContactPage() {
    const position = [47.51469716233609, 18.934041252937167];
    return <>
    <NavigationBar_1.NavigationBar />
    <div className="container login main-content">
    <h1>Elérhetőségek</h1>
        <table>
            <tr>
                <th><h2>Telefon</h2></th>
                <th><h2>Email</h2></th>
            </tr>
            <tr>
                <td>(+36) 30 123 4567</td>
                <td><a href="mailto:hadobas.kata715@gmail.hu" target="_blank">hadobas.kata715@gmail.com</a></td>
            </tr>
        </table>
        <br />
        <h2>Helyszín: <react_router_dom_1.NavLink className="bookFromWelcomePage" to={`https://www.google.com/maps?q=Budakeszi, Fő u. 74, 2092`} target="_blank">Budakeszi, Fő u. 74, 2092</react_router_dom_1.NavLink></h2>
        <react_leaflet_1.MapContainer center={position} zoom={20} style={{ height: "50vh", width: "40%" }}>
      <react_leaflet_1.TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
      <react_leaflet_1.Marker position={position}>
        <react_leaflet_1.Popup>
          <p>Budakeszi, Fő u. 74, 2092</p>
        </react_leaflet_1.Popup>
      </react_leaflet_1.Marker>
    </react_leaflet_1.MapContainer>
    </div>
    </>;
}
exports.ContactPage = ContactPage;
//# sourceMappingURL=ContactPage.js.map