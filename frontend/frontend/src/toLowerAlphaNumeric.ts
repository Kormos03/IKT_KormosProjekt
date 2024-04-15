function removeAccents(input) {
    const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñŰű';
    const accentsOut = 'AAAAAAaaaaaaOOOOOOooooooEEEEeeeeCcIIIIiiiiUUUUuuuuyNnUu';
    return input.split('').map((char, i) => {
        const accentIndex = accents.indexOf(char);
        return accentIndex !== -1 ? accentsOut[accentIndex] : char;
    }).join('');
}


export function toLowerAlphaNumeric(input) {
    const noAccents = removeAccents(input);
    return noAccents.toLowerCase().replace(/[^a-z0-9]/g, '');
}