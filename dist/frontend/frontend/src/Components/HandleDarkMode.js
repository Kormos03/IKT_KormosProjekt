"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDarkMode = void 0;
const react_1 = require("react");
function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = (0, react_1.useState)(() => {
        const darkModeInStorage = localStorage.getItem('darkMode');
        return darkModeInStorage === 'true';
    });
    (0, react_1.useEffect)(() => {
        const darkMode = localStorage.getItem('darkMode') == 'true';
        setIsDarkMode(darkMode);
    }, []);
    (0, react_1.useEffect)(() => {
        if (isDarkMode) {
            document.body.classList.remove('light');
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        }
        else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light');
            localStorage.setItem('darkMode', 'false');
        }
    }, [isDarkMode] || []);
    return [isDarkMode, setIsDarkMode];
}
exports.useDarkMode = useDarkMode;
//# sourceMappingURL=HandleDarkMode.js.map