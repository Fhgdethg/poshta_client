'use client';

import React, { useState } from 'react';
import { Alert, Box, Button } from '@mui/material';
import { useForm, Controller, useFormState } from 'react-hook-form';

import GlobalInput from '@/components/ElementsAndBlocks/GlobalInput';

import { generateReportBody } from '@/helpers/reportHelpers';

import { addReport } from '@/services/reports/reportsService';

import { lSKeys } from '@/constants/lSKeys';

interface IRobotSettingsFormProps {
  popupState: any;
}

interface IRobotForm {
  robotIP: string;
}

const RobotSettingsForm: React.FC<IRobotSettingsFormProps> = ({
  popupState,
}) => {
  const { handleSubmit, control } = useForm<IRobotForm>();
  const { errors } = useFormState({
    control,
  });
  const [isShowSuccess, setIsShowSuccess] = useState(false);

  const currentIP = localStorage.getItem(lSKeys.robotIP);
  const fixedCurrentIP = currentIP || '';

  const onSubmit = async (robotForm: IRobotForm) => {
    const oldIP = localStorage.getItem(lSKeys.robotIP);

    if (oldIP === robotForm.robotIP) return;

    localStorage.setItem(lSKeys.robotIP, robotForm.robotIP);
    setIsShowSuccess(true);

    const setNewRobotIPReport = generateReportBody(`Set new robot IP`);
    await addReport(setNewRobotIPReport);

    setTimeout(() => {
      setIsShowSuccess(false);
    }, 4000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name='robotIP'
        rules={numberRules}
        defaultValue={fixedCurrentIP}
        render={({ field: { onChange, value } }: any) => (
          <GlobalInput
            value={value}
            onChange={onChange}
            required
            label='Robot IP'
            placeholder='000.000.000.000'
            helperText={errors?.robotIP?.message}
            customStyle={{ marginBottom: 1 }}
          />
        )}
      />

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant='contained'
          size='medium'
          type='submit'
          sx={{ minWidth: '100px' }}
        >
          Set new IP
        </Button>
      </Box>

      {isShowSuccess && (
        <Alert sx={{ marginTop: 2 }}>The robot&apos;s IP was updated</Alert>
      )}
    </form>
  );
};

const numberRules = {
  required: {
    value: true,
    message: 'This field is required',
  },
  pattern: {
    value: /\b(?:\d{1,3}\.){3}\d{1,3}\b$/,
    message: 'Data is not correct',
  },
};

export default RobotSettingsForm;
