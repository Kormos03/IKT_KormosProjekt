"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomePage = void 0;
const react_1 = require("react");
const NavigationBar_1 = require("../Components/NavigationBar");
const WelcomeLoggedIn_1 = require("../Components/WelcomeLoggedIn");
const WelcomeLogIn_1 = require("../Components/WelcomeLogIn");
const HandleDarkMode_1 = require("../Components/HandleDarkMode");
function WelcomePage() {
    const [isDarkMode] = (0, HandleDarkMode_1.useDarkMode)();
    (0, react_1.useEffect)(() => {
        const user = localStorage.getItem('user');
        if (user) {
            console.log(localStorage.getItem('User: ' + 'user'));
        }
        isDarkMode;
    }, []);
    return <>
       <NavigationBar_1.NavigationBar />
    <div className="container  main-content">
    <div className="jumbotron mt-5">
        <h1 className="display-4">Üdvözöljük a körmösszalon oldalán!</h1>
        <p className="lead">Széleskörű szolgáltatásainkkal várjuk kedves vendégeinket.</p>
        <hr className="my-4"/>
        {localStorage.getItem('token') ? <WelcomeLoggedIn_1.WelcomeLoggedIn /> : <WelcomeLogIn_1.WelcomeLogIn />}
      
    </div>

    </div>
    </>;
}
exports.WelcomePage = WelcomePage;
//# sourceMappingURL=WelcomePage.js.map