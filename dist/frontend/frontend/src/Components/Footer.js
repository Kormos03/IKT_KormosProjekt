"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = void 0;
const HandleDarkMode_1 = require("./HandleDarkMode");
function Footer() {
    const [isDarkMode, setIsDarkMode] = (0, HandleDarkMode_1.useDarkMode)();
    return (<footer className={`footer mt-auto py-3 ${isDarkMode ? 'bg-dark' : 'bg-light'}`}>
      <div className="container">
        <span className={`text-${isDarkMode ? 'light' : 'dark'}`}>© 2024 </span>
        <button className={`btn btn-sm ${isDarkMode ? 'btn-light' : 'btn-dark'} float-right`} onClick={() => typeof setIsDarkMode === 'function' && setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? 'Világos mód' : 'Sötét mód'}
        </button>
      </div>
    </footer>);
}
exports.Footer = Footer;
//# sourceMappingURL=Footer.js.map