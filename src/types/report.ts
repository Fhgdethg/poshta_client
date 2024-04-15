import { GridRowId } from '@mui/x-data-grid/models/gridRows';

export interface IReportRow {
  id: GridRowId;
  eventDescription: string;
  date: string;
}

export interface IReport {
  _id?: string;
  reportID: number;
  eventDescription: string;
  date: string;
  userInitiatorID: string;
  __v?: number;
}
