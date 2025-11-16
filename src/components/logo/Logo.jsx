import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        ...sx,
      }}
      {...other}
    >
      <Box
        component="div"
        sx={{
          width: 40,
          height: 40,
          bgcolor: theme.palette.primary.main,
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: 20,
        }}
      >
        RC
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: theme.palette.text.primary,
        }}
      >
        Recipe Costing
      </Typography>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return logo;
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

Logo.displayName = 'Logo';

export default Logo;
