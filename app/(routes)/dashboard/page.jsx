'use client';
import { Button } from '@/components/ui/button';
import {
  LogoutLink,
  useKindeBrowserClient,
} from '@kinde-oss/kinde-auth-nextjs';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '@/config/FirebaseConfig';
import { useRouter } from 'next/navigation';
import MeetingType from './(routes)/meeting-type/page';

const Dashboard = () => {
  // reach out to our firebaseDb
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    user && isBusinessRegistered();
  }, [user]);
  const isBusinessRegistered = async () => {
    // check if business is registered
    const docRef = doc(db, 'Business', user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setLoading(false);
    } else {
      setLoading(false);
      // docSnap.data() will be undefined in this case
      router.replace('/create-business');
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className='min-w-screen'>
      <MeetingType />
    </div>
  );
};

export default Dashboard;
