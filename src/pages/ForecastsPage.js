import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Container, Stack, Typography ,Grid } from '@mui/material';

import DateSelector from '../components/DateSelector';
import { TimeSeriesGraph } from '../sections/@dashboard/app';
import { useTimeFrame } from '../TimeFrameContext';
import { RamUsagePredictUrl, CPUUsagePredictUrl, NetworkPredictUrl, RamUsageProcessesPredictUrl, CpuUserProcessesPredictUrl, CpuSystemProcessesPredictUrl, ReadBytesProcessesPredictUrl } from '../utils/constant';

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
              url={RamUsagePredictUrl}
              body={body}
              machineName={machineName}
              title="Ram Usage Predict"
              subheader="(+43%) than last year"
            />}
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          {machineName && <TimeSeriesGraph
            url={CPUUsagePredictUrl}
            body={body}
            machineName={machineName}
            title="CPU Usage predict"
            subheader="(+43%) than last year"
          />}
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          {machineName && <TimeSeriesGraph
            url={NetworkPredictUrl}
            body={body}
            machineName={machineName}
            title="Network predict"
            subheader="(+43%) than last year"
          />}
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          {machineName && <TimeSeriesGraph
            url={RamUsageProcessesPredictUrl}
            body={body}
            machineName={machineName}
            title="Ram Usage process predict"
            subheader="(+43%) than last year"
          />}
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          {machineName && <TimeSeriesGraph
            url={CpuUserProcessesPredictUrl}
            body={body}
            machineName={machineName}
            title="CPU Usage user process predict"
            subheader="(+43%) than last year"
          />}
        </Grid>
    </>
  );
}
