import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

import GlobalLink from '@/components/ElementsAndBlocks/GlobalLink';
import RobotSettingsBtn from '@/components/GlobalLayout/components/RobotSettingsBtn';

import { useAuthStore } from '@/store/authStore';

import { getRandomId } from '@/helpers/mainHelpers';

import { routes } from '@/constants/routes';
import { lSKeys } from '@/constants/lSKeys';
import { basicTheme } from '@/theme/theme';

const Header = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();

  const routeHandler = (path: string) => push(path);

  const logOutHandler = () => {
    localStorage.removeItem(lSKeys.t);
    push(routes.login);
  };

  const isLoginPage = pathname === routes.login;

  return (
    <AppBar position='relative'>
      <Toolbar
        sx={{
          maxWidth: 2200,
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '10px 10px',
        }}
      >
        <Typography
          variant='body1'
          component='div'
          sx={{ flexGrow: 1, fontWeight: 800, fontSize: 30 }}
        >
          STORE
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
                color={
                  pathname === link.path
                    ? basicTheme.success
                    : basicTheme.textColor
                }
              >
                {link.pageName}
              </GlobalLink>
            ))}
          {Boolean(user && !isLoginPage) && (
            <Button
              variant='contained'
              sx={{
                minWidth: 135,
                background: basicTheme.white,
                fontWeight: 700,
                ':hover': {
                  background: basicTheme.success,
                  color: basicTheme.white,
                },
              }}
              onClick={logOutHandler}
            >
              Logout
            </Button>
          )}
          {Boolean(user && !isLoginPage) && <RobotSettingsBtn />}
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
  {
    pageName: 'Reports',
    path: routes.reports,
  },
  {
    pageName: 'Chat',
    path: routes.chat,
  },
];

export default Header;
