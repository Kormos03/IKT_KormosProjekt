"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("react-dom/client");
const App_tsx_1 = require("./App.tsx");
require("./index.css");
const react_router_dom_1 = require("react-router-dom");
const react_helmet_async_1 = require("react-helmet-async");
const PriceListPage_tsx_1 = require("./pages/PriceListPage.tsx");
const GalleryPage_tsx_1 = require("./pages/GalleryPage.tsx");
const ContactPage_tsx_1 = require("./pages/ContactPage.tsx");
const LoginPage_tsx_1 = require("./pages/LoginPage.tsx");
const RegisterPage_tsx_1 = require("./pages/RegisterPage.tsx");
const WelcomePage_tsx_1 = require("./pages/WelcomePage.tsx");
const AdminLoginPage_tsx_1 = require("./pages/AdminLoginPage.tsx");
const BookingUserPage_tsx_1 = require("./pages/BookingUserPage.tsx");
const ProfilePage_tsx_1 = require("./pages/ProfilePage.tsx");
const AdminGalleryPage_tsx_1 = require("./pages/AdminGalleryPage.tsx");
const AdminBookingPage_tsx_1 = require("./pages/AdminBookingPage.tsx");
const AdminProfilePage_tsx_1 = require("./pages/AdminProfilePage.tsx");
const router1 = (0, react_router_dom_1.createBrowserRouter)([{
        path: '/',
        element: <App_tsx_1.default />,
        children: [
            {
                path: '',
                element: <WelcomePage_tsx_1.WelcomePage />
            },
            {
                path: 'pricelist',
                element: <PriceListPage_tsx_1.PriceListPage />
            },
            {
                path: 'gallery',
                element: <GalleryPage_tsx_1.GalleryPage />
            }, {
                path: 'contact',
                element: <ContactPage_tsx_1.ContactPage />
            }, {
                path: 'login',
                element: <LoginPage_tsx_1.LoginPage />,
            }, {
                path: 'register',
                element: <RegisterPage_tsx_1.RegisterPage />
            }, {
                path: 'secret/adminLogin',
                element: <AdminLoginPage_tsx_1.AdminLoginPage />,
                children: [
                    {
                        path: 'adminProfile',
                        element: <AdminProfilePage_tsx_1.AdminProfilePage />
                    },
                    {
                        path: 'gallery',
                        element: <AdminGalleryPage_tsx_1.AdminGalleryPage />
                    },
                    {
                        path: 'booking',
                        element: <AdminBookingPage_tsx_1.AdminBookingPage />
                    }
                ]
            },
            {
                path: 'bookingUser',
                element: <BookingUserPage_tsx_1.BookingUserPage />
            },
            {
                path: 'Profile',
                element: <ProfilePage_tsx_1.ProfilePage />
            },
        ]
    }]);
client_1.default.createRoot(document.getElementById('root')).render(<react_helmet_async_1.HelmetProvider>
  <react_1.default.StrictMode>
    <react_router_dom_1.RouterProvider router={router1}/>
  </react_1.default.StrictMode>
  </react_helmet_async_1.HelmetProvider>);
//# sourceMappingURL=main.js.map