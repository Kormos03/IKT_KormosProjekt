import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import { PriceListPage } from './pages/PriceListPage.tsx'
import { GalleryPage } from './pages/GalleryPage.tsx'
import { ContactPage } from './pages/ContactPage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { RegisterPage } from './pages/RegisterPage.tsx'
import { WelcomePage } from './pages/WelcomePage.tsx'
import { AdminLoginPage } from './pages/AdminLoginPage.tsx'
import { AdminPage } from './pages/AdminPage.tsx'
import { BookingUserPage } from './pages/BookingUserPage.tsx'
import { ProfilePage } from './pages/ProfilePage.tsx'
import { AdminGalleryPage } from './pages/AdminGalleryPage.tsx'
import { AdminBookingPage } from './pages/AdminBookingPage.tsx'
import { AdminProfilePage } from './pages/AdminProfilePage.tsx'

const router1 = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      path: '',
      element: <WelcomePage />
    },
    {
      path: 'pricelist',
      element: <PriceListPage />
    },
    {
      path: 'gallery',
      element: <GalleryPage />
    }, {
      path: 'contact',
      element: <ContactPage />
    }, {
      path: 'login',
      element: <LoginPage />,

    }, {
      path: 'register',
      element: <RegisterPage />

    },{
      path: 'secret/adminLogin',
      element: <AdminLoginPage />,
      children:[{
        path: 'adminPage',
        element: <AdminPage />
      },
      {
        path: 'adminProfile',
        element: <AdminProfilePage/>
      },
    {
      path: 'gallery',
      element: <AdminGalleryPage/>
    },
  {
    path: 'booking',
    element: <AdminBookingPage/>
  }]
    },
    {
      path: 'bookingUser',
      element: <BookingUserPage />
    },
    {
      path: 'Profile',
      element: <ProfilePage />
    },
  ]

}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
  <React.StrictMode>
    <RouterProvider router={router1} />
  </React.StrictMode>
  </HelmetProvider>,  
)
