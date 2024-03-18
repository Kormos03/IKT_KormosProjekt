import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { validateAdmin } from "./validateAdmin";


export function AdminNavigationBar() {
    const navigate = useNavigate();
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userLoggedIn');
        navigate('/secret/adminlogin');
    }
    return (<div>
        <div className="container" id="navBarContainer">
            <div className="row">
                <div className="col">

                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid d-flex justify-content-between">
                            <img className='navbar-brand brandLogo' src="/katus_logo.jpeg" />
                            <NavLink className="navbar-brand main_nav_link" to="/secret/adminlogin/AdminPage">Admin Főoldal</NavLink>
                            
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                                <li className="nav-item">
                                        <NavLink className="nav-link" aria-current="page" to="/secret/adminlogin/booking">Időpontok kezelése</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" aria-current="page" to="/secret/adminlogin/gallery">Galéria kezelése</NavLink>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            Profil
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><NavLink className="dropdown-item" to="/secret/adminlogin/AdminProfileManage">Profil módosítás</NavLink></li>
                                            <li><button onClick={logout}>Kijelentkezés</button></li>
                                        </ul>
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