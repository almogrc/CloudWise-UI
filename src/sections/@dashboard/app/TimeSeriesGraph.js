import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { useState, useEffect } from 'react';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { useChart } from '../../../components/chart';
// ----------------------------------------------------------------------
// requests 
import {fetchPostRequest} from '../../../utils/postRequest';
import { useTimeFrame } from '../../../TimeFrameContext';

TimeSeriesGraph.propTypes = {
  url: PropTypes.string,
  body: PropTypes.any,
  machineName: PropTypes.string,
  title: PropTypes.string,
  subheader: PropTypes.string,
};
export default function TimeSeriesGraph({url, body, machineName, title, subheader}) {
  
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabel] = useState([]);
  const [type, setType] = useState(null);
  const {
    refreshCounter,
    setRefreshCounter,
    lastDataPointsTimes,
    setlastDataPointsTimes,
  } = useTimeFrame();


  const fetchChartDataList = async () => {
    const headers = {"Accept": "application/json","Content-Type": "application/json", 'machineId' : machineName};
    console.log(body);
    const {data, isPending, error} = await fetchPostRequest(url, body, headers);
    // prepareDataToChart
    const chartDataTmp = [];
    let chartLabel = [];
    // let demoLabel = [];
    console.log(data);
    console.log(Array.isArray(data));
    if(Array.isArray(data))
    {
      setType(data[0]?.type);
      chartLabel = data[0]?.dataPoints?.map(x => new Date(x.date).getTime() + 3 * 60 * 60 * 1000);
      
      for (let i = 0; i < data.length; i+=1) {
        chartDataTmp.push({
          name: data[i]?.name,
          type: 'line',
          fill: 'solid',
          data: data[i]?.dataPoints?.map(x => x.value.toFixed(2))});
      }
    }
    else{
      setType(data?.type);
      chartLabel = data?.dataPoints?.map(x => new Date(x.date).getTime() + 3 * 60 * 60 * 1000);
      
      if(data?.critical > 0){
        chartDataTmp.push(
          { name: 'Critical', type: 'line', data: Array(chartLabel.length).fill(data?.critical) },
          { name: 'Warning', type: 'line', data: Array(chartLabel.length).fill(data?.warning) },);
      }
      
      chartDataTmp.push(
        { name: data?.name, type: 'line', fill: 'solid', data: data?.dataPoints?.map(x => x.value.toFixed(2)) }
      );   

      
    }
    console.log(chartDataTmp);
    setChartData(chartDataTmp); 
    setChartLabel(chartLabel);
  };

  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(2)} ${type}`;
          }
          return y;
        },
      },
    },
  });

  useEffect(() => {
    fetchChartDataList();   
  },[refreshCounter]);

  return (
    <Card >
      <CardHeader title={title} subheader={subheader} /> 
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        {chartData.length > 0 && <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />}
      </Box>
    </Card>
  );
}
