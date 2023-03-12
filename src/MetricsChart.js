import { Line } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MetricsChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const query = 'irate(process_cpu_seconds_total{job="prometheus"}[5m])'; // Query to fetch CPU idle time
    const end = Date.now() / 1000; // End time in Unix time
    const start = end - (5 * 60); // Start time in Unix time
    const step = '1m'; // Step size in seconds
    const url = `http://localhost:9090/api/v1/query_range?query=${query}&start=${start}&end=${end}&step=${step}`;
   console.log("before");
    axios.get(url)
      .then(response => {
        const data = response.data.data.result[0].values;
        setChartData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, 
  []);

  return (
    <div>
      <Line
        data={{
          labels: chartData.map(([time]) => new Date(time * 1000).toLocaleTimeString()), // Convert Unix time to local time
          datasets: [
            {
              label: 'CPU Time',
              data: chartData.map(([, value]) => value),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        }}
        options={{
         plugins:{
           legend: true
         }
        }}
      />
      
    </div>
  );
};

export default MetricsChart;
/*how to get Prometheus metric on the cpu usage in the last 5 minutes in every minute using api*/
/*import { Line } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MetricsChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const query = 'irate(node_cpu_seconds_total{mode="idle"}[5m])'; // Query to fetch CPU idle time
    const end = Date.now() / 1000; // End time in Unix time
    const start = end - (5 * 60); // Start time in Unix time
    const step = 60; // Step size in seconds
    const url = `http://localhost:9090/api/v1/query_range?query=${query}&start=${start}&end=${end}&step=${step}`;

    axios.get(url)
      .then(response => {
        const data = response.data.data.result[0].values;
        setChartData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Line
        data={{
          labels: chartData.map(([time]) => new Date(time * 1000).toLocaleTimeString()), // Convert Unix time to local time
          datasets: [
            {
              label: 'CPU Idle Time',
              data: chartData.map(([, value]) => value),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{ ticks: { beginAtZero: true } }],
          },
        }}
      />
    </div>
  );
};

export default MetricsChart;*/