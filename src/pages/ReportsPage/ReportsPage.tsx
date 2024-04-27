'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import ReportsTable from '@/pages/ReportsPage/components/ReportsTable';
import { GridRowId } from '@mui/x-data-grid/models/gridRows';

import { useReportsStore } from '@/store/reportsStore';

import { deleteReportsByIds } from '@/services/reports/reportsService';

import { TError } from '@/types/error';

const ReportsPage = () => {
  const { reports, isLoading, error, getReportsByUserIDAction } =
    useReportsStore();

  const [successMsg, setSuccessMsg] = useState('');

  const modifyReports = useMemo(
    () =>
      reports.map(({ eventDescription, date, reportID }, index) => ({
        id: index + 1,
        eventDescription,
        date,
        reportID,
      })),
    [reports],
  );

  const [selectionRowsIDs, setSelectionRowsIDs] = useState<GridRowId[]>([]);

  const getSelectedReportsIDs = useCallback(() => {
    const selectedReportsIDs: number[] = [];

    selectionRowsIDs.forEach((selectedID) => {
      const selectedReport = modifyReports.find(
        (report) => report.id === selectedID,
      );
      if (selectedReport) selectedReportsIDs.push(selectedReport.reportID);
    });

    return selectedReportsIDs.join('|');
  }, [selectionRowsIDs, modifyReports]);

  const isError = useMemo(
    () => Boolean(!isLoading && error),
    [isLoading, error],
  );
  const isSuccessMsg = useMemo(
    () => Boolean(!isLoading && successMsg),
    [isLoading, successMsg],
  );

  const deleteSelectedReports = async () => {
    try {
      const selectedReportsIDs = getSelectedReportsIDs();

      useReportsStore.setState({ isLoading: true });

      await deleteReportsByIds(selectedReportsIDs);
      await getReportsByUserIDAction();

      if (error) return;

      setSuccessMsg('Selected reports was successfully deleted');

      setTimeout(() => {
        setSuccessMsg('');
      }, 4000);
    } catch (err: TError) {
      const error = err?.message ? err.message : 'Deleting reports error';

      useReportsStore.setState({ error });
    } finally {
      useReportsStore.setState({ isLoading: false });
    }
  };

  return (
    <Box>
      <Box
        sx={{
          marginBottom: 5,
          marginTop: 5,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 2,
          height: 36,
        }}
      >
        {isError && <Alert severity='error'>{error}</Alert>}
        {isSuccessMsg && <Alert severity='success'>{successMsg}</Alert>}

        <Button
          variant='contained'
          size='medium'
          onClick={deleteSelectedReports}
          disabled={isLoading || !selectionRowsIDs.length}
        >
          Delete Selected Reports
          {isLoading && (
            <CircularProgress
              color='secondary'
              sx={{ marginLeft: 1 }}
              size={25}
            />
          )}
        </Button>
      </Box>
      <ReportsTable
        setSelectionRowsIds={setSelectionRowsIDs}
        rows={modifyReports}
      />
    </Box>
  );
};

export default ReportsPage;
