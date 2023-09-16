import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#F8F5EF', // branco
      main: '#E45344', // laranja
      dark: '#00305C', // azul
    },
    secondary: {
      light: '#2985D6',
      main: '#1C5C95',
      dark: '#185081',
    },
    text: {
      primary: '#707070',
      secondary: '#9B9B9B',
    },
    error: {
      main: '#FC3C00',
    },
    warning: {
      main: '#FCA600',
    },
    success: {
      main: '#00D34D',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F0F0F0',
      200: '#D7D9DD',
      300: '#C4C4C4',
      400: '#9B9B9B',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
  shape: {
    borderRadius: 3,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            color: 'white',
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 0px 39px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export { theme };
