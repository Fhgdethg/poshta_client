'use client';

import { useState } from 'react';
import {
  Popper,
  Button,
  Fade,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';

import { useShelvesStore } from '@/store/shelvesStore';

import { removeProductByID } from '@/services/products/productsService';
import { addReport } from '@/services/reports/reportsService';

import { getQueryByNameFromUrl } from '@/helpers/locationHelpers';
import { generateReportBody } from '@/helpers/reportHelpers';

import { qSKeys } from '@/constants/qSKeys';
import { basicTheme } from '@/theme/theme';

import { TError } from '@/types/error';
import { removeShelveByID } from '@/services/shelves/shelvesService';

interface IRemoveShelveBtnProps {
  shelveID: number;
  setError: (error: string) => void;
}

const RemoveShelveBtn: React.FC<IRemoveShelveBtnProps> = ({
  shelveID,
  setError,
}) => {
  const { getShelveByIDAction, getAllShelvesAction } = useShelvesStore();

  const [isLoading, setIsLoading] = useState(false);

  const removeShelveHandler = async (popupState: any) => {
    try {
      setIsLoading(true);
      setError('');

      await removeShelveByID(shelveID);

      const shelveSearchVal = getQueryByNameFromUrl(qSKeys.shelveSearch);

      if (shelveSearchVal) getShelveByIDAction(Number(shelveSearchVal));
      else if (!shelveSearchVal) getAllShelvesAction();

      const removeShelveReport = generateReportBody(
        `Remove shelve with id = ${shelveID}`,
      );
      await addReport(removeShelveReport);
    } catch (err: TError) {
      const error = err?.message ? err.message : 'Remove shelve error';

      setError(error);
    } finally {
      popupState.close();
      setIsLoading(false);
    }
  };

  return (
    <PopupState variant='popper' popupId='demo-popup-popper' disableAutoFocus>
      {(popupState) => (
        <div>
          <Button variant='contained' {...bindToggle(popupState)}>
            Remove
            {isLoading && (
              <CircularProgress
                color='secondary'
                sx={{ marginLeft: 1 }}
                size={25}
              />
            )}
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
                    Are you want to remove this shelve?
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
                      onClick={() => removeShelveHandler(popupState)}
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

export default RemoveShelveBtn;
