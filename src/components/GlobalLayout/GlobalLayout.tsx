'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { useRouter, usePathname } from 'next/navigation';
import { CssBaseline, ThemeProvider, Container, Box } from '@mui/material';

import Header from '@/components/GlobalLayout/components/Header';

import { useAuthStore } from '@/store/authStore';

import { basicTheme, theme } from '@/theme/theme';
import { routes } from '@/constants/routes';
import { lSKeys } from '@/constants/lSKeys';

interface IMainLayoutProps {
  font: NextFontWithVariable;
  children: ReactNode;
}

const GlobalLayout: React.FC<IMainLayoutProps> = ({ font, children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { authAction } = useAuthStore();

  const [isFirstRender, setIsFirstRender] = useState(true);

  const checkAuthHandler = async () => {
    const user = await authAction();

    if (!user) {
      router.push(routes.login);
      localStorage.removeItem(lSKeys.t);
    }
  };

  const isLoginPage = pathname !== routes.login;

  useEffect(() => {
    if (isFirstRender && isLoginPage) {
      checkAuthHandler();
      setIsFirstRender(false);
    }

    if (isLoginPage) {
      const checkAuthInterval = setInterval(async () => {
        await checkAuthHandler();
      }, 10000);

      return () => {
        clearInterval(checkAuthInterval);
      };
    }
  }, [pathname]);

  return (
    <html lang='en'>
      <body className={font.variable}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <main>
            <Box
              sx={{
                height: 'calc(100vh - 64px)',
                background: basicTheme.mainBg,
              }}
            >
              <Container
                style={{ maxWidth: 2000, flex: 1 }}
                sx={{
                  paddingTop: 4,
                  flex: 1,
                  height: '100%',
                  paddingBottom: 4,
                }}
              >
                {children}
              </Container>
            </Box>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default GlobalLayout;
