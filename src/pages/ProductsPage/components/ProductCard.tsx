'use client';

import React, { useEffect, useState } from 'react';
import axios, { CancelTokenSource } from 'axios';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import RemoveProductBtn from '@/pages/ProductsPage/components/RemoveProductBtn';

import { getProductUsingARobot } from '@/services/products/productsService';
import { addReport } from '@/services/reports/reportsService';

import { generateReportBody } from '@/helpers/reportHelpers';

import { lSKeys } from '@/constants/lSKeys';

import { IGetProductUsingARobotResBody } from '@/services/products/productsTypes';
import { TError } from '@/types/error';
import { IDimensions } from '@/types/sizeAndCoordinates';

interface IShelveCardProps {
  productID: number;
  shelveID: number;
  productDimensions: IDimensions;
  productTitle?: string;
  productDescription?: string;
  productImgUrl?: string;
  isOneRemovePopupOpened: boolean;
  setIsOneRemovePopupOpened: (isOneRemovePopupOpened: boolean) => void;
}

let source: CancelTokenSource;

const ProductCard: React.FC<IShelveCardProps> = ({
  productID,
  shelveID,
  productDimensions,
  productTitle,
  productDescription,
  productImgUrl,
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
      const robotIP = localStorage.getItem(lSKeys.robotIP);

      if (!robotIP) {
        setError('Robot was not found');
        return;
      }

      setIsLoading(true);

      source = axios.CancelToken.source();

      const { data } = await getProductUsingARobot(productID, robotIP, {
        cancelToken: source.token,
      });

      setProduct(data);

      const getProductWithRobotReport = generateReportBody(
        `Get product with id = ${productID} using a robot`,
      );
      await addReport(getProductWithRobotReport);
    } catch (err: TError) {
      const error = err?.message ? err.message : 'Robot error';

      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelGettingProductUsingARobot = () => {
    source.cancel('Cancel query');
    setIsLoading(false);
  };

  const productRobotHandler = () => {
    if (!isLoading) {
      getProductUsingARobotHandler(productID);
      return;
    }
    cancelGettingProductUsingARobot();
  };

  const isSuccess = Boolean(!isLoading && product?.productID && !error.length);

  const [isShowSuccess, setIsShowSuccess] = useState(false);

  const isDescriptionEmpty = Boolean(
    !productTitle && !productDescription && !productImgUrl,
  );

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
        {!isDescriptionEmpty && (
          <Accordion
            sx={{ boxShadow: 'none', paddingLeft: 0, paddingBottom: 0 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1-content'
              id='panel1-header'
              sx={{
                padding: 0,
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              More information
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0, paddingBottom: 3 }}>
              {productTitle && (
                <Typography component='h4' variant='h4'>
                  {productTitle}
                </Typography>
              )}
              {productDescription && (
                <Typography component='p' variant='body1'>
                  {productDescription}
                </Typography>
              )}
              {productImgUrl && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={`https://drive.google.com/thumbnail?id=${productImgUrl}`}
                  alt={productTitle || 'product image'}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 3,
                    marginTop: 5,
                  }}
                />
              )}
            </AccordionDetails>
          </Accordion>
        )}
        <Box sx={{ marginTop: 1 }}>
          <Typography component='h4' variant='h4'>
            Product dimensions:
          </Typography>
          <Typography component='p' variant='body1'>
            width: {productDimensions?.width} sm;
            <br />
            length: {productDimensions?.length} sm;
            <br />
            height: {productDimensions?.height} sm;
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
              setError,
            }}
          />
          <Button
            variant='contained'
            size='medium'
            onClick={productRobotHandler}
          >
            {isLoading ? 'Cancel' : 'Get'}
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
