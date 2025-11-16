import { createTheme } from '@mui/material/styles';

// Create a sophisticated blue and teal professional theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0EA5E9', // Sky blue
      light: '#38BDF8',
      dark: '#0284C7',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F97316', // Vibrant orange
      light: '#FB923C',
      dark: '#EA580C',
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
    gradient: {
      primary: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
      secondary: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
      success: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
      info: 'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(14, 165, 233, 0.1)',
    '0px 2px 6px rgba(14, 165, 233, 0.12)',
    '0px 4px 12px rgba(14, 165, 233, 0.15)',
    '0px 8px 16px rgba(14, 165, 233, 0.18)',
    '0px 12px 24px rgba(14, 165, 233, 0.2)',
    '0px 16px 32px rgba(14, 165, 233, 0.22)',
    ...Array(18).fill('0px 20px 40px rgba(14, 165, 233, 0.25)'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 32px',
          fontSize: '0.95rem',
          fontWeight: 600,
          boxShadow: 'none',
          textTransform: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 8px 24px rgba(14, 165, 233, 0.35)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
          boxShadow: '0 4px 14px rgba(14, 165, 233, 0.25)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0284C7 0%, #0891B2 100%)',
            boxShadow: '0px 10px 28px rgba(14, 165, 233, 0.4)',
          },
        },
        outlined: {
          borderWidth: 2,
          borderColor: '#0EA5E9',
          '&:hover': {
            borderWidth: 2,
            backgroundColor: 'rgba(14, 165, 233, 0.08)',
            borderColor: '#0284C7',
          },
        },
        sizeLarge: {
          padding: '14px 36px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0px 4px 20px rgba(15, 23, 42, 0.08)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0px 12px 40px rgba(14, 165, 233, 0.15)',
            transform: 'translateY(-4px)',
            borderColor: 'rgba(14, 165, 233, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#FFFFFF',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: '#F0F9FF',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#0EA5E9',
              },
            },
            '&.Mui-focused': {
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 0px 0px 4px rgba(14, 165, 233, 0.15)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#0EA5E9',
                borderWidth: '2px',
              },
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
        elevation1: {
          boxShadow: '0px 4px 16px rgba(15, 23, 42, 0.08)',
        },
        elevation2: {
          boxShadow: '0px 8px 24px rgba(15, 23, 42, 0.12)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          borderRight: '1px solid rgba(226, 232, 240, 0.8)',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 100%)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(15, 23, 42, 0.08)',
          backdropFilter: 'blur(20px)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          backgroundColor: '#F0F9FF',
          borderBottom: '2px solid #BAE6FD',
          color: '#0C4A6E',
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        },
        root: {
          borderBottom: '1px solid #E0F2FE',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 10,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
            backgroundColor: 'rgba(14, 165, 233, 0.1)',
          },
        },
      },
    },
  },
});

export default theme;
