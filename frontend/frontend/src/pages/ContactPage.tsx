import { NavigationBar } from "../Components/NavigationBar";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export function ContactPage() {
  const position: [number, number] = [47.497913, 19.040236];

    return <><NavigationBar/>
    <div className="container login main-content">
    <h1>Elérhetőségek</h1>
        <table>
            <tr>
                <th>Telefon</th>
                <th>Email</th>
            </tr>
            <tr>
                <td>(+36) 30 123 4567</td>
                <td><a href="mailto:info@szabadsag.hu" target="_blank">kormozesgabg@gmail.com</a></td>
            
            </tr>
        </table>
        <br />
        <p>Helyszín: <a href="https://www.google.com/maps?q=47.497913,19.040236" target="_blank">Budapest.</a></p>
        <MapContainer center={position} zoom={20} style={{ height: "30vh", width: "30%" }}>
          
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          <p>Körmösszalon helye</p>
        </Popup>
      </Marker>
    </MapContainer>
    </div >
    </>
  }