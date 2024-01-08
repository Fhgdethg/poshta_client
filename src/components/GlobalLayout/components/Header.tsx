import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import GlobalLink from '@/components/ElementsAndBlocks/GlobalLink';

import { getRandomId } from '@/helpers/mainHelpers';

import { routes } from '@/constants/routes';

const Header = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  const routeHandler = (path: string) => push(path);

  const isLoginPage = pathname === routes.login;

  return (
    <AppBar position='relative'>
      <Toolbar sx={{ maxWidth: 2200, margin: '0 auto', width: '100%' }}>
        <Typography
          variant='body1'
          component='div'
          sx={{ flexGrow: 1, fontWeight: 800, fontSize: 30 }}
        >
          POSHTA
        </Typography>
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 3 }}
          component='nav'
        >
          {!isLoginPage &&
            navLinks.map((link) => (
              <GlobalLink
                linkHandler={() => routeHandler(link.path)}
                key={getRandomId()}
              >
                {link.pageName}
              </GlobalLink>
            ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const navLinks = [
  {
    pageName: 'Shelves',
    path: routes.root,
  },
  {
    pageName: 'Products',
    path: routes.products,
  },
];

export default Header;
