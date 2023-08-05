import React, { createContext, useState, useContext } from 'react';
import dayjs from 'dayjs';

const TimeFrameContext = createContext();
export const TimeFrameProvider = ({ children }) => {
  // const [selectedTimeFrame, setSelectedTimeFrame] = useState(dayjs());
  const [selectedTimeStartingFrame, setSelectedStartingTimeFrame] = useState(dayjs().startOf('day'));
  const [selectedTimeEndingFrame, setSelectedEndingTimeFrame] = useState(dayjs());
  const [refreshCounter, setRefreshCounter] = useState(0);
  
  return (
    <TimeFrameContext.Provider value={{ selectedTimeStartingFrame,selectedTimeEndingFrame, refreshCounter, setSelectedEndingTimeFrame , setSelectedStartingTimeFrame, setRefreshCounter}}>
      {children}
    </TimeFrameContext.Provider>
  );
};

export const useTimeFrame = () => useContext(TimeFrameContext);