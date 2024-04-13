import { Input } from '@/components/ui/input';
import React from 'react';
import MeetingEventList from './_components/meetingEventList';

const MeetingType = () => {
  return (
    <div>
      <div className='flex flex-col p-8 gap-8  w-full'>
        <h1 className='text-3xl font-bold mt-16'>MeetingType</h1>
        <Input
          className='max-w-xs'
          placeholder='Search'
        />
        <hr className='block'></hr>
        <MeetingEventList />
      </div>
    </div>
  );
};

export default MeetingType;
