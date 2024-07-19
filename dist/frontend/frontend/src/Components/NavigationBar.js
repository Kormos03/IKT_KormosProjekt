"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationBar = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
function NavigationBar() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [darkMode] = (0, react_1.useState)(localStorage.getItem('darkMode') === '1');
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userLoggedIn');
        navigate('/login');
    };
    const handleNavigationForReservation = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/login");
        }
        else {
            navigate("/bookingUser");
        }
    };
    const handleLogoClick = () => {
        navigate("/");
    };
    return (<div className={darkMode ? 'dark navigationBar' : 'navigationBar'} id="navBarContainer">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-lg ">
                        <div className="container-fluid d-flex justify-content-between">
                            <img className='navbar-brand brandLogo' src="/katus_logo.jpeg" onClick={handleLogoClick}/>
                            <a className="navbar-brand main_nav_link" href="/">Főoldal</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                                    <li className="nav-item">
                                        <react_router_dom_1.NavLink className="nav-link" aria-current="page" to="/gallery">Galéria</react_router_dom_1.NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <react_router_dom_1.NavLink className="nav-link" aria-current="page" to="/pricelist">Árlista</react_router_dom_1.NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" onClick={handleNavigationForReservation}>Időpontfoglalás</button>
                                    </li>
                                    <li className="nav-item">
                                        <react_router_dom_1.NavLink className="nav-link" aria-current="page" to="/contact">Kapcsolat</react_router_dom_1.NavLink>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Profil
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>{localStorage.getItem('token') ? <button className="btn btn-lg" onClick={logout}>Kijelentkezés</button> : <react_router_dom_1.NavLink className="dropdown-item" to="/login">Bejelentkezés</react_router_dom_1.NavLink>}</li>
                                            <li>{localStorage.getItem('token') ? <react_router_dom_1.NavLink className="dropdown-item" to="/Profile">Profil megtekintése</react_router_dom_1.NavLink> : <react_router_dom_1.NavLink className="dropdown-item" to="/register">Regisztráció</react_router_dom_1.NavLink>}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>);
}
exports.NavigationBar = NavigationBar;
//# sourceMappingURL=NavigationBar.js.map