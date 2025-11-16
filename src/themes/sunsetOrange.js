import { createTheme } from '@mui/material/styles';

// Sunset Orange & Coral - Warm, Energetic
export const sunsetOrangeTheme = createTheme({
  palette: {
    primary: {
      main: '#F97316',
      light: '#FB923C',
      dark: '#EA580C',
      contrastText: '#fff',
    },
    secondary: {
      main: '#EC4899',
      light: '#F472B6',
      dark: '#DB2777',
      contrastText: '#fff',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    error: {
      main: '#DC2626',
      light: '#EF4444',
      dark: '#B91C1C',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    info: {
      main: '#F97316',
      light: '#FB923C',
      dark: '#EA580C',
    },
    background: {
      default: '#FFF7ED',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#431407',
      secondary: '#78716C',
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
          background: 'linear-gradient(135deg, #F97316 0%, #EC4899 100%)',
          boxShadow: '0 4px 14px rgba(249, 115, 22, 0.3)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0px 4px 20px rgba(249, 115, 22, 0.08)',
          border: '1px solid rgba(254, 215, 170, 0.4)',
          transition: 'all 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 12px 40px rgba(249, 115, 22, 0.2)',
          },
        },
      },
    },
  },
});
