import { React, useState, useEffect} from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import {fetchGetRequest} from '../utils/getRequest';


const CPUGauge = ({ title, url, machineName, customSegmentStops}) => {
  const [value, setValue] = useState(0.0);
  const fetchValue = async () => {
    const headers = {"Accept": "application/json","Content-Type": "application/json", 'machineId' : machineName};
    const {data, isPending, error} = await fetchGetRequest(url, headers);
    setValue(data.result);
  }
 
  const textColor = '#AAA';
  const minValue = 0.0;
  const maxValue = 100.0 ;
  const segmentColors = ['#1dcc26', '#e9d62f', '#d12323'];
  const needleColor = 'grey';
  
  useEffect(() => {
    fetchValue();   
  },[]);
  
  return (
    <div style={{ textAlign: 'center' }}>
      <p>{title}</p>
      <ReactSpeedometer
        label={title}
        segments={3}
        minValue={minValue}
        maxValue={maxValue}
        customSegmentStops={customSegmentStops}
        segmentColors={segmentColors}
        needleColor={needleColor}
        textColor={textColor}
        value={value}
        
      />
    </div>
  );
};

export default CPUGauge;
