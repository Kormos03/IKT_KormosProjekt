import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { validateAdmin } from "./validateAdmin";

export function NavigationBar() {
    const [user, setUser] = useState(null || localStorage.getItem('user'));
    useEffect(() => {
        setUser(localStorage.getItem('user'));
   }, [user])

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
                                        {
                                            user ? <NavLink className="nav-link" aria-current="page" to="/bookingUserPage">Időpontfoglalás</NavLink> : <NavLink className="nav-link" aria-current="page" to="/login">Időpontfoglalás</NavLink>
                                        }
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
                                            <li><a className="dropdown-item" href="/login">Bejelentkezés</a></li>
                                            <li><NavLink className="dropdown-item" to="/register">Regisztráció</NavLink></li>
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