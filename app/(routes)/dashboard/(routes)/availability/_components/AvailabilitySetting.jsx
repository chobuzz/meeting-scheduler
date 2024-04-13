'use client';
import React, { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '@/config/FirebaseConfig';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { toast } from 'sonner';

const days = [
  {
    day: 'Monday',
  },
  {
    day: 'Tuesday',
  },
  {
    day: 'Wednesday',
  },
  {
    day: 'Thursday',
  },
  {
    day: 'Friday',
  },
  {
    day: 'Saturday',
  },
  {
    day: 'Sunday',
  },
];

const AvailabilitySetting = () => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    user && getAvailability();
  }, [user]);

  const [checkedDays, setCheckedDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const getAvailability = async () => {
    const docRef = doc(db, 'Business', user?.email);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    setCheckedDays(result.daysAvailable);
    setStartTime(result.startTime);
    setEndTime(result.endTime);
  };
  const onChangeCheckBox = (day, value) => {
    setCheckedDays({ ...checkedDays, [day]: value });
    console.log(checkedDays);
  };

  const handleSubmit = async () => {
    const docRef = doc(db, 'Business', user?.email);
    await updateDoc(docRef, {
      daysAvailable: checkedDays,
      startTime: startTime,
      endTime: endTime,
    }).then((res) => {
      toast('Availability Updated!');
    });
    console.log(checkedDays, startTime, endTime);
  };

  return (
    <div>
      <h1 className='font-bold'>Availiability Days</h1>
      <div className='grid grid-cols-2 md:grid-cols-4 mt-4 max-w-5xl'>
        {days.map((item, index) => (
          <div
            key={index}
            className='flex gap-2 items-center'
          >
            <Checkbox
              checked={checkedDays && checkedDays[item?.day] ? true : false}
              onCheckedChange={(e) => {
                onChangeCheckBox(item.day, e);
              }}
            />
            <label>{item.day}</label>
          </div>
        ))}
      </div>
      <h1 className='font-bold mt-16'>Availiability Time</h1>
      <div className='flex mt-4 gap-8'>
        <div>
          <p className='font-medium'>Start Time</p>
          <Input
            type='time'
            onChange={(e) => setStartTime(e.target.value)}
            value={startTime}
          />
        </div>
        <div>
          <p className='font-medium'>End Time</p>
          <Input
            type='time'
            onChange={(e) => setEndTime(e.target.value)}
            value={endTime}
          />
        </div>
      </div>
      <Button
        onClick={(e) => {
          handleSubmit(e);
        }}
        className='mt-16 text-md'
      >
        Save
      </Button>
    </div>
  );
};

export default AvailabilitySetting;
