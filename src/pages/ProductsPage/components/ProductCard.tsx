'use client';

import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';

import RemoveProductBtn from '@/pages/ProductsPage/components/RemoveProductBtn';

import { getProductUsingARobot } from '@/services/products/productsService';

import { IGetProductUsingARobotResBody } from '@/services/products/productsTypes';
import { TError } from '@/types/error';
import { IDimensions } from '@/types/sizeAndCoordinates';

interface IShelveCardProps {
  productID: number;
  shelveID: number;
  productDimensions: IDimensions;
  isOneRemovePopupOpened: boolean;
  setIsOneRemovePopupOpened: (isOneRemovePopupOpened: boolean) => void;
}

const ProductCard: React.FC<IShelveCardProps> = ({
  productID,
  shelveID,
  productDimensions,
  isOneRemovePopupOpened,
  setIsOneRemovePopupOpened,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<IGetProductUsingARobotResBody | null>(
    null,
  );
  const [error, setError] = useState('');

  const getProductUsingARobotHandler = async (productID: number) => {
    try {
      setIsLoading(true);
      const { data } = await getProductUsingARobot(productID);

      setProduct(data);
    } catch (err: TError) {
      const error = err?.message ? err.message : 'Robot error';

      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isSuccess = Boolean(!isLoading && product?.productID && !error.length);

  const [isShowSuccess, setIsShowSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setIsShowSuccess(true);
      setTimeout(() => {
        setIsShowSuccess(false);
      }, 1000);
    }
  }, [isSuccess]);

  return (
    <Card key={shelveID}>
      <CardContent>
        <Typography component='h3' variant='h3'>
          Product id: {productID}
        </Typography>
        <Typography component='h3' variant='h3'>
          Shelve id: {shelveID}
        </Typography>
        <Box sx={{ marginTop: 3 }}>
          <Typography component='h4' variant='h4'>
            Product dimensions:
          </Typography>
          <Typography component='p' variant='body1'>
            width: {productDimensions.width};<br />
            length: {productDimensions.length};<br />
            height: {productDimensions.height};
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 2,
            gap: 2,
          }}
        >
          <RemoveProductBtn
            {...{
              isOneRemovePopupOpened,
              setIsOneRemovePopupOpened,
              productID,
            }}
          />
          <Button
            variant='contained'
            size='medium'
            onClick={() => getProductUsingARobotHandler(productID)}
          >
            Get
            {isLoading && (
              <CircularProgress
                color='secondary'
                sx={{ marginLeft: 1 }}
                size={25}
              />
            )}
          </Button>
        </Box>
        {error && (
          <Alert sx={{ marginTop: 2 }} severity='error'>
            {error}
          </Alert>
        )}
        {isShowSuccess && (
          <Alert sx={{ marginTop: 2 }}>{product?.message}</Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
