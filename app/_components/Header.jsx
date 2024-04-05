'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs';

const Header = () => {
  return (
    <header className='flex justify-between items-center p-4'>
      <Image
        src='/logo.svg'
        width={200}
        height={100}
      />
      <ul className='hidden lg:flex gap-16 font-medium cursor-pointer'>
        <li className='hover:text-primary'>Products</li>
        <li className='hover:text-primary'>Pricing</li>
        <li className='hover:text-primary'>Contact us</li>
        <li className='hover:text-primary'>About us</li>
      </ul>
      <div className='flex gap-4'>
        <LoginLink>
          <Button variant='ghost'>Login</Button>
        </LoginLink>
        <RegisterLink>
          <Button>Get Start</Button>
        </RegisterLink>
      </div>
    </header>
  );
};

export default Header;
