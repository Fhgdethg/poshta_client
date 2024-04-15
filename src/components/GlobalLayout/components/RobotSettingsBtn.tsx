'use client';

import { Popper, Button, Fade, Paper } from '@mui/material';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';

import RobotSettingsForm from '@/components/GlobalLayout/components/RobotSettingsForm';

import { basicTheme } from '@/theme/theme';

const RobotSettingsBtn = () => {
  return (
    <PopupState variant='popper' popupId='demo-popup-popper'>
      {(popupState) => (
        <div>
          <Button
            variant='contained'
            {...bindToggle(popupState)}
            sx={{
              background: basicTheme.white,
              fontWeight: 700,
              ':hover': {
                background: basicTheme.success,
                color: basicTheme.white,
              },
            }}
          >
            {popupState.isOpen ? 'Close' : 'Robot Settings'}
          </Button>
          <Popper {...bindPopper(popupState)} transition placement='bottom-end'>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper sx={{ marginTop: 1, p: 2, minWidth: 450 }}>
                  <RobotSettingsForm popupState={popupState} />
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
};

export default RobotSettingsBtn;
