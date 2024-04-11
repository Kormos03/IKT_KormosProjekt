import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export function NavigationBar() {
    //const { token, user, error, setToken, setUser, setError } = useAuth();
    const navigate = useNavigate();
  

   function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userLoggedIn');
    navigate('/login');
}

   const handleNavigationForReservation = () => {
    if(localStorage.getItem('token') == null || localStorage.getItem('token')  == '' || typeof localStorage.getItem('token')  == undefined){
        navigate("/login");
    } else{
        navigate("/bookingUser");
    }
}

    return (<div>
        <div className="container" id="navBarContainer">
            <div className="row">
                <div className="col">

                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid d-flex justify-content-between">
                            <img className='navbar-brand brandLogo' src="/katus_logo.jpeg" />
                            <a className="navbar-brand main_nav_link" href="/">Főoldal</a>
                            
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" aria-current="page" to="/pricelist">Árlista</NavLink>
                                    </li>
                                    <li className="nav-item">
                                    <button className="nav-link" onClick={handleNavigationForReservation}>Időpontfoglalás</button>

                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" aria-current="page" to="/gallery">Galéria</NavLink>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            Profil
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>{
                                                localStorage.getItem('token')  ? <button className="btn btn-primary btn-lg" onClick={logout}>Kijelentkezés</button> :  <a className="dropdown-item" href="/login">Bejelentkezés</a>  
                                                }</li>
                                            <li>{
                                               localStorage.getItem('token')  ? <NavLink className="dropdown-item" to="/Profile">Profil megtekintése</NavLink>  : <NavLink className="dropdown-item" to="/register">Regisztráció</NavLink>
                                                }
                                                </li>
                                            <li>{   
                                                        }</li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" aria-current="page" to="/contact">Kapcsolat</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div >
    </div >

    )
}