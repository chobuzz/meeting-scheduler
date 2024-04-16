import React from 'react';
import { Button } from '@/components/ui/button';

const MeetingTime = ({
  timeSlots,
  meetingTime,
  setMeetingTime,
  enabledDay,
  prevBookedTime,
}) => {
  const clickedTime = (time) => {
    setMeetingTime(time);
  };

  const checkPrevTime = (time) => {
    return prevBookedTime.includes(time);
  };

  console.log('prevBookedTime', prevBookedTime);

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col overflow-auto gap-4 max-h-[400px]'>
        {timeSlots?.map((slot, index) => (
          <Button
            variant='outline'
            className={`text-primary border-primary ${
              slot === meetingTime && 'bg-slate-100'
            } `}
            disabled={!enabledDay || checkPrevTime(slot)}
            key={index}
            onClick={() => clickedTime(slot)}
          >
            {slot}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MeetingTime;
