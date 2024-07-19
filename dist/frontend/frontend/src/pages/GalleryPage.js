"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryPage = void 0;
const react_1 = require("react");
const CardComponent_1 = require("../Components/CardComponent");
const NavigationBar_1 = require("../Components/NavigationBar");
const API_URL = 'http://localhost:3000/images/';
function GalleryPage() {
    const [gallery, setGallery] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        async function fetchGallery() {
            try {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                });
                const data = await response.json();
                setGallery(data);
            }
            catch (error) {
                throw new Error(error.message);
            }
        }
        fetchGallery();
    }, []);
    return (<>
            <NavigationBar_1.NavigationBar />
            <div className="container login main-content">
                <h1>Képek</h1> <br />
                <CardComponent_1.CardComponent cards={gallery}/>
            </div>
        </>);
}
exports.GalleryPage = GalleryPage;
//# sourceMappingURL=GalleryPage.js.map