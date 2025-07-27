const { validateInput } = require('../public/validation.js');
describe('validateInput()', () => {
  test('akzeptiert gültigen Text', () => {
    const result = validateInput('Dies ist ein gültiger Satz.');
    expect(result).toBe('Dies ist ein gültiger Satz.');
  });

  test('wirft Fehler bei leerem String', () => {
    expect(() => validateInput('')).toThrow('Text ist erforderlich.');
  });

  test('wirft Fehler bei nur Leerzeichen', () => {
    expect(() => validateInput('     ')).toThrow('Text ist erforderlich.');
  });

  test('wirft Fehler bei zu kurzem Text', () => {
    expect(() => validateInput('Hi')).toThrow('Text muss mindestens 5 Zeichen lang sein.');
  });

  test('wirft Fehler bei zu langem Text', () => {
    const longText = 'a'.repeat(1001);
    expect(() => validateInput(longText)).toThrow('Text darf maximal 1000 Zeichen lang sein.');
  });
});
