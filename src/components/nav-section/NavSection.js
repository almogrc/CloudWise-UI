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
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item}/>
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
  const { title, icon, info } = item;
  const location = useLocation();
  const [dynamicRoute, setDynamicRoute] = useState(location.pathname);
  const handleClick = () => {
    // Perform some actions before navigating
    console.log(title);
    if(title === 'Machines'){
      console.log(title);
      console.log(dynamicRoute);
      setDynamicRoute((prev) => '/managerMachines');
      console.log(dynamicRoute);
    }
    else{
      console.log(dynamicRoute);
      const currentPathname = location.pathname;
      const pathSegments = currentPathname.split('/');
      const machineName = pathSegments[pathSegments.length - 1];
      if(title === 'dashboard'){
        setDynamicRoute((prev) =>`/dashboard/${machineName}`);
      }
      else{
        setDynamicRoute((prev) =>`/dashboard/forecasts/${machineName}`);
      }
    }
  };

  return (
      <StyledNavItem
        component={NavLink}
        to={dynamicRoute}
        onClick={handleClick}
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

      {info && info}
    </StyledNavItem>

  );
}
