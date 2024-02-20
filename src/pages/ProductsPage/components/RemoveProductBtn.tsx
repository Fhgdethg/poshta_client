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

import { useProductsStore } from '@/store/productsStore';

import { removeProductByID } from '@/services/products/productsService';

import { getQueryByNameFromUrl } from '@/helpers/locationHelpers';

import { qSKeys } from '@/constants/qSKeys';
import { basicTheme } from '@/theme/theme';

import { TError } from '@/types/error';

interface IRemoveProductBtnProps {
  isOneRemovePopupOpened: boolean;
  setIsOneRemovePopupOpened: (isOneRemovePopupOpened: boolean) => void;
  productID: number;
  setError: (error: string) => void;
}

const RemoveProductBtn: React.FC<IRemoveProductBtnProps> = ({
  isOneRemovePopupOpened,
  setIsOneRemovePopupOpened,
  productID,
  setError,
}) => {
  const { getProductByIDAction, getAllProductsAction } = useProductsStore();

  const [isLoading, setIsLoading] = useState(false);

  const removeProductHandler = async (popupState: any) => {
    try {
      setIsLoading(true);
      setError('');

      const { data: product } = await removeProductByID(productID);

      const productSearchVal = getQueryByNameFromUrl(qSKeys.productSearch);

      if (product && productSearchVal)
        getProductByIDAction(Number(productSearchVal));
      else if (product && !productSearchVal) getAllProductsAction();
    } catch (err: TError) {
      const error = err?.message ? err.message : 'Remove product error';

      setError(error);
    } finally {
      popupState.close();
      setIsOneRemovePopupOpened(false);
      setIsLoading(false);
    }
  };

  return (
    <PopupState variant='popper' popupId='demo-popup-popper' disableAutoFocus>
      {(popupState) => (
        <div>
          <Button
            variant='contained'
            disabled={isOneRemovePopupOpened}
            {...bindToggle(popupState)}
          >
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
            {({ TransitionProps }) => {
              setIsOneRemovePopupOpened(popupState.isOpen);

              return (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper
                    sx={{ marginTop: 1, marginBottom: 1, p: 2, minWidth: 450 }}
                  >
                    <Typography
                      component='h4'
                      variant='h4'
                      color={basicTheme.warning}
                    >
                      Are you want to remove this product?
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
                        onClick={() => removeProductHandler(popupState)}
                      >
                        Yes
                      </Button>
                    </Box>
                  </Paper>
                </Fade>
              );
            }}
          </Popper>
        </div>
      )}
    </PopupState>
  );
};

export default RemoveProductBtn;
