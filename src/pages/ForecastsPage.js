import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Container, Stack, Typography ,Grid } from '@mui/material';

import DateSelector from '../components/DateSelector';
import { TimeSeriesGraph } from '../sections/@dashboard/app';
import { useTimeFrame } from '../TimeFrameContext';
import { CPUForcastURL, RAMForcastURL } from '../utils/constant';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [machineName, setMachineName] = useState(null);
  const location = useLocation();

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const getMachineNameFromUrl = () => {
    const currentPathname = location.pathname;
    const pathSegments = currentPathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    setMachineName(lastSegment);
  };

  const {
    selectedTimeStartingFrame,
    selectedTimeEndingFrame,
  } = useTimeFrame();

  // body
  const body = {
    from : selectedTimeStartingFrame.format('YYYY-MM-DDTHH:mm:ss[Z]'),
    to: selectedTimeEndingFrame.format('YYYY-MM-DDTHH:mm:ss[Z]')
  }


  useEffect(() => {
    getMachineNameFromUrl();
  },[]);

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>
      

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <DateSelector/>
      </Container>

      <Grid item xs={12} md={6} lg={6}>
            {machineName && <TimeSeriesGraph
              url={CPUForcastURL}
              body={body}
              machineName={machineName}
              title="Ram Usage"
              subheader="(+43%) than last year"
            />}
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          {machineName && <TimeSeriesGraph
            url={RAMForcastURL}
            body={body}
            machineName={machineName}
            title="Ram Usage"
            subheader="(+43%) than last year"
          />}
        </Grid>
    </>
  );
}
