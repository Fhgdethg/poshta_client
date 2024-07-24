import { it, expect } from 'vitest';
import { generateReportBody, getReportDate } from '@/helpers/reportHelpers';

it('generating report body', () => {
  const testBody = {
    eventDescription: 'Test report',
    reportID: 1,
    date: getReportDate(),
  };

  const generatedReportBody = generateReportBody('Test report', 1);

  expect(generatedReportBody).toEqual(testBody);
});
