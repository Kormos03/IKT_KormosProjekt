"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
const LoginForm_1 = require("../Components/LoginForm");
const react_router_dom_1 = require("react-router-dom");
const NavigationBar_1 = require("../Components/NavigationBar");
function LoginPage() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    function login(token) {
        localStorage.setItem('token', token);
        navigate('/');
    }
    return <>
         <NavigationBar_1.NavigationBar />
         <div className="main-content">
      <LoginForm_1.LoginForm onSuccessfulLogin={login}/>
      </div>
    </>;
}
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPage.js.map