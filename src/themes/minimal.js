import { createTheme, alpha } from '@mui/material/styles';

// Minimal UI Design System - v4.1.0
// Based on the Minimal_TypeScript_v4.1.0 template

// ----------------------------------------------------------------------
// GREY PALETTE
// ----------------------------------------------------------------------

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

// ----------------------------------------------------------------------
// PRIMARY COLOR (Green - Minimal Brand Color)
// ----------------------------------------------------------------------

const PRIMARY = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#00AB55',
  dark: '#007B55',
  darker: '#005249',
  contrastText: '#FFFFFF',
};

// ----------------------------------------------------------------------
// SECONDARY COLOR (Blue)
// ----------------------------------------------------------------------

const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#FFFFFF',
};

// ----------------------------------------------------------------------
// INFO COLOR (Cyan)
// ----------------------------------------------------------------------

const INFO = {
  lighter: '#CAFDF5',
  light: '#61F3F3',
  main: '#00B8D9',
  dark: '#006C9C',
  darker: '#003768',
  contrastText: '#FFFFFF',
};

// ----------------------------------------------------------------------
// SUCCESS COLOR (Green)
// ----------------------------------------------------------------------

const SUCCESS = {
  lighter: '#D8FBDE',
  light: '#86E8AB',
  main: '#36B37E',
  dark: '#1B806A',
  darker: '#0A5554',
  contrastText: '#FFFFFF',
};

// ----------------------------------------------------------------------
// WARNING COLOR (Orange/Yellow)
// ----------------------------------------------------------------------

const WARNING = {
  lighter: '#FFF5CC',
  light: '#FFD666',
  main: '#FFAB00',
  dark: '#B76E00',
  darker: '#7A4100',
  contrastText: GREY[800],
};

// ----------------------------------------------------------------------
// ERROR COLOR (Red)
// ----------------------------------------------------------------------

const ERROR = {
  lighter: '#FFE9D5',
  light: '#FFAC82',
  main: '#FF5630',
  dark: '#B71D18',
  darker: '#7A0916',
  contrastText: '#FFFFFF',
};

// ----------------------------------------------------------------------
// CUSTOM SHADOWS
// ----------------------------------------------------------------------

const customShadows = {
  z1: `0 1px 2px 0 ${alpha(GREY[500], 0.16)}`,
  z4: `0 4px 8px 0 ${alpha(GREY[500], 0.16)}`,
  z8: `0 8px 16px 0 ${alpha(GREY[500], 0.16)}`,
  z12: `0 12px 24px -4px ${alpha(GREY[500], 0.16)}`,
  z16: `0 16px 32px -4px ${alpha(GREY[500], 0.16)}`,
  z20: `0 20px 40px -4px ${alpha(GREY[500], 0.16)}`,
  z24: `0 24px 48px 0 ${alpha(GREY[500], 0.16)}`,
  //
  primary: `0 8px 16px 0 ${alpha(PRIMARY.main, 0.24)}`,
  secondary: `0 8px 16px 0 ${alpha(SECONDARY.main, 0.24)}`,
  info: `0 8px 16px 0 ${alpha(INFO.main, 0.24)}`,
  success: `0 8px 16px 0 ${alpha(SUCCESS.main, 0.24)}`,
  warning: `0 8px 16px 0 ${alpha(WARNING.main, 0.24)}`,
  error: `0 8px 16px 0 ${alpha(ERROR.main, 0.24)}`,
  //
  card: `0 0 2px 0 ${alpha(GREY[500], 0.2)}, 0 12px 24px -4px ${alpha(GREY[500], 0.12)}`,
  dialog: `-40px 40px 80px -8px ${alpha(GREY[500], 0.24)}`,
  dropdown: `0 0 2px 0 ${alpha(GREY[500], 0.24)}, -20px 20px 40px -4px ${alpha(GREY[500], 0.24)}`,
};

// ----------------------------------------------------------------------
// TYPOGRAPHY
// ----------------------------------------------------------------------

function pxToRem(value) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

const FONT_PRIMARY = 'Public Sans, sans-serif';

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize',
  },
};

// ----------------------------------------------------------------------
// SHADOWS
// ----------------------------------------------------------------------

function createShadow(color) {
  const transparent1 = alpha(color, 0.2);
  const transparent2 = alpha(color, 0.14);
  const transparent3 = alpha(color, 0.12);
  return [
    'none',
    `0px 2px 1px -1px ${transparent1},0px 1px 1px 0px ${transparent2},0px 1px 3px 0px ${transparent3}`,
    `0px 3px 1px -2px ${transparent1},0px 2px 2px 0px ${transparent2},0px 1px 5px 0px ${transparent3}`,
    `0px 3px 3px -2px ${transparent1},0px 3px 4px 0px ${transparent2},0px 1px 8px 0px ${transparent3}`,
    `0px 2px 4px -1px ${transparent1},0px 4px 5px 0px ${transparent2},0px 1px 10px 0px ${transparent3}`,
    `0px 3px 5px -1px ${transparent1},0px 5px 8px 0px ${transparent2},0px 1px 14px 0px ${transparent3}`,
    `0px 3px 5px -1px ${transparent1},0px 6px 10px 0px ${transparent2},0px 1px 18px 0px ${transparent3}`,
    `0px 4px 5px -2px ${transparent1},0px 7px 10px 1px ${transparent2},0px 2px 16px 1px ${transparent3}`,
    `0px 5px 5px -3px ${transparent1},0px 8px 10px 1px ${transparent2},0px 3px 14px 2px ${transparent3}`,
    `0px 5px 6px -3px ${transparent1},0px 9px 12px 1px ${transparent2},0px 3px 16px 2px ${transparent3}`,
    `0px 6px 6px -3px ${transparent1},0px 10px 14px 1px ${transparent2},0px 4px 18px 3px ${transparent3}`,
    `0px 6px 7px -4px ${transparent1},0px 11px 15px 1px ${transparent2},0px 4px 20px 3px ${transparent3}`,
    `0px 7px 8px -4px ${transparent1},0px 12px 17px 2px ${transparent2},0px 5px 22px 4px ${transparent3}`,
    `0px 7px 8px -4px ${transparent1},0px 13px 19px 2px ${transparent2},0px 5px 24px 4px ${transparent3}`,
    `0px 7px 9px -4px ${transparent1},0px 14px 21px 2px ${transparent2},0px 5px 26px 4px ${transparent3}`,
    `0px 8px 9px -5px ${transparent1},0px 15px 22px 2px ${transparent2},0px 6px 28px 5px ${transparent3}`,
    `0px 8px 10px -5px ${transparent1},0px 16px 24px 2px ${transparent2},0px 6px 30px 5px ${transparent3}`,
    `0px 8px 11px -5px ${transparent1},0px 17px 26px 2px ${transparent2},0px 6px 32px 5px ${transparent3}`,
    `0px 9px 11px -5px ${transparent1},0px 18px 28px 2px ${transparent2},0px 7px 34px 6px ${transparent3}`,
    `0px 9px 12px -6px ${transparent1},0px 19px 29px 2px ${transparent2},0px 7px 36px 6px ${transparent3}`,
    `0px 10px 13px -6px ${transparent1},0px 20px 31px 3px ${transparent2},0px 8px 38px 7px ${transparent3}`,
    `0px 10px 13px -6px ${transparent1},0px 21px 33px 3px ${transparent2},0px 8px 40px 7px ${transparent3}`,
    `0px 10px 14px -6px ${transparent1},0px 22px 35px 3px ${transparent2},0px 8px 42px 7px ${transparent3}`,
    `0px 11px 14px -7px ${transparent1},0px 23px 36px 3px ${transparent2},0px 9px 44px 8px ${transparent3}`,
    `0px 11px 15px -7px ${transparent1},0px 24px 38px 3px ${transparent2},0px 9px 46px 8px ${transparent3}`,
  ];
}

// ----------------------------------------------------------------------
// CREATE MINIMAL THEME
// ----------------------------------------------------------------------

const minimalTheme = createTheme({
  palette: {
    mode: 'light',
    common: { black: '#000', white: '#fff' },
    primary: PRIMARY,
    secondary: SECONDARY,
    info: INFO,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    grey: GREY,
    divider: alpha(GREY[500], 0.24),
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
      neutral: GREY[200],
    },
    action: {
      active: GREY[600],
      hover: alpha(GREY[500], 0.08),
      selected: alpha(GREY[500], 0.16),
      disabled: alpha(GREY[500], 0.8),
      disabledBackground: alpha(GREY[500], 0.24),
      focus: alpha(GREY[500], 0.24),
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
  },
  typography,
  shape: {
    borderRadius: 8,
  },
  shadows: createShadow(GREY[500]),
  customShadows,
  components: {
    // Button
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 8,
          textTransform: 'capitalize',
        },
        sizeLarge: {
          height: 48,
        },
        containedInherit: {
          color: GREY[800],
          backgroundColor: GREY[200],
          '&:hover': {
            backgroundColor: GREY[300],
          },
        },
        outlinedInherit: {
          border: `1px solid ${alpha(GREY[500], 0.32)}`,
          '&:hover': {
            backgroundColor: alpha(GREY[500], 0.08),
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: alpha(GREY[500], 0.08),
          },
        },
      },
    },

    // Card
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          position: 'relative',
          boxShadow: customShadows.card,
          zIndex: 0,
        },
      },
    },

    // TextField/Input
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: GREY[500],
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: GREY[500],
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
            },
          },
        },
        notchedOutline: {
          borderColor: alpha(GREY[500], 0.32),
          transition: 'border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        },
      },
    },

    // Paper
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },

    // Backdrop
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(GREY[900], 0.8),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },

    // AppBar
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },

    // Drawer
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxShadow: customShadows.dropdown,
        },
      },
    },

    // List
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: 16,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover': {
            backgroundColor: alpha(GREY[500], 0.08),
          },
          '&.Mui-selected': {
            backgroundColor: alpha(PRIMARY.main, 0.08),
            color: PRIMARY.main,
            fontWeight: 600,
            '&:hover': {
              backgroundColor: alpha(PRIMARY.main, 0.16),
            },
          },
        },
      },
    },

    // Table
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: GREY[600],
          backgroundColor: GREY[200],
          fontWeight: 600,
          '&:first-of-type': {
            paddingLeft: 20,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          },
          '&:last-of-type': {
            paddingRight: 20,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          },
        },
        body: {
          '&:first-of-type': {
            paddingLeft: 20,
          },
          '&:last-of-type': {
            paddingRight: 20,
          },
        },
      },
    },

    // Chip
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
        filled: {
          '&.MuiChip-colorDefault': {
            backgroundColor: GREY[200],
          },
        },
      },
    },

    // Tooltip
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: GREY[800],
          borderRadius: 8,
        },
        arrow: {
          color: GREY[800],
        },
      },
    },

    // IconButton
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: alpha(GREY[500], 0.08),
          },
        },
      },
    },

    // Avatar
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
        },
        colorDefault: {
          color: GREY[600],
          backgroundColor: GREY[200],
        },
      },
    },

    // Pagination
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            fontWeight: 700,
          },
        },
      },
    },
  },
});

export default minimalTheme;
