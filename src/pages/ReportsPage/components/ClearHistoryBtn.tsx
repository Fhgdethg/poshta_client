'use client';

import React from 'react';
import { Popper, Button, Fade, Paper, Typography, Box } from '@mui/material';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';

import { useReportsStore } from '@/store/reportsStore';

import { deleteAllReports } from '@/services/reports/reportsService';

import { basicTheme } from '@/theme/theme';

import { TError } from '@/types/error';
import { IReport } from '@/types/report';

interface IClearHistoryBtnProps {
  setSuccessMsg: (successMsg: string) => void;
  reports: IReport[];
}

const ClearHistoryBtn: React.FC<IClearHistoryBtnProps> = ({
  setSuccessMsg,
  reports,
}) => {
  const { isLoading, error, getReportsByUserIDAction } = useReportsStore();

  const clearHistoryHandler = async (popupState: any) => {
    try {
      useReportsStore.setState({ isLoading: true });

      await deleteAllReports();
      await getReportsByUserIDAction();

      popupState.close();

      if (error) return;

      setSuccessMsg('History was successfully cleared');

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

  const isDisabled = isLoading || !reports.length;

  return (
    <PopupState variant='popper' popupId='demo-popup-popper' disableAutoFocus>
      {(popupState) => (
        <div>
          <Button
            variant='contained'
            disabled={isDisabled}
            {...bindToggle(popupState)}
          >
            Clear history
          </Button>
          <Popper {...bindPopper(popupState)} transition placement='bottom-end'>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper
                  sx={{ marginTop: 1, marginBottom: 1, p: 2, minWidth: 450 }}
                >
                  <Typography
                    component='h4'
                    variant='h4'
                    color={basicTheme.warning}
                  >
                    Are you want to clear history?
                  </Typography>
                  <Box sx={{ marginTop: 2, display: 'flex', gap: 2 }}>
                    <Button
                      sx={{ color: basicTheme.success }}
                      onClick={() => popupState.close()}
                    >
                      No
                    </Button>
                    <Button
                      sx={{ color: basicTheme.error }}
                      onClick={() => clearHistoryHandler(popupState)}
                    >
                      Yes
                    </Button>
                  </Box>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
};

export default ClearHistoryBtn;
