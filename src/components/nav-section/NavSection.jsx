import PropTypes from 'prop-types';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
// @mui
import {
  Box,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Collapse,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// components
import Iconify from '../iconify/Iconify';

// ----------------------------------------------------------------------

const StyledNavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ active, theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  ...(active && {
    color: theme.palette.primary.main,
    fontWeight: 'fontWeightMedium',
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: '""',
      position: 'absolute',
      borderRadius: '0 4px 4px 0',
      backgroundColor: theme.palette.primary.main,
    },
  }),
}));

const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ px: 2 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, children } = item;
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const hasChildren = children && children.length > 0;

  if (hasChildren) {
    return (
      <>
        <StyledNavItem
          onClick={() => setOpen(!open)}
          active={false}
        >
          <StyledNavItemIcon>{icon}</StyledNavItemIcon>
          <ListItemText disableTypography primary={title} />
          <Iconify
            icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </StyledNavItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((child) => (
              <StyledNavItem
                key={child.title}
                component={RouterLink}
                to={child.path}
                active={pathname === child.path}
                sx={{ pl: 4 }}
              >
                <ListItemText disableTypography primary={child.title} />
              </StyledNavItem>
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      active={pathname === path}
    >
      <StyledNavItemIcon>{icon}</StyledNavItemIcon>
      <ListItemText disableTypography primary={title} />
    </StyledNavItem>
  );
}
