import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const MeetingDate = ({
  setDate,
  date,
  businessInfo,
  enabledDay,
  setEnabledDay,
}) => {
  const clickedDate = (date) => {
    setDate(date);
    const day = format(date, 'EEEE');
    if (businessInfo?.daysAvailable?.[day]) {
      setEnabledDay(true);
    } else {
      setEnabledDay(false);
    }
    console.log('enabledDay', enabledDay);
  };

  return (
    <div>
      <p className='font-bold text-xl pb-4'>Select Date & Time</p>
      <Calendar
        mode='single'
        selected={date}
        onSelect={(d) => clickedDate(d)}
        className='rounded-md'
        disabled={(selectedDate) => selectedDate < new Date()}
      />
    </div>
  );
};

export default MeetingDate;
