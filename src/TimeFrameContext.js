import React, { createContext, useState, useContext } from 'react';
import dayjs from 'dayjs';

const TimeFrameContext = createContext();
export const TimeFrameProvider = ({ children }) => {
  // const [selectedTimeFrame, setSelectedTimeFrame] = useState(dayjs());
  const [selectedTimeStartingFrame, setSelectedStartingTimeFrame] = useState(dayjs().startOf('day'));
  const [selectedTimeEndingFrame, setSelectedEndingTimeFrame] = useState(dayjs());
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [lastDataPointsTimes, setlastDataPointsTimes] = useState([]);
  
  return (
    <TimeFrameContext.Provider value={{ selectedTimeStartingFrame,selectedTimeEndingFrame, refreshCounter,lastDataPointsTimes ,
    setSelectedEndingTimeFrame , setSelectedStartingTimeFrame, setRefreshCounter, setlastDataPointsTimes}}>
      {children}
    </TimeFrameContext.Provider>
  );
};

export const useTimeFrame = () => useContext(TimeFrameContext);