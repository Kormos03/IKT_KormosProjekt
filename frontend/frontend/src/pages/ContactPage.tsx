import { NavigationBar } from "../Components/NavigationBar";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { NavLink } from "react-router-dom";

export function ContactPage() {
  const position: [number, number] = [47.51469716233609, 18.934041252937167]; 

    return <>
    <NavigationBar/>
    <div className="container login main-content">
    <h1>Elérhetőségek</h1>
        <table>
            <tr>
                <th><h2>Telefon</h2></th>
                <th><h2>Email</h2></th>
            </tr>
            <tr>
                <td>(+36) 30 123 4567</td>
                <td><a href="mailto:info@szabadsag.hu" target="_blank">kormozesgabg@gmail.com</a></td>
            </tr>
        </table>
        <br />
        <h2>Helyszín: <NavLink className="bookFromWelcomePage" to={`https://www.google.com/maps?q=Budakeszi, Fő u. 74, 2092`} target="_blank">Budakeszi, Fő u. 74, 2092</NavLink></h2>
        <MapContainer center={position} zoom={20} style={{ height: "50vh", width: "40%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          <p>Budakeszi, Fő u. 74, 2092</p>
        </Popup>
      </Marker>
    </MapContainer>
    </div >
    </>
  }