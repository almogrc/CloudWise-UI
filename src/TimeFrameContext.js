import React, { createContext, useState, useContext } from 'react';

const TimeFrameContext = createContext();

export const TimeFrameProvider = ({ children }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('last2days');

  return (
    <TimeFrameContext.Provider value={{ selectedTimeFrame, setSelectedTimeFrame }}>
      {children}
    </TimeFrameContext.Provider>
  );
};

export const useTimeFrame = () => useContext(TimeFrameContext);