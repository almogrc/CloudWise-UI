import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import Header from './header';
// import logout from '../../sections/auth/logout';
import {logout} from '../../utils/constant';

//

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'block',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 0,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: 20,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '20%',
  maxWidth: 280,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const styles = {
  logoutLink: {
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

// ----------------------------------------------------------------------

export default function MachineLayout() {
  const [open, setOpen] = useState(false);
  const mdUp = useResponsive('up', 'md');

  return (
    
    <StyledRoot>
    {mdUp && (
      
      <StyledSection>
        <Box sx={{ mb: 6 }}/>
        <img src="/assets/illustrations/CloudWiseLogo.png" alt="login" sizes=''/>
        <a href="" onClick={logout} style={styles.logoutLink}>
        Logout
        </a>
      </StyledSection>
    )}
       <Header onOpenNav={() => setOpen(true)} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
    
  );
}
