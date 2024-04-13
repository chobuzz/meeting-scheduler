import React from 'react';
import AvailabilitySetting from './_components/AvailabilitySetting';

const Availability = () => {
  return (
    <div>
      <div className='flex flex-col p-8 gap-8  w-full'>
        <h1 className='text-3xl font-bold mt-16'>Availability</h1>
        <hr className='block'></hr>
        <AvailabilitySetting />
      </div>
    </div>
  );
};

export default Availability;
