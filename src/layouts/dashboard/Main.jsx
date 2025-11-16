import PropTypes from 'prop-types';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default function Main({ children, sx, ...other }) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER_MOBILE + 24}px`,
        ...(sx || {}),
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
