"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledInput = void 0;
const styled_components_1 = require("styled-components");
exports.StyledInput = styled_components_1.default.input `
width: 100%;
padding: 12px 20px;
margin: 8px 0;
box-sizing: border-box;
border: 2px solid #ccc;
border-radius: 4px;
background-color: #f8f8f8;
font-size: 16px;
transition: 0.3s;

&:focus {
    border-color: #4CAF50;
    outline: none;
}
`;
//# sourceMappingURL=StyledInput.js.map