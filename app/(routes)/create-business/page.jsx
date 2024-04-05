'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { getFirestore } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { app } from '@/config/FirebaseConfig';

const CreateBusiness = () => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  const router = useRouter();

  const [businessName, setBusinesName] = useState('');
  const onCreateBusiness = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, 'Business', user.email), {
      businessName: { businessName },
      email: user.email,
      userName: user.given_name + ' ' + user.family_name,
    }).then(() => {
      router.replace('/dashboard');
    });
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-8'>
      <div className='flex flex-col items-center justify-center gap-16'>
        <Image
          src='/logo.svg'
          width={200}
          height={200}
          alt='logo'
        />
        <div className='flex flex-col items-center max-w-xl gap-8'>
          <h2 className='text-xl md:text-3xl font-bold text-center'>
            What should we call your business?
          </h2>
          <p className='text-slate-500 text-sm md:text-lg'>
            You can always change this from settings
          </p>
          <div className='flex flex-col w-full gap-2 '>
            <label className='text-slate-300'>Business Name</label>
            <Input
              type='text'
              placeholder='ex. Buzz Scheduler'
              onChange={(e) => setBusinesName(e.target.value)}
            />
            <Button
              className='w-full'
              onClick={(e) => onCreateBusiness(e)}
              disabled={!businessName}
            >
              Create Business
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateBusiness;
