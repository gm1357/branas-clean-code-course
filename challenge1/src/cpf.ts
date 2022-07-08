const DIGIT_1_FACTOR = 10;
const DIGIT_2_FACTOR = 11;

export class Cpf {
    private cpf: string;

    constructor(cpf: string) {
        if (!this.validate(cpf)) {
            throw new Error('Invalid CPF given!');
        }
        this.cpf = cpf;
    }

    getValue() {
        return this.cpf;
    }

    private validate(cpf: string) {
        if (this.isCpfStringInvalid(cpf)) return false;
    
        const [parsedCpf, fistValidatorDigit, secondValidatorDigit] = this.parseCpf(cpf);
    
        const digit1 = this.calculateDigit(parsedCpf, DIGIT_1_FACTOR);
        if (String(digit1) !== fistValidatorDigit) return false;
    
        const digit2 = this.calculateDigit(parsedCpf, DIGIT_2_FACTOR);
        return String(digit2) === secondValidatorDigit;
    }

    private calculateDigit(cpf: string, factor: number) {
		let total = 0;

		for (const digit of cpf) {
			if (factor > 1) {
				total += parseInt(digit) * factor;
                factor--;
			}
		}

		const rest = total % 11;
		return (rest < 2) ? 0 : 11 - rest;
	}
    
    private isCpfStringInvalid(cpf: string) {
        return !cpf
            || cpf.length < 11
            || cpf.length > 14;
    }
    
    private parseCpf(cpf: string) {
        const parsedCpf = cpf
            .replace('.','')
            .replace('.','')
            .replace('-','')
            .replace(' ','');
    
        return [
            parsedCpf,
            parsedCpf[parsedCpf.length - 2],
            parsedCpf[parsedCpf.length - 1]
        ];
    }
}