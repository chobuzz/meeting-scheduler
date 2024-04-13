'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

const PreviewMeeting = ({ formData }) => {
  console.log('formData', formData);

  useEffect(() => {
    formData && createTimeSlot(formData.duration);
    console.log('timeSlots', timeSlots);
  }, [formData]);

  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);

  const createTimeSlot = (interval) => {
    const startTime = 8 * 60; // 8 AM in minutes
    const endTime = 22 * 60; // 10 PM in minutes
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
      const period = hours >= 12 ? 'PM' : 'AM';
      return `${String(formattedHours).padStart(2, '0')}:${String(
        minutes
      ).padStart(2, '0')} ${period}`;
    });

    setTimeSlots(slots);
  };

  return (
    <div
      className='m-4 p-8 border-t-8 shadow-md rounded-lg'
      style={{ borderColor: formData.meetingColor }}
    >
      <div className='flex justify-between items-center text-4xl font-bold pb-12'>
        <h1>Preview</h1>
        <Image
          src='/logo.svg'
          width={200}
          height={200}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-8 gap-4 '>
        <div className='border-r'>
          <p className=' text-md text-slate-500'>Meeting Name</p>
          <p className='font-bold text-3xl'>
            {formData.meetingName ? formData.meetingName : 'Meeting Name'}
          </p>
          <div className='flex flex-col pt-4 gap-2'>
            <div className='flex items-center gap-2'>
              <Clock />
              <p className='text-lg'>{formData.duration}</p>
            </div>
            <div className='flex items-center gap-2'>
              <MapPin />
              <p className='text-lg'>{formData.location}</p>
            </div>
          </div>
          <Link href=''>
            <p className='text-lg pt-4 text-primary'>{formData.meetingUrl}</p>
          </Link>
        </div>
        <div>
          <p className='font-bold text-xl pb-4'>Select Date & Time</p>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            className='rounded-md'
            disabled={(selectedDate) => selectedDate < new Date()}
          />
        </div>
        <div className='flex flex-col overflow-auto gap-4 max-h-[400px]'>
          {timeSlots?.map((slot, index) => (
            <Button
              variant='outline'
              className='text-primary border-primary'
            >
              {slot}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewMeeting;
