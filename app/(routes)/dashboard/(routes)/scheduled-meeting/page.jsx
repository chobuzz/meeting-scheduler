'use client';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { app } from '@/config/FirebaseConfig';
import { format } from 'date-fns';
import MeetingList from './components/MeetingList';

const ScheduledMeeting = () => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    user && getBookedMeeting();
  }, [user]);

  const [bookedMeeting, setBookedMeeting] = useState([]);

  const getBookedMeeting = async () => {
    setBookedMeeting([]);
    const q = query(
      collection(db, 'BookedMeeting'),
      where('hostEmail', '==', user?.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBookedMeeting((prev) => [...prev, doc.data()]);
    });
  };

  const classifyMeeting = (type) => {
    if (type === 'upcoming') {
      return bookedMeeting.filter(
        (meeting) => meeting.formattedDate >= format(new Date(), 't')
      );
    } else if (type === 'expired') {
      return bookedMeeting.filter(
        (meeting) => meeting.formattedDate < format(new Date(), 't')
      );
    }
  };

  return (
    <div>
      <div className='flex flex-col p-8 gap-8  w-full'>
        <h1 className='text-3xl font-bold mt-16'>Scheduled-meeting</h1>
        <hr className='block'></hr>
        <Tabs
          defaultValue='Upcoming'
          className='w-[400px]'
        >
          <TabsList>
            <TabsTrigger value='Upcoming'>Upcoming</TabsTrigger>
            <TabsTrigger value='Expired'>Expired</TabsTrigger>
          </TabsList>
          <TabsContent value='Upcoming'>
            <MeetingList meetingList={classifyMeeting('upcoming')} />
          </TabsContent>
          <TabsContent value='Expired'>
            <MeetingList meetingList={classifyMeeting('expired')} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ScheduledMeeting;
