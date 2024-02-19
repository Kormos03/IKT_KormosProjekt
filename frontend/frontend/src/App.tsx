import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'

function NavigationBar() {
  return (<div>
    <div className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">Főoldal</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/pricelist">Árlista</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/gallery">Galéria</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                      aria-expanded="false">
                      Profil
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="login.html">Bejelentkezés</a></li>
                      <li><a className="dropdown-item" href="#">Regisztráció</a></li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/pricelist">Kapcsolat</a>
                  </li>
                </ul>
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>

  )
}


function App() {
  const [background, setBackground] = useState("");

  async function getBackground() {
    try {
      const response = await fetch("https://as2.ftcdn.net/v2/jpg/04/81/66/19/1000_F_481661950_DozZV5h8tZO87DN7W6pv0IyAIDRX9MzJ.jpg");
      const data = await response;
      console.log(data);
      setBackground(data.url);
    } catch (error) {
      throw new Error(error.message)
    }
  }

  useEffect(() => {
    getBackground();
  }, []);

  return (
    <>
      <style>
        {`body{
        background-image: url(${background});
      }`}
      </style>
      <div>
        <NavigationBar></NavigationBar>
      </div>
    </>
  )
}

export default App
