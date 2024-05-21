'use client';

import { Box, Button, Paper } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import React from 'react';

import { basicTheme } from '@/theme/theme';

interface ISmallPaperFormProps {
  val: string;
  setVal: (val: string) => void;
  submitAction: () => void;
  areaPlaceholder?: string;
  btnText?: string;
  styles: { [key: string]: any };
}

const SmallPaperForm: React.FC<ISmallPaperFormProps> = ({
  val,
  setVal,
  submitAction,
  areaPlaceholder = '',
  btnText = '',
  styles = {},
}) => {
  return (
    <Paper sx={{ padding: '25px', width: 'calc(100vw - 80px)', ...styles }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
        <TextareaAutosize
          style={{
            width: '100%',
            fontSize: 16,
            fontWeight: 500,
            padding: 10,
            borderRadius: 5,
            outline: 'none',
            resize: 'none',
            border: `2px solid ${basicTheme.primaryDark}`,
            color: basicTheme.primaryDark,
          }}
          aria-label='empty textarea'
          placeholder={areaPlaceholder || 'Enter'}
          maxRows={5}
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <Button
          variant='contained'
          sx={{
            minWidth: 135,
            background: basicTheme.success,
            border: `1px solid ${basicTheme.success}`,
            color: basicTheme.white,
            fontSize: 16,
            boxShadow: 'none',
            fontWeight: 700,
            ':hover': {
              background: basicTheme.success,
              border: `1px solid ${basicTheme.success}`,
              boxShadow: 'none',
            },
          }}
          onClick={submitAction}
        >
          {btnText || 'SUBMIT'}
        </Button>
      </Box>
    </Paper>
  );
};
export default SmallPaperForm;
