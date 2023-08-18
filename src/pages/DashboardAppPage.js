import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

// constants
import { RamUsageUrl, CPUUsageUrl, NetworkUrl, RamUsageProcessesUrl, CpuUserProcessesUrl, CpuSystemProcessesUrl, ReadBytesProcessesUrl, RamUrl, RamGaugeUrl, CPUGaugeUrl, CoresUrl } from '../utils/constant';

// components
import { useTimeFrame } from '../TimeFrameContext';
import Iconify from '../components/iconify';
import DateSelector from '../components/DateSelector';
import CPUGauge from '../Charts/GaugeChart';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  TimeSeriesGraph,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';


// ----------------------------------------------------------------------

export default function DashboardAppPage() {

  const [machineName, setMachineName] = useState(null);
  const location = useLocation();

  const {
    selectedTimeStartingFrame,
    selectedTimeEndingFrame,
  } = useTimeFrame();

  // body
  const body = {
    from : selectedTimeStartingFrame.format('YYYY-MM-DDTHH:mm:ss[Z]'),
    to: selectedTimeEndingFrame.format('YYYY-MM-DDTHH:mm:ss[Z]')
  }
  const getMachineNameFromUrl = () => {
      // Access the pathname from the location object
    const currentPathname = location.pathname;
    const pathSegments = currentPathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    // need to check vm list of the client 
    setMachineName(lastSegment);
  }

  const checkMachineNameExist = () => {

   }

  const theme = useTheme();
  const dataPages = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 200, pv: 2300, amt: 2100 },
    { name: 'Page C', uv: 340, pv: 2550, amt: 2500 },
    { name: 'Page D', uv: 892, pv: 2014, amt: 2300 },
    { name: 'Page E', uv: 111, pv: 2000, amt: 2450 },
  ];
  const initialData = [
    { name: 1, cost: 4.11, impression: 100 },
    { name: 2, cost: 2.39, impression: 120 },
    { name: 3, cost: 1.37, impression: 150 },
    { name: 4, cost: 1.16, impression: 180 },
    { name: 5, cost: 2.29, impression: 200 },
    { name: 6, cost: 3, impression: 499 },
    { name: 7, cost: 0.53, impression: 50 },
    { name: 8, cost: 2.52, impression: 100 },
    { name: 9, cost: 1.79, impression: 200 },
    { name: 10, cost: 2.94, impression: 222 },
    { name: 11, cost: 4.3, impression: 210 },
    { name: 12, cost: 4.41, impression: 300 },
    { name: 13, cost: 2.1, impression: 50 },
    { name: 14, cost: 8, impression: 190 },
    { name: 15, cost: 0, impression: 300 },
    { name: 16, cost: 9, impression: 400 },
    { name: 17, cost: 3, impression: 200 },
    { name: 18, cost: 2, impression: 50 },
    { name: 19, cost: 3, impression: 100 },
    { name: 20, cost: 7, impression: 100 },
  ];
 
  const initialState = {
    data: initialData,
    left: 'dataMin',
    right: 'dataMax',
    refAreaLeft: '',
    refAreaRight: '',
    top: 'dataMax+1',
    bottom: 'dataMin-1',
    top2: 'dataMax+20',
    bottom2: 'dataMin-20',
    animation: true,
  };

  useEffect(() => {
    getMachineNameFromUrl();
    checkMachineNameExist();
  },[]);

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Machine Name: {machineName}
        </Typography>

        <DateSelector/>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
           {machineName &&<AppWidgetSummary title="Ram Capacity" url={RamUrl} machineName={machineName} icon={'ant-design:android-filled'} />}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {machineName &&<CPUGauge title="Ram Used (%)" url={RamGaugeUrl} machineName={machineName} customSegmentStops={[0,20,50, 100]}/>}
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
          {machineName &&<CPUGauge title="CPU Busy (%)" url={CPUGaugeUrl} machineName={machineName} customSegmentStops={[0, 30, 70, 100]}/>}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {machineName && <AppWidgetSummary title="Cores" url={CoresUrl} machineName={machineName} icon={'ant-design:android-filled'} />}
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            {machineName && <TimeSeriesGraph
              url={RamUsageUrl}
              body={body}
              machineName={machineName}
              title="Ram Usage"
              subheader="(+43%) than last year"
            />}
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            {machineName && <TimeSeriesGraph
              url={CPUUsageUrl}
              body={body}
              machineName={machineName}
              title="CPU Usage"
              subheader="(+43%) than last year"
            />}
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            {machineName && <TimeSeriesGraph
              url={NetworkUrl}
              body={body}
              machineName={machineName}
              title="Network"
              subheader="(+43%) than last year"
            />}
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            {machineName && <TimeSeriesGraph
              url={RamUsageProcessesUrl}
              body={body}
              machineName={machineName}
              title="Ram Used"
              subheader="(+43%) than last year"
            />}
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            {machineName && <TimeSeriesGraph
              url={CpuUserProcessesUrl}
              body={body}
              machineName={machineName}
              title="CPU user"
              subheader="(+43%) than last year"
            />}
          </Grid>

          
          <Grid item xs={12} md={6} lg={6}>
            {machineName && <TimeSeriesGraph
              url={CpuSystemProcessesUrl}
              body={body}
              machineName={machineName}
              title="CPU system"
              subheader="(+43%) than last year"
            />}
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            {machineName && <TimeSeriesGraph
              url={ReadBytesProcessesUrl}
              body={body}
              machineName={machineName}
              title="read bytes"
              subheader="(+43%) than last year"
            />}
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="RAM Usage"
              chartData={[
                { label: 'America', value: 9000 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid> 
      </Container>
    </>
  );
}
