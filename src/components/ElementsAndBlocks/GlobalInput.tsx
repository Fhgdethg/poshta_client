'use client';

import React, { ChangeEvent } from 'react';
import { TextField, TextFieldVariants } from '@mui/material';
import { IStyleProp } from '@/types/styleProp';

interface IGlobalInputProps {
  required?: boolean;
  id?: string;
  label?: string;
  defaultValue?: string;
  variant?: TextFieldVariants;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  customStyle?: IStyleProp;
  helperText?: string | undefined;
}

const GlobalInput: React.FC<IGlobalInputProps> = ({
  required = false,
  id = 'standard-required',
  label = '',
  defaultValue = '',
  variant = 'standard',
  value,
  onChange,
  placeholder = '',
  type = 'text',
  customStyle = {},
  helperText = '',
}) => {
  return (
    <TextField
      sx={{
        width: '100%',
        display: 'block',
        ...customStyle,
      }}
      {...{
        required,
        id,
        label,
        defaultValue,
        variant,
        value,
        onChange,
        placeholder,
        type,
        helperText,
        fullWidth: true,
      }}
    />
  );
};

export default GlobalInput;
