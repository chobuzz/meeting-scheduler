'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import MeetingInfo from './MeetingInfo';
import MeetingDate from './MeetingDate';
import MeetingTime from './MeetingTime';
import Steptwo from './Steptwo';
import { Button } from '@/components/ui/button';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '@/config/FirebaseConfig';
import { toast } from 'sonner';

const SelectMeeting = ({ meetingInfo, businessInfo }) => {
  const db = getFirestore(app);

  useEffect(() => {
    meetingInfo && createTimeSlot(meetingInfo.duration);
  }, [meetingInfo]);

  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [enabledDay, setEnabledDay] = useState(false);
  const [meetingTime, setMeetingTime] = useState('');
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

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

  const handleBookMeeting = async () => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(regex)) {
      const id = Date.now().toString();
      const docData = {
        businessInfo: businessInfo,
        meetingInfo: meetingInfo,
        date: date,
        meetingTime: meetingTime,
        name: name,
        email: email,
        notes: notes,
        id: id,
      };
      await setDoc(doc(db, 'BookedMeeting', id), docData);
      toast('Meeting booked successfully!');
    } else {
      toast('Please enter a valid email address!');
    }
  };

  return (
    <div
      className='flex flex-col m-4 p-8 border-t-8 shadow-md rounded-lg'
      style={{ borderColor: meetingInfo.meetingColor }}
    >
      <div className='flex justify-between items-center text-4xl font-bold pb-12'>
        <h1>Book Meeting</h1>
        <Image
          src='/logo.svg'
          width={200}
          height={200}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-8 gap-4 '>
        <MeetingInfo
          meetingInfo={meetingInfo}
          businessInfo={businessInfo}
          date={date}
          meetingTime={meetingTime}
        />
        {step == 1 ? (
          <>
            <MeetingDate
              setDate={setDate}
              date={date}
              businessInfo={businessInfo}
              enabledDay={enabledDay}
              setEnabledDay={setEnabledDay}
            />
            <MeetingTime
              timeSlots={timeSlots}
              meetingTime={meetingTime}
              setMeetingTime={setMeetingTime}
              enabledDay={enabledDay}
              setStep={setStep}
            />
          </>
        ) : (
          <Steptwo
            setStep={setStep}
            setName={setName}
            setEmail={setEmail}
            setNotes={setNotes}
            name={name}
            email={email}
            notes={notes}
          />
        )}
      </div>
      {step == 1 ? (
        <div className='flex justify-end'>
          <Button
            className='mt-8 w-min'
            variant='default'
            disabled={!enabledDay || !meetingTime}
            onClick={() => setStep(2)}
          >
            Next
          </Button>
        </div>
      ) : (
        <div className='flex w-full h-full gap-4 justify-end items-end mt-16'>
          <Button
            onClick={() => setStep(1)}
            variant='outline'
          >
            Back
          </Button>
          <Button
            onClick={() => handleBookMeeting()}
            variant='default'
            disabled={!name || !email || !notes}
          >
            Schedule
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectMeeting;
