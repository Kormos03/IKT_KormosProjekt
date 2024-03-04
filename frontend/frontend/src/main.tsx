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

const router = createBrowserRouter([{
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
      element: <LoginPage />

    }, {
      path: 'register',
      element: <RegisterPage />

    },{
      path: 'adminLogin',
      element: <AdminLoginPage />
    }
  ]

}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
