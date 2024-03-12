import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { validateAdmin } from "./validateAdmin";

export function NavigationBar() {
    const [user, setUser] = useState(null || localStorage.getItem('user'));
    const navigate = useNavigate();
    useEffect(() => {
        setUser(localStorage.getItem('user'));
        if(typeof user == undefined || user == null){
            console.log('User: '+user);
            localStorage.removeItem('user');

        }
   }, [user])

   function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
    navigate('/login');
}

   const handleNavigation = () => {
    if(typeof user === 'undefined') {
        navigate("/login");
        console.log('User: '+user)
    } else {
        navigate("/bookingUserPage");

        console.log('User: '+user)
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
                                    <button className="nav-link" onClick={handleNavigation}>Időpontfoglalás</button>

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
                                                user ? <button onClick={logout}>Kijelentkezés</button> :  <a className="dropdown-item" href="/login">Bejelentkezés</a>  
                                                }</li>
                                            <li><NavLink className="dropdown-item" to="/register">Regisztráció</NavLink></li>
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