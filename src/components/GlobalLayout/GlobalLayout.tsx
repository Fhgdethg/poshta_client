'use client';

import React, { ReactNode } from 'react';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { CssBaseline, ThemeProvider, Container, Box } from '@mui/material';

import Header from '@/components/GlobalLayout/components/Header';

import { basicTheme, theme } from '@/theme/theme';

interface IMainLayoutProps {
  font: NextFontWithVariable;
  children: ReactNode;
}

const GlobalLayout: React.FC<IMainLayoutProps> = ({ font, children }) => {
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
