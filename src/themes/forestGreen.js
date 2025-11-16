import { createTheme } from '@mui/material/styles';

// Forest Green & Emerald - Natural, Eco-Friendly
export const forestGreenTheme = createTheme({
  palette: {
    primary: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
      contrastText: '#fff',
    },
    secondary: {
      main: '#14B8A6',
      light: '#2DD4BF',
      dark: '#0D9488',
      contrastText: '#fff',
    },
    success: {
      main: '#22C55E',
      light: '#4ADE80',
      dark: '#16A34A',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    info: {
      main: '#14B8A6',
      light: '#2DD4BF',
      dark: '#0D9488',
    },
    background: {
      default: '#F0FDF4',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#064E3B',
      secondary: '#6B7280',
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
          background: 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)',
          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0px 4px 20px rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(167, 243, 208, 0.4)',
          transition: 'all 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 12px 40px rgba(16, 185, 129, 0.2)',
          },
        },
      },
    },
  },
});
