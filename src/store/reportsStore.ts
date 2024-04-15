import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { getReportsByUserId } from '@/services/reports/reportsService';

import { TError } from '@/types/error';
import { IReport } from '@/types/report';

export interface IReportsState {
  isLoading: boolean;
  error: string;
  reports: IReport[];
  getReportsByUserIDAction: () => Promise<void>;
}

export const useReportsStore = create<IReportsState>()(
  immer((set, get) => ({
    isLoading: false,
    error: '',
    reports: [],
    getReportsByUserIDAction: async () => {
      try {
        set({ isLoading: true, error: '' });

        const { data } = await getReportsByUserId();

        set({ reports: data });
      } catch (err: TError) {
        const error = err?.message ? err.message : 'Get reports error';

        set({ error });
      } finally {
        set({ isLoading: false });
      }
    },
  })),
);
