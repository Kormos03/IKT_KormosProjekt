"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGalleryPage = void 0;
const react_1 = require("react");
const AdminNavigationBar_1 = require("../Components/AdminComponents/AdminNavigationBar");
const CardComponentForAdmin_1 = require("../Components/AdminComponents/CardComponentForAdmin");
const SingleFileUploader_1 = require("../Components/AdminComponents/SingleFileUploader");
const useAuthAdmin_1 = require("../Components/AdminComponents/useAuthAdmin");
const API_URL = 'http://localhost:3000/images';
function AdminGalleryPage() {
    const { token, setToken } = (0, useAuthAdmin_1.default)();
    const [gallery, setGallery] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, [] || token);
    (0, react_1.useEffect)(() => {
        async function loadImages() {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setGallery(data);
                console.log(data);
            }
            catch (error) {
                throw new Error(error.message);
            }
        }
        loadImages();
    }, []);
    return (<>
            <AdminNavigationBar_1.AdminNavigationBar />
            <div className="container login gallery main-content">
                <SingleFileUploader_1.default />
                <div className="row">
                    <h1 className="col">Képek módosítása</h1>
                    <div className="row">
                        <CardComponentForAdmin_1.CardComponentForAdmin cards={gallery}/>
                    </div>
                </div>
            </div>
        </>);
}
exports.AdminGalleryPage = AdminGalleryPage;
//# sourceMappingURL=AdminGalleryPage.js.map