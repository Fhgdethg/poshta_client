import { clAPI } from '@/queries/clQueries/clQueries';

import { clQKeys } from '@/queries/clQueries/clQKeys';

import { IAddReportReqBody } from '@/services/reports/reportssTypes';
import { IReport } from '@/types/report';

export const addReport = (addReportBody: IAddReportReqBody) =>
  clAPI.post<IReport>(clQKeys.reports, addReportBody);

export const getReportsByUserId = () =>
  clAPI.get<IReport[]>(`${clQKeys.reports}${clQKeys.byUserID}`);

export const deleteReportsByIds = (IDs: string) => {
  console.log(IDs);
  return clAPI.delete<IReport>(`${clQKeys.reports}${clQKeys.byIDs}`, {
    params: {
      ids: IDs,
    },
  });
};

export const deleteAllReports = () => clAPI.delete<IReport>(clQKeys.reports);
