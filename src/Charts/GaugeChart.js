import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

const CPUGauge = ({ cpuUsage, customSegmentStops}) => {
  const textColor = '#AAA';
  const minValue = 0;
  const maxValue = 1;
  // const customSegmentStops = [0, 0.4, 0.7, 1];
  const segmentColors = ['#1dcc26', '#e9d62f', '#d12323'];
  const needleColor = 'grey';

  return (
    <div style={{ textAlign: 'center' }}>
      <p>CPU Usage</p>
      <ReactSpeedometer
        label="CPU Usage"
        segments={3}
        minValue={minValue}
        maxValue={maxValue}
        customSegmentStops={customSegmentStops}
        segmentColors={segmentColors}
        needleColor={needleColor}
        textColor={textColor}
        value={cpuUsage}
        
      />
    </div>
  );
};

export default CPUGauge;
