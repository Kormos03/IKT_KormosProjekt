import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { PriceListPage } from './pages/PriceListPage.tsx'
import { GalleryPage } from './pages/GalleryPage.tsx'
import { ContactPage } from './pages/ContactPage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { RegisterPage } from './pages/RegisterPage.tsx'
import { WelcomePage } from './pages/WelcomePage.tsx'
import { AdminLoginPage } from './pages/AdminLoginPage.tsx'
import { AdminPage } from './pages/AdminPage.tsx'
import { BookingUserPage } from './pages/BookingUserPage.tsx'

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
      }]
    },
    {
      path: 'bookingUserPage',
      element: <BookingUserPage />
    },
  ]

}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router1} />
  </React.StrictMode>,
)
