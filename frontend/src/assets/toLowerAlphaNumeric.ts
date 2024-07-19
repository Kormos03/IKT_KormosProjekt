function removeAccents(input: string) {
    const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñŰű';
    const accentsOut = 'AAAAAAaaaaaaOOOOOOooooooEEEEeeeeCcIIIIiiiiUUUUuuuuyNnUu';
    return input.split('').map((char) => {
        const accentIndex = accents.indexOf(char);
        return accentIndex !== -1 ? accentsOut[accentIndex] : char;
    }).join('');
}


export function toLowerAlphaNumeric(input: string) {
    const noAccents = removeAccents(input);
    return noAccents.toLowerCase().replace(/[^a-z0-9]/g, '');
}