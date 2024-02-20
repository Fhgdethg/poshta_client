'use client';

import React, { ReactNode } from 'react';
import { Link } from '@mui/material';

import { basicTheme } from '@/theme/theme';

interface IGlobalLinkProps {
  children: ReactNode;
  linkHandler: () => void;
  color: string;
}

const GlobalLink: React.FC<IGlobalLinkProps> = ({
  children,
  linkHandler,
  color,
}) => {
  return (
    <Link
      component='button'
      sx={{
        cursor: 'pointer',
        transition: '.5',
        '&:hover': {
          transform: 'scale(1.06)',
        },
        color,
        fontWeight: 700,
      }}
      variant='body1'
      underline='none'
      color={basicTheme.textColor}
      onClick={linkHandler}
    >
      {children}
    </Link>
  );
};

export default GlobalLink;
