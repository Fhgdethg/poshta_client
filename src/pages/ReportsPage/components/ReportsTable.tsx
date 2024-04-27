'use client';

import React, { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CircularProgress, Paper } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid/models/gridRowSelectionModel';
import { GridRowId, GridRowsProp } from '@mui/x-data-grid/models/gridRows';

import { useReportsStore } from '@/store/reportsStore';

import { IReportRow } from '@/types/report';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', maxWidth: 70, display: 'flex' },
  {
    field: 'eventDescription',
    headerName: 'Event Description',
    maxWidth: 800,
    minWidth: 200,
    width: 200,
    display: 'flex',
  },
  {
    field: 'date',
    headerName: 'Date And Time',
    maxWidth: 800,
    minWidth: 200,
    width: 200,
    display: 'flex',
  },
];

interface IReportsTableProps {
  setSelectionRowsIds: (ids: GridRowId[]) => void;
  rows: GridRowsProp<IReportRow>;
}

const ReportsTable: React.FC<IReportsTableProps> = ({
  setSelectionRowsIds,
  rows,
}) => {
  const { getReportsByUserIDAction, isLoading } = useReportsStore();

  const handleSelectionModel = (rowSelectionModel: GridRowSelectionModel) =>
    setSelectionRowsIds(rowSelectionModel);

  useEffect(() => {
    getReportsByUserIDAction();
  }, []);

  return (
    <Paper
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DataGrid
        sx={{
          height: 'calc(76vh - 5px)',
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 15 },
          },
        }}
        pageSizeOptions={[15, 30, 50, 100]}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionModel}
      />
      {isLoading && (
        <CircularProgress
          color='secondary'
          sx={{ position: 'absolute' }}
          size={44}
        />
      )}
    </Paper>
  );
};

export default ReportsTable;
