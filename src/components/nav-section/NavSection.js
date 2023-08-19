import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const location = useLocation();
  const createPath = (title) => {
    console.log(title);
    if(title === 'Machines'){
      return '/managerMachines';
    }
    // else
      const currentPathname = location.pathname;
      const pathSegments = currentPathname.split('/');
      const machineName = pathSegments[pathSegments.length - 1];
      if(title === 'dashboard'){
        return `/dashboard/${machineName}`;
      } 
      if(title === 'alerts'){
        return `/alerts`;
      }
        return `/dashboard/forecasts/${machineName}`;
  };
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem item={item} path={createPath(item.title)}/>
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item, path }) {
  const { title, icon } = item;
  return (
      <StyledNavItem
        component={NavLink}
        to={path}
        sx={{
          '&.active': {
            color: 'text.primary',
            bgcolor: 'action.selected',
            fontWeight: 'fontWeightBold',
          },
        }}
      >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

    </StyledNavItem>

  );
}
