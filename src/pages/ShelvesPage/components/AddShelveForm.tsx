'use client';

import { useState } from 'react';
import { Box, Button, Alert, CircularProgress } from '@mui/material';
import {
  SubmitHandler,
  useForm,
  Controller,
  useFormState,
} from 'react-hook-form';

import GlobalInput from '@/components/ElementsAndBlocks/GlobalInput';

import { useShelvesStore } from '@/store/shelvesStore';

import { addShelve } from '@/services/shelves/shelvesService';

import { getQueryByNameFromUrl } from '@/helpers/locationHelpers';

import { qSKeys } from '@/constants/qSKeys';

import { IAddProductReqBody } from '@/services/products/productsTypes';
import { IShelve } from '@/types/shelve';
import { TError } from '@/types/error';

interface IAddShelveFormProps {
  popupState: any;
}

const AddShelveForm: React.FC<IAddShelveFormProps> = ({ popupState }) => {
  const { getAllShelvesAction, getShelveByIDAction, allShelves } =
    useShelvesStore();

  const { handleSubmit, control } = useForm<IAddProductReqBody>();
  const { errors } = useFormState({
    control,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shelve, setShelve] = useState<IShelve | null>(null);

  const onSubmit: SubmitHandler<IAddProductReqBody> = async ({
    shelveID,
    width,
    height,
    length,
    maxShelvesCount,
  }) => {
    try {
      setIsLoading(true);
      setError('');
      setShelve(null);

      const { data: shelve } = await addShelve({
        shelveID,
        width,
        height,
        length,
        maxShelvesCount,
      });

      setShelve(shelve);

      const shelveSearchVal = getQueryByNameFromUrl(qSKeys.shelveSearch);

      if (shelve && shelveSearchVal)
        getShelveByIDAction(Number(shelveSearchVal));
      else if (shelve && !shelveSearchVal) getAllShelvesAction();

      popupState.close();
    } catch (err: TError) {
      const error = err?.message ? err.message : 'Get shelve error';

      setError(error);
    } finally {
      setIsLoading(isLoading);
    }
  };

  const maxShelveID = allShelves.reduce((maxID, shelve) => {
    return Math.max(maxID, shelve.shelveID);
  }, 0);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name='shelveID'
        rules={numberRules}
        defaultValue={maxShelveID + 1}
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
            label='Shelve Width'
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
            label='Shelve Height'
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
            label='Shelve Length'
            type='number'
            placeholder='00'
            customStyle={{ marginBottom: 3 }}
            helperText={errors?.length?.message}
          />
        )}
      />
      <Controller
        control={control}
        name='maxShelvesCount'
        defaultValue={allShelves?.length + 1}
        rules={numberRules}
        render={({ field: { onChange, value } }: any) => (
          <GlobalInput
            value={value}
            onChange={onChange}
            required
            label='New shelves count'
            type='number'
            placeholder='0000'
            customStyle={{ marginBottom: 3 }}
            helperText={errors?.mawShelvesCount?.message}
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
        >
          Add
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

export default AddShelveForm;
