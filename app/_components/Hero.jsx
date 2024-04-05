'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <div className='flex flex-col mt-20 gap-4 text-center items-center justify-center p-16 '>
      <div className='max-w-3xl'>
        <h1 className='text-4xl font-bold'>Easy scheduling ahead</h1>
        <p className='my-4 text-lg'>
          Buzz Scheduler is your scheduling automation platform for eliminating
          the back-and-forth emails to find the perfect time - and so much more
        </p>
        <p className='font-bold mt-14 text-xl mb-4'>
          Sign Up free with Google and Facebook
        </p>

        <div className='flex flex-col items-center justify-center w-sm gap-4 md:flex-row md:gap-20 '>
          <Button className='gap-2 w-full'>
            <Image
              src='/google.svg'
              width={40}
              height={40}
              className='p-2'
            />
            Sign up with Google
          </Button>
          <Button className='gap-2 w-full'>
            <Image
              src='/facebook.svg'
              width={40}
              height={40}
              className='p-2'
            />
            Sign up with Facebook
          </Button>
        </div>
        <div className='border my-4 w-full border-b-1 border-gray-200' />
        <p>
          <Link
            href={'/'}
            className='text-primary'
          >
            Sign up
          </Link>{' '}
          Free Email. No Credit Card required
        </p>
      </div>
    </div>
  );
};

export default Hero;
