import { validate } from '../src/cpf';

test('should return true to valid cpfs', () => {
    let validCpf = '391.013.790-38';
    expect(validate(validCpf)).toBe(true);
    validCpf = '947.484.030-04';
    expect(validate(validCpf)).toBe(true);
    validCpf = '89936276060';
    expect(validate(validCpf)).toBe(true);
});

test('should return false to invalid cpf', () => {
    const invalidCpf = '391.013.791-38';
    expect(validate(invalidCpf)).toBe(false);
});

test('should return false to null cpf', () => {
    expect(validate(null)).toBe(false);
});

test('should return false to undefined cpf', () => {
    expect(validate(undefined)).toBe(false);
});

test('should return false to invalid strings', () => {
    expect(validate('')).toBe(false);
    expect(validate('a')).toBe(false);
    expect(validate('123')).toBe(false);
    expect(validate('123sddadwqdd1d2d')).toBe(false);
    expect(validate('ggggggggggg')).toBe(false);
    expect(validate('abcdefghijklmn')).toBe(false);
    expect(validate('````````')).toBe(false);
});