import { NavLink, useNavigate } from "react-router-dom";

const LOGOUT_REDIRECT_PATH = '/secret/adminlogin';
const LOCAL_STORAGE_KEYS = ['token', 'user', 'userLoggedIn'];

export function AdminNavigationBar() {
    const navigate = useNavigate();

    function logout() {
        LOCAL_STORAGE_KEYS.forEach(key => localStorage.removeItem(key));
        navigate(LOGOUT_REDIRECT_PATH);
        navigate(0);
    }

    const navLinks = [
        { path: "/secret/adminlogin/booking", label: "Időpontok kezelése" },
        { path: "/secret/adminlogin/gallery", label: "Galéria kezelése" },
        { path: "/secret/adminlogin/AdminProfile", label: "Profil módosítás" },
    ];

    return (
        <div>
            <div className="navigationBar" id="navBarContainer">
                <div className="row">
                    <div className="col">
                        <nav className="navbar navbar-expand-lg">
                            <div className="container-fluid d-flex justify-content-between">
                                <img className='navbar-brand brandLogo' src="/katus_logo.jpeg" alt="Logo" />
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                                        {navLinks.map((link, index) => (
                                            <li key={index} className="nav-item">
                                                <NavLink className="nav-link" aria-current="page" to={link.path}>{link.label}</NavLink>
                                            </li>
                                        ))}
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                Profil
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li><button className="btn" onClick={logout}>Kijelentkezés</button></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}