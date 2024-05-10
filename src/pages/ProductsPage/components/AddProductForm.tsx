'use client';

import { useState } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { Box, Button, Alert, CircularProgress } from '@mui/material';
import {
  SubmitHandler,
  useForm,
  Controller,
  useFormState,
} from 'react-hook-form';

import GlobalInput from '@/components/ElementsAndBlocks/GlobalInput';

import { useProductsStore } from '@/store/productsStore';

import {
  addProduct,
  addProductUsingARobot,
} from '@/services/products/productsService';
import { addReport } from '@/services/reports/reportsService';

import { getQueryByNameFromUrl } from '@/helpers/locationHelpers';
import { generateReportBody } from '@/helpers/reportHelpers';

import { qSKeys } from '@/constants/qSKeys';

import { IAddProductReqBody } from '@/services/products/productsTypes';
import { IProduct } from '@/types/product';
import { TError } from '@/types/error';
import { lSKeys } from '@/constants/lSKeys';

interface IAddProductFormProps {
  popupState: any;
}

let source: CancelTokenSource;

const AddProductForm: React.FC<IAddProductFormProps> = ({ popupState }) => {
  const { getProductByIDAction, getAllProductsAction, allProducts } =
    useProductsStore();

  const { handleSubmit, control } = useForm<IAddProductReqBody>();
  const { errors } = useFormState({
    control,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [product, setProduct] = useState<IProduct | null>(null);

  const onSubmit: SubmitHandler<IAddProductReqBody> = async ({
    productID,
    shelveID,
    width,
    height,
    length,
    productTitle,
    productDescription,
    productImgUrl,
  }) => {
    try {
      if (isLoading) return;

      setIsLoading(true);
      setError('');
      setProduct(null);

      const robotIP = localStorage.getItem(lSKeys.robotIP) || '';

      source = axios.CancelToken.source();

      const res = await addProductUsingARobot(robotIP, shelveID, productID, {
        cancelToken: source.token,
      });

      const { data: product } = await addProduct({
        productID,
        shelveID,
        width,
        height,
        length,
        productTitle,
        productDescription,
        productImgUrl,
      });

      setProduct(product);

      const productSearchVal = getQueryByNameFromUrl(qSKeys.productSearch);

      if (product && productSearchVal)
        getProductByIDAction(Number(productSearchVal));
      else if (product && !productSearchVal) getAllProductsAction();

      popupState.close();

      const addProductReport = generateReportBody(
        `Add product with id = ${productID}`,
      );
      await addReport(addProductReport);
    } catch (err: TError) {
      const error = err?.message ? err.message : 'Get product error';

      setError(error);
    } finally {
      setIsLoading(isLoading);
    }
  };

  const submitProductFormBtnHandler = () => {
    if (isLoading) {
      source.cancel('Cancel query');
      setIsLoading(false);
    }
  };

  const maxProductID = allProducts.reduce((maxID, product) => {
    return Math.max(maxID, product.productID);
  }, 0);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name='productID'
        rules={numberRules}
        defaultValue={maxProductID + 1}
        render={({ field: { onChange, value } }: any) => (
          <GlobalInput
            value={value}
            onChange={onChange}
            required
            label='Product id'
            type='number'
            placeholder='0000'
            customStyle={{ marginBottom: 3 }}
            helperText={errors?.productID?.message}
          />
        )}
      />
      <Controller
        control={control}
        name='shelveID'
        rules={numberRules}
        render={({ field: { onChange, value } }: any) => (
          <GlobalInput
            value={value}
            onChange={onChange}
            required
            label='Shelve id'
            type='number'
            placeholder='0000'
            customStyle={{ marginBottom: 3 }}
            helperText={errors?.shelveID?.message}
          />
        )}
      />
      <Controller
        control={control}
        name='width'
        rules={numberRules}
        render={({ field: { onChange, value } }: any) => (
          <GlobalInput
            value={value}
            onChange={onChange}
            required
            label='Product Width'
            type='number'
            placeholder='00'
            customStyle={{ marginBottom: 3 }}
            helperText={errors?.width?.message}
          />
        )}
      />
      <Controller
        control={control}
        name='height'
        rules={numberRules}
        render={({ field: { onChange, value } }: any) => (
          <GlobalInput
            value={value}
            onChange={onChange}
            required
            label='Product Height'
            type='number'
            placeholder='00'
            customStyle={{ marginBottom: 3 }}
            helperText={errors?.height?.message}
          />
        )}
      />
      <Controller
        control={control}
        name='length'
        rules={numberRules}
        render={({ field: { onChange, value } }: any) => (
          <GlobalInput
            value={value}
            onChange={onChange}
            required
            label='Product Length'
            type='number'
            placeholder='00'
            customStyle={{ marginBottom: 3 }}
            helperText={errors?.length?.message}
          />
        )}
      />
      <Controller
        control={control}
        name='productTitle'
        render={({ field: { onChange, value } }: any) => (
          <GlobalInput
            value={value}
            onChange={onChange}
            label='Product Title'
            placeholder='Title'
            customStyle={{ marginBottom: 3 }}
            helperText={errors?.productTitle?.message}
          />
        )}
      />
      <Controller
        control={control}
        name='productDescription'
        render={({ field: { onChange, value } }: any) => (
          <GlobalInput
            value={value}
            onChange={onChange}
            label='Product Description'
            placeholder='Description'
            customStyle={{ marginBottom: 3 }}
            helperText={errors?.productDescription?.message}
          />
        )}
      />
      <Controller
        control={control}
        name='productImgUrl'
        render={({ field: { onChange, value } }: any) => (
          <GlobalInput
            value={value}
            onChange={onChange}
            label='Product Image Url'
            placeholder='Image Url'
            customStyle={{ marginBottom: 3 }}
            helperText={errors?.productImgUrl?.message}
          />
        )}
      />

      {!isLoading && error && (
        <Alert severity='error' sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant='contained'
          size='medium'
          type='submit'
          sx={{ minWidth: '100px' }}
          onClick={submitProductFormBtnHandler}
        >
          {isLoading ? 'Cancel' : 'Add'}
          {isLoading && (
            <CircularProgress
              color='secondary'
              sx={{ marginLeft: 1 }}
              size={25}
            />
          )}
        </Button>
      </Box>
    </form>
  );
};

const numberRules = {
  required: {
    value: true,
    message: 'This field is required',
  },
  pattern: {
    value: /^\d+$/,
    message: 'Data is not correct',
  },
};

export default AddProductForm;
