import { useState, useEffect, useTimeout } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { loginEndpoint, baseUrl } from '../../../utils/constant';
import {fetchPostRequest} from '../../../utils/postRequest';
// components
import Iconify from '../../../components/iconify';



// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    try{
      const {data, isPending, error} = await fetchPostRequest(`${baseUrl}${loginEndpoint}`, {Email:email,Password:password});
      window.localStorage.setItem("isLoggedInCloudWise", true);
      navigate('/managerMachines');
    }catch(e){
      setErrorMsg(e.message);
    }
  };
  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={handleChangeEmail}/>

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
        {errorMsg && <Typography color="red" variant="body2" sx={{ mb: 5 }}>{errorMsg}</Typography>}
      </Stack>
      <Stack sx={{ mb: 3 }}/>
      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}


