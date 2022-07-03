// @ts-nocheck
export function validate(cpf) {
    if (isCpfStringInvalid(cpf)) return false;

    const [sumDigits, fistValidatorDigit, secondValidatorDigit] = parseCpf(cpf);

    let digitsSum1 = 0;
    let digitsSum2 = 0;

    for (let i = 0; i < sumDigits.length; i++) {
        const currentDigit = parseInt(sumDigits[i]);
        digitsSum1 = digitsSum1 + (10 - i) * currentDigit;
        digitsSum2 = digitsSum2 + (11 - i) * currentDigit;
    };

    let rest = (digitsSum1 * 10) % 11;
    const firstCalculatedDigit = rest === 10 ? 0 : rest;

    if (String(firstCalculatedDigit) !== fistValidatorDigit) return false;

    digitsSum2 += 2 * firstCalculatedDigit;
    rest = (digitsSum2 * 10) % 11;
    const secondCalculatedDigit = rest === 10 ? 0 : rest;

    return String(secondCalculatedDigit) === secondValidatorDigit;
}

function isCpfStringInvalid(cpf) {
    return cpf === null
        || cpf === undefined
        || cpf.length < 11
        || cpf.length > 14;
}

function parseCpf(cpf) {
    const parsedCpf = cpf
        .replace('.','')
        .replace('.','')
        .replace('-','')
        .replace(' ','');

    return [
        parsedCpf.substring(0, parsedCpf.length - 2),
        parsedCpf[parsedCpf.length - 2],
        parsedCpf[parsedCpf.length - 1]
    ];
}