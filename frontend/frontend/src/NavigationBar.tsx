import { NavLink } from "react-router-dom";

export function NavigationBar() {
    return (<div>
        <div className="container">
            <div className="row">
                <div className="col">

                    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                        <div className="container-fluid d-flex justify-content-between">
                            <img className='navbar-brand brandLogo' src="katus_logo.jpeg" />
                            <NavLink className="navbar-brand" to="/">Főoldal</NavLink>

                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" aria-current="page" to="/pricelist">Árlista</NavLink>

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
                                            <li><NavLink className="dropdown-item" to="/login">Bejelentkezés</NavLink></li>
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