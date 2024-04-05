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
      console.log('Document data:', docSnap.data());
    } else {
      setLoading(false);
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
      router.replace('/create-business');
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div>Dashboard</div>
      <LogoutLink>
        <Button>Logout</Button>
      </LogoutLink>
    </>
  );
};

export default Dashboard;
