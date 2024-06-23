import { sliceArrayPosition } from '../../src/helper';

describe('sliceArrayPosition', () => {
  test('should return a sliced array with given start and end positions', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = sliceArrayPosition(arr, 1, 3);
    expect(result).toEqual([2, 3]);
  });

  test('should return a sliced array from the start position to the end if end is not provided', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = sliceArrayPosition(arr, 2);
    expect(result).toEqual([3, 4, 5]);
  });
});
