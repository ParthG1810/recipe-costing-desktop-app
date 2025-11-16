import { createTheme } from '@mui/material/styles';

// Soft UI Pro Dashboard Theme - Inspired by Material-UI Store template
// https://mui.com/store/items/soft-ui-pro-dashboard/

const softUITheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196F3', // hsl(210, 100%, 45%)
      light: '#4FC3F7',
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7B809A', // Soft gray-blue
      light: '#9CA3AF',
      dark: '#64748B',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    error: {
      main: '#F44336',
      light: '#E57373',
      dark: '#D32F2F',
    },
    warning: {
      main: '#FB8C00',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    info: {
      main: '#1A73E8',
      light: '#4FC3F7',
      dark: '#0D47A1',
    },
    background: {
      default: '#F8F9FA', // hsl(215, 15%, 97%)
      paper: '#FFFFFF',
    },
    text: {
      primary: '#344767', // hsl(215, 15%, 12%) adjusted for readability
      secondary: '#7B809A',
      disabled: '#CED4DA',
    },
    grey: {
      50: '#F8F9FA',
      100: '#F0F2F5',
      200: '#E9ECEF',
      300: '#DEE2E6',
      400: '#CED4DA',
      500: '#ADB5BD',
      600: '#7B809A',
      700: '#495057',
      800: '#344767',
      900: '#1A1F37',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
    // Gradients
    gradients: {
      primary: 'linear-gradient(195deg, #42424a 0%, #191919 100%)',
      info: 'linear-gradient(195deg, #49a3f1 0%, #1A73E8 100%)',
      success: 'linear-gradient(195deg, #66BB6A 0%, #43A047 100%)',
      warning: 'linear-gradient(195deg, #FFA726 0%, #FB8C00 100%)',
      error: 'linear-gradient(195deg, #EF5350 0%, #E53935 100%)',
      dark: 'linear-gradient(195deg, #42424a 0%, #191919 100%)',
      light: 'linear-gradient(195deg, #F5F7FA 0%, #E9ECEF 100%)',
    },
  },
  typography: {
    fontFamily: [
      '"IBM Plex Sans"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.02em',
      color: '#344767',
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: '#344767',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.375,
      color: '#344767',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#344767',
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: '#344767',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: '#344767',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.75,
      color: '#7B809A',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
      color: '#7B809A',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.625,
      color: '#7B809A',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#7B809A',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.5,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#7B809A',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 700,
      lineHeight: 2.5,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: '#7B809A',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 2px 4px 0 rgba(0, 0, 0, 0.03)',
    '0 4px 8px 0 rgba(0, 0, 0, 0.04)',
    '0 6px 12px 0 rgba(0, 0, 0, 0.05)',
    '0 8px 16px 0 rgba(0, 0, 0, 0.06)',
    '0 10px 20px 0 rgba(0, 0, 0, 0.07)',
    '0 12px 24px 0 rgba(0, 0, 0, 0.08)',
    '0 14px 28px 0 rgba(0, 0, 0, 0.09)',
    '0 16px 32px 0 rgba(0, 0, 0, 0.1)',
    '0 18px 36px 0 rgba(0, 0, 0, 0.11)',
    '0 20px 40px 0 rgba(0, 0, 0, 0.12)',
    '0 22px 44px 0 rgba(0, 0, 0, 0.13)',
    '0 24px 48px 0 rgba(0, 0, 0, 0.14)',
    '0 3px 5px -1px rgba(0,0,0,0.06), 0 5px 8px 0 rgba(0,0,0,0.042), 0 1px 14px 0 rgba(0,0,0,0.036)',
    '0 4px 5px -2px rgba(0,0,0,0.06), 0 7px 10px 1px rgba(0,0,0,0.042), 0 2px 16px 1px rgba(0,0,0,0.036)',
    '0 5px 5px -3px rgba(0,0,0,0.06), 0 8px 10px 1px rgba(0,0,0,0.042), 0 3px 14px 2px rgba(0,0,0,0.036)',
    '0 5px 6px -3px rgba(0,0,0,0.06), 0 9px 12px 1px rgba(0,0,0,0.042), 0 3px 16px 2px rgba(0,0,0,0.036)',
    '0 6px 6px -3px rgba(0,0,0,0.06), 0 10px 14px 1px rgba(0,0,0,0.042), 0 4px 18px 3px rgba(0,0,0,0.036)',
    '0 6px 7px -4px rgba(0,0,0,0.06), 0 11px 15px 1px rgba(0,0,0,0.042), 0 4px 20px 3px rgba(0,0,0,0.036)',
    '0 7px 8px -4px rgba(0,0,0,0.06), 0 12px 17px 2px rgba(0,0,0,0.042), 0 5px 22px 4px rgba(0,0,0,0.036)',
    '0 7px 8px -4px rgba(0,0,0,0.06), 0 13px 19px 2px rgba(0,0,0,0.042), 0 5px 24px 4px rgba(0,0,0,0.036)',
    '0 7px 9px -4px rgba(0,0,0,0.06), 0 14px 21px 2px rgba(0,0,0,0.042), 0 5px 26px 4px rgba(0,0,0,0.036)',
    '0 8px 9px -5px rgba(0,0,0,0.06), 0 15px 22px 2px rgba(0,0,0,0.042), 0 6px 28px 5px rgba(0,0,0,0.036)',
    '0 8px 10px -5px rgba(0,0,0,0.06), 0 16px 24px 2px rgba(0,0,0,0.042), 0 6px 30px 5px rgba(0,0,0,0.036)',
    '0 8px 11px -5px rgba(0,0,0,0.06), 0 17px 26px 2px rgba(0,0,0,0.042), 0 6px 32px 5px rgba(0,0,0,0.036)',
    '0 9px 11px -5px rgba(0,0,0,0.06), 0 18px 28px 2px rgba(0,0,0,0.042), 0 7px 34px 6px rgba(0,0,0,0.036)',
  ],
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: false,
      },
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          padding: '0.625rem 1.5rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'none',
          letterSpacing: '0.01em',
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          background: 'linear-gradient(195deg, #49a3f1 0%, #1A73E8 100%)',
          boxShadow: '0 3px 5px -1px rgba(0,0,0,0.09), 0 6px 10px 0 rgba(0,0,0,0.06), 0 1px 18px 0 rgba(0,0,0,0.05)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(195deg, #42424a 0%, #191919 100%)',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.12), 0 8px 12px 0 rgba(0,0,0,0.08), 0 2px 20px 0 rgba(0,0,0,0.07)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(195deg, #49a3f1 0%, #1A73E8 100%)',
        },
        containedSecondary: {
          background: 'linear-gradient(195deg, #42424a 0%, #191919 100%)',
        },
        outlined: {
          borderWidth: '1px',
          padding: '0.625rem 1.5rem',
          '&:hover': {
            borderWidth: '1px',
            backgroundColor: 'rgba(33, 150, 243, 0.04)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(33, 150, 243, 0.04)',
          },
        },
        sizeLarge: {
          padding: '0.875rem 2rem',
          fontSize: '0.875rem',
        },
        sizeSmall: {
          padding: '0.5rem 1.25rem',
          fontSize: '0.75rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          border: 'none',
          overflow: 'visible',
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '1.5rem',
          '&:last-child': {
            paddingBottom: '1.5rem',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '0.5rem',
            backgroundColor: '#FFFFFF',
            fontSize: '0.875rem',
            transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
            '& fieldset': {
              borderColor: '#DEE2E6',
              transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
            },
            '&:hover fieldset': {
              borderColor: '#2196F3',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px hsla(210, 100%, 45%, 0.15)',
              '& fieldset': {
                borderColor: '#2196F3',
                borderWidth: '1px',
              },
            },
          },
          '& .MuiInputLabel-root': {
            color: '#7B809A',
            fontSize: '0.875rem',
            fontWeight: 400,
            '&.Mui-focused': {
              color: '#2196F3',
              fontWeight: 500,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '1rem',
          backgroundImage: 'none',
        },
        elevation: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        },
        elevation1: {
          boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.03)',
        },
        elevation2: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        },
        elevation3: {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          borderRight: 'none',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
          background: '#FFFFFF',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          color: '#344767',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#7B809A',
          backgroundColor: '#F8F9FA',
          borderBottom: '1px solid #E9ECEF',
          padding: '1rem',
        },
        root: {
          fontSize: '0.875rem',
          color: '#7B809A',
          borderBottom: '1px solid #F0F2F5',
          padding: '1rem',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': {
            borderBottom: 0,
          },
          '&:hover': {
            backgroundColor: '#F8F9FA',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: '0.5rem',
          fontSize: '0.75rem',
          height: '28px',
        },
        filled: {
          border: 'none',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: 'rgba(33, 150, 243, 0.08)',
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          margin: '0 0.5rem',
          padding: '0.75rem 1rem',
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: '#F8F9FA',
          },
          '&.Mui-selected': {
            backgroundColor: '#FFFFFF',
            background: 'linear-gradient(195deg, #49a3f1 0%, #1A73E8 100%)',
            color: '#FFFFFF',
            boxShadow: '0 4px 6px -1px rgba(33, 150, 243, 0.3), 0 2px 4px -1px rgba(33, 150, 243, 0.2)',
            '&:hover': {
              background: 'linear-gradient(195deg, #42a3f1 0%, #1565C0 100%)',
            },
            '& .MuiListItemIcon-root': {
              color: '#FFFFFF',
            },
            '& .MuiListItemText-primary': {
              color: '#FFFFFF',
              fontWeight: 600,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '2.5rem',
          color: '#7B809A',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '0.875rem',
          fontWeight: 500,
          color: '#344767',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '0.75rem',
          padding: '1rem 1.25rem',
          fontSize: '0.875rem',
        },
        standardSuccess: {
          backgroundColor: '#F0FDF4',
          color: '#166534',
          border: '1px solid #BBF7D0',
        },
        standardError: {
          backgroundColor: '#FEF2F2',
          color: '#991B1B',
          border: '1px solid #FECACA',
        },
        standardWarning: {
          backgroundColor: '#FFFBEB',
          color: '#92400E',
          border: '1px solid #FDE68A',
        },
        standardInfo: {
          backgroundColor: '#EFF6FF',
          color: '#1E40AF',
          border: '1px solid #BFDBFE',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#344767',
          fontSize: '0.75rem',
          fontWeight: 500,
          borderRadius: '0.5rem',
          padding: '0.5rem 0.75rem',
        },
        arrow: {
          color: '#344767',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
        },
        switchBase: {
          padding: 0,
          margin: 2,
          transitionDuration: '250ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              background: 'linear-gradient(195deg, #49a3f1 0%, #1A73E8 100%)',
              opacity: 1,
              border: 0,
            },
          },
        },
        thumb: {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        track: {
          borderRadius: 26 / 2,
          backgroundColor: '#E9ECEF',
          opacity: 1,
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
  },
});

export default softUITheme;
