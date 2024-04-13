'use client';
import { app } from '@/config/FirebaseConfig';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import SelectMeeting from './_components/SelectMeeting';

const BookMeeting = ({ params }) => {
  const db = getFirestore(app);

  const [businessInfo, setBusinessInfo] = useState({});
  const [meetingInfo, setMeetingInfo] = useState({});

  useEffect(() => {
    console.log(params);
    params && getBusinessandMeetingInfo();
  }, [params]);

  const getBusinessandMeetingInfo = async () => {
    const q = query(
      collection(db, 'Business'),
      where('businessName', '==', params.businessName)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessInfo(doc.data());
    });

    const docRef = doc(db, 'MeetingEvent', params.meetingId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setMeetingInfo(docSnap.data());
    } else {
      alert("Can't find meeting");
    }
  };

  console.log('params', params);

  console.log('businessInfo', businessInfo);
  console.log('meetingInfo', meetingInfo);

  return (
    <div className='flex items-center justify-center h-screen'>
      <SelectMeeting
        meetingInfo={meetingInfo}
        businessInfo={businessInfo}
      />
    </div>
  );
};

export default BookMeeting;
