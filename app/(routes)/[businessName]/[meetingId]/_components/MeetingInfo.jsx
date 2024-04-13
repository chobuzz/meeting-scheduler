import React, { useEffect, useState } from 'react';
import { Clock, MapPin, CalendarCheck, Timer } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

const MeetingInfo = ({ meetingInfo, businessInfo, date, meetingTime }) => {
  return (
    <div className='border-r pr-8'>
      <p className=' text-md text-slate-500'>{businessInfo.businessName}</p>
      <p className='font-bold text-3xl'>
        {meetingInfo.meetingName ? meetingInfo.meetingName : 'Meeting Name'}
      </p>
      <div className='flex flex-col pt-4 gap-2'>
        <div className='flex items-center gap-2'>
          <Clock />
          <p className='text-lg'>{meetingInfo.duration}</p>
        </div>
        <div className='flex items-center gap-2'>
          <MapPin />
          <p className='text-lg'>{meetingInfo.location}</p>
        </div>
        <div className='flex items-center gap-2'>
          <CalendarCheck />
          <p className='text-lg'>{format(date, 'PPP')}</p>
        </div>
        <div className='flex items-center gap-2'>
          <Timer />
          <p className='text-lg'>{meetingTime}</p>
        </div>
      </div>
      <Link href=''>
        <p className='text-lg pt-4 text-primary'>{meetingInfo.meetingUrl}</p>
      </Link>
    </div>
  );
};

export default MeetingInfo;
