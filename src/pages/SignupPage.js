import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Stack, Button, TextField ,IconButton, InputAdornment } from '@mui/material';
import { Link as RouterLink  , useNavigate} from 'react-router-dom';
import useResponsive from '../hooks/useResponsive';
import Logo from '../components/logo';
import Iconify from '../components/iconify';



const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }));
  
  const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
  }));
  
  const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
  }));

export default function SignupPage() {
    const mdUp = useResponsive('up', 'md');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');


const handleClick = async () => {
  
};

const [showPassword, setShowPassword] = useState(false);

const handleChangeEmail = (event) => {
  setEmail(event.target.value);
};

const handleChangePassword = (event) => {
  setPassword(event.target.value);
};

const handleChangeName = (event) => {
  setName(event.target.value);
};
  return (
    <>
      <Helmet>
        <title> Signup | Minimal UI </title>
      </Helmet>

      <StyledRoot>
        
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome!
            </Typography>
            <img src="/assets/illustrations/CloudWiseLogo.png" alt="login" />
          </StyledSection>
        )}
        
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Create an Account
            </Typography>

            {/* Add a link to your signup form */}
            {/* <Link variant="body2" component={RouterLink} to="/signup">
              Already have an account? Log in
            </Link> */}

            {/* Rest of the content */}
            
            <Stack spacing={3}>
            <TextField name="name" label="Name" onChange={handleChangeName} />
            <TextField name="email" label="Email address" onChange={handleChangeEmail} />
            <TextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleChangePassword}
              InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

        
      </Stack>

      <Stack sx={{ mb: 3 }}/>
      <Typography variant="body2" sx={{ mb: 2.7 }}>
              Don’t have an account? {''}
              <Link component={RouterLink} to="/login" variant="subtitle2" sx={{ mb: 2 }} fontSize={16}>Log in</Link>
        </Typography>
      

      {/* Rest of the content */}
      
      <Button fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Sign Up
      </Button>
    
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
