import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Stack, TextField, Typography, Link, LoadingButton } from '@mui/material';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function SignupForm() {
 

  return (
    <>
      <Stack spacing={3}>
        <TextField name="name" label="Name" onChange={handleChangeName} />
        <TextField name="email" label="Email address" onChange={handleChangeEmail} />
        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={handleChangePassword}
        />

        {/* Add more form fields if needed */}
      </Stack>

      {/* Display error messages or success messages */}
      
      <Link component={RouterLink} to="/login" variant="subtitle2">
        Already have an account? Log in
      </Link>

      {/* Rest of the content */}
      
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Sign Up
      </LoadingButton>
    </>
  );
}
