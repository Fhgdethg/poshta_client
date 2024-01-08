import { createTheme } from '@mui/material';

export const basicTheme = {
  white: '#FFF',
  primary: '#dedede',
  primaryDark: '#a2a2a2',
  secondaryLight: '#ffeee5',
  secondaryMain: '#f38c59',
  secondaryDark: '#cd6735',

  success: '#69ca95',
  warning: '#ffd014',
  error: '#f5775e',
  //
  textColor: '#413f3f',
  mainBg: '#fcfcff',
};

export const theme = createTheme({
  palette: {
    primary: {
      light: basicTheme.white,
      main: basicTheme.primary,
      dark: basicTheme.primaryDark,
    },
    secondary: {
      light: basicTheme.secondaryLight,
      main: basicTheme.secondaryMain,
      dark: basicTheme.secondaryDark,
    },
    error: {
      light: '#f19d8f',
      main: basicTheme.error,
      dark: '#854234',
    },
    warning: {
      light: '#fdd94c',
      main: basicTheme.warning,
      dark: '#bb940f',
    },
    info: {
      light: '#8aedee',
      main: '#45f2f3',
      dark: '#36b3b4',
    },
    success: {
      light: '#87c5a2',
      main: basicTheme.success,
      dark: '#43805c',
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'var(--var-open-sans)',
      color: basicTheme.textColor,
    },
    h1: {
      fontSize: 38,
      fontWeight: 700,
    },
    h2: {
      fontSize: 32,
      fontWeight: 700,
    },
    h3: {
      fontSize: 26,
      fontWeight: 700,
    },
    h4: {
      fontSize: 20,
      fontWeight: 700,
    },
    body1: {
      fontSize: 16,
      fontWeight: 500,
    },
    body2: {
      fontSize: 16,
      fontWeight: 500,
    },
  },
  components: {
    MuiInput: {
      styleOverrides: {
        input: {
          fontSize: '20px',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: 'red', // Установите желаемый цвет для текста helperText
        },
      },
    },
  },
});
