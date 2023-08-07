// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { useState, useEffect} from 'react';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import {fetchGetRequest} from '../../../utils/getRequest';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  machineName: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ title, url, machineName, icon, color = 'primary', sx, ...other }) {
  const [value, setValue] = useState('');
  const fetchValue = async () => {
    const headers = {"Accept": "application/json","Content-Type": "application/json", 'machineId' : machineName};
    const {data, isPending, error} = await fetchGetRequest(url, headers);
    const num = fShortenNumber(data.result);
    setValue(`${num}${data.type}`);
  }
  useEffect(() => {
    fetchValue();   
  },[]);
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </StyledIcon>

      <Typography variant="h3">{value}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
