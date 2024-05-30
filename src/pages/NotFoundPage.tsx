'use client';

import { Typography } from '@mui/material';
import { basicTheme } from '@/theme/theme';

const NotFoundPage = () => {
  return (
    <Typography
      variant='body1'
      sx={{
        width: '100%',
        textAlign: 'center',
        marginTop: '40vh',
        fontSize: 50,
        color: basicTheme.error,
      }}
    >
      Error 404
    </Typography>
  );
};

export default NotFoundPage;
