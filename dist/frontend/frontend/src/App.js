"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
require("bootstrap/dist/js/bootstrap.bundle.min");
require("./App.css");
const react_router_dom_1 = require("react-router-dom");
const react_helmet_async_1 = require("react-helmet-async");
const Footer_1 = require("./Components/Footer");
function App() {
    const [darkMode] = (0, react_1.useState)(localStorage.getItem('darkMode') == '1');
    return (<>
        <react_helmet_async_1.Helmet>
            <title>Körmös projekt</title>
            <link rel="icon" href="/favicon.ico"/>
            <meta name="keywords" content="Körmös projekt"/>
            <meta name="author" content="Kormos Áron"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
            <meta name="description" content="Körmös projekt"/>
        <meta name="description" content="Körmös projekt"/>
        </react_helmet_async_1.Helmet>

        <div className={darkMode ? 'dark' : ''}>

        <main className=''>
          <react_router_dom_1.Outlet />
        </main>
      </div>
      <Footer_1.Footer />

    </>);
}
exports.default = App;
//# sourceMappingURL=App.js.map