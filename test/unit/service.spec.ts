import { SearchService } from '../../src/services/searchService';

describe('SearchService', () => {
  let service;

  beforeEach(() => {
    service = new SearchService();
  });

  describe('searchBySegment', () => {
    test('should return an empty array if no lines match the given segment', () => {
      const lines = [
        '1234567890123 ASome Segment1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678Address One                       ',
        '1234567890123 BAnother Segment1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678Address Two                       ',
      ];
      const segment = 'Nonexistent Segment';
      const result = service.searchBySegment(lines, segment);

      expect(result).toEqual([]);
    });
  });

  describe('searchByCompanyName', () => {
    test('should return an empty array if no lines match the given company name', () => {
      const lines = [
        '1234567890123 ASome Segment1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678Address One                       ',
        '1234567890123 BAnother Segment1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678Address Two                       ',
      ];
      const companyName = 'Nonexistent Company';
      const result = service.searchByCompanyName(lines, companyName);

      expect(result).toEqual([]);
    });
  });
});
