"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLowerAlphaNumeric = void 0;
function removeAccents(input) {
    const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñŰű';
    const accentsOut = 'AAAAAAaaaaaaOOOOOOooooooEEEEeeeeCcIIIIiiiiUUUUuuuuyNnUu';
    return input.split('').map((char) => {
        const accentIndex = accents.indexOf(char);
        return accentIndex !== -1 ? accentsOut[accentIndex] : char;
    }).join('');
}
function toLowerAlphaNumeric(input) {
    const noAccents = removeAccents(input);
    return noAccents.toLowerCase().replace(/[^a-z0-9]/g, '');
}
exports.toLowerAlphaNumeric = toLowerAlphaNumeric;
//# sourceMappingURL=toLowerAlphaNumeric.js.map