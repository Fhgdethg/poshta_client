'use client';

import { Popper, Button, Fade, Paper } from '@mui/material';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';

import AddProductForm from '@/pages/ProductsPage/components/AddProductForm';

const AddProductBtn = () => {
  return (
    <PopupState variant='popper' popupId='demo-popup-popper'>
      {(popupState) => (
        <div>
          <Button
            variant='contained'
            {...bindToggle(popupState)}
            sx={{
              minWidth: 135,
              '@media screen and (max-width: 900px)': {
                margin: '-40px 0 20px 0',
              },
            }}
          >
            {popupState.isOpen ? 'Close' : 'Add Product'}
          </Button>
          <Popper {...bindPopper(popupState)} transition placement='bottom-end'>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper sx={{ marginTop: 1, p: 2, minWidth: 450 }}>
                  <AddProductForm popupState={popupState} />
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
};

export default AddProductBtn;
