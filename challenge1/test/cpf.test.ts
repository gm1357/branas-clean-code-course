import { Cpf } from '../src/cpf';

describe('Cpf', () => {
    const validCpfs = [
        '391.013.790-38',
        '947.484.030-04',
        '89936276060'
    ];
    const invalidCpfs = [
        '391.013.791-38'
    ];
    const invalidStrings = [
        '',
        'a',
        '123',
        '123sddadwqdd1d2d',
        'ggggggggggg',
        'abcdefghijklmn',
        '````````'
    ];

    it.each(validCpfs)('should return true to valid cpfs', (validCpf) => {
        const cpf = new Cpf(validCpf);
        expect(cpf.getValue()).toBe(validCpf);
    });
    
    it.each(invalidCpfs)('should return false to invalid cpf', (invalidCpf) => {
        expect(() => new Cpf(invalidCpf)).toThrow();
    });
    
    it.each(invalidStrings)('should return false to invalid strings', (invalidString) => {
        expect(() => new Cpf(invalidString)).toThrow();
    });
});