'use client';

import { Popper, Button, Fade, Paper } from '@mui/material';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';

import AddShelveForm from '@/pages/ShelvesPage/components/AddShelveForm';

const AddShelveBtn = () => {
  return (
    <PopupState variant='popper' popupId='demo-popup-popper'>
      {(popupState) => (
        <div>
          <Button
            variant='contained'
            {...bindToggle(popupState)}
            sx={{ minWidth: 135 }}
          >
            {popupState.isOpen ? 'Close' : 'Add Shelve'}
          </Button>
          <Popper {...bindPopper(popupState)} transition placement='bottom-end'>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper sx={{ marginTop: 1, p: 2, minWidth: 450 }}>
                  <AddShelveForm popupState={popupState} />
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
};

export default AddShelveBtn;
