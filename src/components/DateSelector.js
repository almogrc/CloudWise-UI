
import React, { useState, useEffect } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { useTimeFrame } from '../TimeFrameContext';

function DateSelector() {
    const {
        selectedTimeStartingFrame,
        refreshCounter,
        setRefreshCounter,
        setSelectedStartingTimeFrame,
        selectedTimeEndingFrame,
        setSelectedEndingTimeFrame,
      } = useTimeFrame();
    
      const [todayActive, setTodayActive] = useState(false);
      const [lastWeekActive, setLastWeekActive] = useState(false);
      const [last3MonthsActive, setLast3MonthsActive] = useState(false);
      const today = dayjs();
      const lastWeek = today.subtract(1, 'week');
      const last3Months = today.subtract(3, 'months');
    
      
      
    const onApply = ()=>{
      console.log(refreshCounter);
      setRefreshCounter(refreshCounter => refreshCounter + 1);
      console.log(refreshCounter);
    }

      const toggleToday = () => {
        setLastWeekActive(false);
        setLast3MonthsActive(false);
        setTodayActive(!todayActive);
        setSelectedStartingTimeFrame(dayjs().startOf('day'));
        setSelectedEndingTimeFrame(dayjs());
      };
    
      const toggleLastWeek = () => {
        setTodayActive(false);
        setLast3MonthsActive(false);
        setLastWeekActive(!lastWeekActive);
        setSelectedStartingTimeFrame(dayjs().subtract(1, 'week').startOf('day'));
        setSelectedEndingTimeFrame(dayjs());
      };
    
      const toggleLast3Months = () => {
        setTodayActive(false);
        setLastWeekActive(false);
        setLast3MonthsActive(!last3MonthsActive);
        setSelectedStartingTimeFrame(dayjs().subtract(3, 'months').startOf('day'));
        setSelectedEndingTimeFrame(dayjs());
      };
    
      const handleStartingDateChange = (date) => {
        setSelectedStartingTimeFrame(date);
        
        if (date.isSame(dayjs().subtract(1, 'week'), 'day') && selectedTimeEndingFrame.isSame(dayjs(), 'day')) {
          setTodayActive(false);
          setLastWeekActive(true);
          setLast3MonthsActive(false);
        } else if (date.isSame(dayjs().subtract(3, 'months'), 'day') && selectedTimeEndingFrame.isSame(dayjs(), 'day')) {
          setTodayActive(false);
          setLastWeekActive(false);
          setLast3MonthsActive(true);
        } else if (date.isSame(dayjs(), 'day') && selectedTimeEndingFrame.isSame(dayjs(), 'day')) {
          setTodayActive(true);
          setLastWeekActive(false);
          setLast3MonthsActive(false);
        } else {
          setSelectedEndingTimeFrame(dayjs());
          setTodayActive(false);
          setLastWeekActive(false);
          setLast3MonthsActive(false);
        }
      };
    
      const handleEndingDateChange = (date) => {
        setSelectedEndingTimeFrame(date);
      
        if (
          selectedTimeStartingFrame.isSame(dayjs().subtract(1, 'week'), 'day') &&
          date.isSame(dayjs(), 'day')
        ) {
          setTodayActive(false);
          setLastWeekActive(true);
          setLast3MonthsActive(false);
        } else if (
          selectedTimeStartingFrame.isSame(dayjs().subtract(3, 'months'), 'day') &&
          date.isSame(dayjs(), 'day')
        ) {
          setTodayActive(false);
          setLastWeekActive(false);
          setLast3MonthsActive(true);
        } else if (
          selectedTimeStartingFrame.isSame(dayjs(), 'day') &&
          date.isSame(dayjs(), 'day')
        ) {
          setTodayActive(true);
          setLastWeekActive(false);
          setLast3MonthsActive(false);
        } else {
          setTodayActive(false);
          setLastWeekActive(false);
          setLast3MonthsActive(false);
        }
      };
      useEffect(() => {
        if (
            selectedTimeStartingFrame.isSame(today, 'day') &&
            selectedTimeEndingFrame.isSame(today, 'day')
          ) {
            setTodayActive(true);
          } else {
            setTodayActive(false);
          }
        if (
          selectedTimeStartingFrame.isSame(lastWeek, 'day') &&
          selectedTimeEndingFrame.isSame(today, 'day')
        ) {
          setLastWeekActive(true);
        } else {
          setLastWeekActive(false);
        }
    
        if (
          selectedTimeStartingFrame.isSame(last3Months, 'day') &&
          selectedTimeEndingFrame.isSame(today, 'day')
        ) {
          setLast3MonthsActive(true);
        } else {
          setLast3MonthsActive(false);
        }
      }, [selectedTimeStartingFrame, selectedTimeEndingFrame]);

  return (
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
        <Button
          variant={todayActive ? 'contained' : 'outlined'}
          color="primary"
          style={{ width: '14%', fontSize: '1rem' }}
          onClick={toggleToday}
        >
          Today
        </Button>
        <Button
          variant={lastWeekActive ? 'contained' : 'outlined'}
          color="primary"
          style={{ width: '14%', fontSize: '1rem' }}
          onClick={toggleLastWeek}
        >
          Last Week
        </Button>
        <Button
          variant={last3MonthsActive ? 'contained' : 'outlined'}
          color="primary"
          style={{ width: '14%', fontSize: '1rem' }}
          onClick={toggleLast3Months}
        >
          Last 3 Months
        </Button>
            <DateTimePicker label="Starting Date" value={selectedTimeStartingFrame} onChange={handleStartingDateChange} />
          
            <DateTimePicker label="Ending Date" value={selectedTimeEndingFrame} style={{marginRight:'6px'}} onChange={handleEndingDateChange} />
          
            <Button variant="contained" onClick={onApply}  style={{ marginTop: '1px',marginLeft:'6px', fontSize: '1.3rem' }}>
              APPLY
        </Button>
        </div>
  );
}

export default DateSelector;