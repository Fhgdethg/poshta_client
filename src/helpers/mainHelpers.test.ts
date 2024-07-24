import { it, vi, expect, describe } from 'vitest';

import { getRandomId, objectCleanerByFields } from '@/helpers/mainHelpers';

describe('Main helpers', () => {
  it('getting random id', () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(1);
    vi.spyOn(Number.prototype, 'toString').mockImplementation(function (
      this: number,
      base: number,
    ) {
      if (base === 36) {
        return 'test';
      }
      return Number.prototype.toString.call(this, base);
    });
    vi.spyOn(String.prototype, 'substr').mockImplementation(function (
      this: string,
      start: number,
      length?: number,
    ) {
      if (this === 'test') {
        return 'test';
      }
      return String.prototype.substr.call(this, start, length);
    });

    const firstTestID = getRandomId();
    const secondTestID = getRandomId('secondTestID');

    expect(firstTestID).toBe('id-test');
    expect(secondTestID).toBe('secondTestID-test');
  });

  it('deleting selected fields in object works correctly', () => {
    const testObj = {
      key1: 'key1',
      key2: 'key2',
    };

    const resultTestObj = objectCleanerByFields({ ...testObj }, ['key1']);
    const resultTestObj2 = objectCleanerByFields({ ...testObj }, ['key2']);

    expect(resultTestObj).toEqual({ key2: 'key2' });
    expect(resultTestObj2).toEqual({ key1: 'key1' });
  });
});
