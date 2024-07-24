import { describe, expect, it, vi } from 'vitest';
import {
  addReport,
  getReportsByUserId,
} from '@/services/reports/reportsService';
import { objectCleanerByFields } from '@/helpers/mainHelpers';

function reportCreatingDataCreator() {
  return {
    _id: '44e534a0-477c-40fd-972e-a27f8aebbeb9',
    reportID: 1,
    eventDescription: 'Set new robot IP',
    date: '15.07.2024 12:20:48',
    userInitiatorID: 'c511a5e2-3b0d-4ac0-b479-00a7d797ceb1',
  };
}

function reportsGettingDataCreator() {
  return [
    {
      _id: '44e534a0-477c-40fd-972e-a27f8aebbeb9',
      reportID: 1,
      eventDescription: 'Set new robot IP',
      date: '15.07.2024 12:20:48',
      userInitiatorID: 'c511a5e2-3b0d-4ac0-b479-00a7d797ceb1',
    },
    {
      _id: '5e87fb5c-40f4-4315-8c6d-a8940d7ae796',
      reportID: 2,
      eventDescription: 'Set new robot IP',
      date: '15.07.2024 12:20:50',
      userInitiatorID: 'c511a5e2-3b0d-4ac0-b479-00a7d797ceb1',
    },
  ];
}

vi.mock('@/queries/clQueries/clQueries', () => {
  const reportCreatingData = reportCreatingDataCreator();
  const reportGettingData = reportsGettingDataCreator();

  return {
    clAPI: {
      post: vi.fn().mockResolvedValue({
        data: reportCreatingData,
      }),
      get: vi.fn().mockResolvedValue({
        data: reportGettingData,
      }),
    },
  };
});

describe('Reports', () => {
  it('creating endpoint worked', async () => {
    const reportCreatingData = reportCreatingDataCreator();
    const reqBody: any = objectCleanerByFields({ ...reportCreatingData }, [
      '_id',
      'userInitiatorID',
    ]);
    const { data } = await addReport(reqBody);

    expect(data).toEqual(reportCreatingData);
  });

  it('getting endpoint worked', async () => {
    const { data } = await getReportsByUserId();
    const reportGettingData = reportsGettingDataCreator();

    expect(data).toEqual(reportGettingData);
  });
});
