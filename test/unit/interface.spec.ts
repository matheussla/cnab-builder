import { ICompany } from '../../src/interfaces';

describe('Interface', () => {
  const isICompany = (obj: any): obj is ICompany => {
    return (
      typeof obj.name === 'string' &&
      typeof obj.address === 'string' &&
      typeof obj.position === 'number' &&
      typeof obj.segment === 'string'
    );
  };

  test('should return true for a valid ICompany object', () => {
    const company: ICompany = {
      name: 'Test Company',
      address: '123 Test St',
      position: 1,
      segment: 'A',
    };

    expect(isICompany(company)).toBe(true);
  });

  test('should return false for an invalid ICompany object', () => {
    const invalidCompany = {
      name: 'Test Company',
      address: '123 Test St',
      position: 'one', // Invalid: position should be a number
      segment: 'A',
    };

    expect(isICompany(invalidCompany)).toBe(false);
  });

  test('should return false for a partially defined ICompany object', () => {
    const partialCompany = {
      name: 'Test Company',
      address: '123 Test St',
    };

    expect(isICompany(partialCompany)).toBe(false);
  });
});
