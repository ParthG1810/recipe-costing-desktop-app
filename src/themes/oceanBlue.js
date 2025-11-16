import { createTheme } from '@mui/material/styles';

// Ocean Blue & Teal - Fresh, Professional
export const oceanBlueTheme = createTheme({
  palette: {
    primary: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      contrastText: '#fff',
    },
    secondary: {
      main: '#06B6D4',
      light: '#22D3EE',
      dark: '#0891B2',
      contrastText: '#fff',
    },
    success: {
      main: '#14B8A6',
      light: '#2DD4BF',
      dark: '#0D9488',
    },
    error: {
      main: '#F43F5E',
      light: '#FB7185',
      dark: '#E11D48',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    info: {
      main: '#06B6D4',
      light: '#22D3EE',
      dark: '#0891B2',
    },
    background: {
      default: '#F0F9FF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: { fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontSize: '1.875rem', fontWeight: 700 },
    h4: { fontSize: '1.5rem', fontWeight: 700 },
    h5: { fontSize: '1.25rem', fontWeight: 600 },
    h6: { fontSize: '1rem', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 32px',
          fontWeight: 600,
          transition: 'all 0.3s',
          '&:hover': { transform: 'translateY(-2px)' },
        },
        contained: {
          background: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
          boxShadow: '0 4px 14px rgba(14, 165, 233, 0.25)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0px 4px 20px rgba(15, 23, 42, 0.08)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          transition: 'all 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 12px 40px rgba(14, 165, 233, 0.15)',
          },
        },
      },
    },
  },
});
