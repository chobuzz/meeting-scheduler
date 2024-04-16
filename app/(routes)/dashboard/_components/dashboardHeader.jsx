'use client';
import React from 'react';
import {
  LogoutLink,
  useKindeBrowserClient,
} from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const DashboardHedader = () => {
  const { user } = useKindeBrowserClient();
  return (
    <div className='float-right m-4'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='flex items-center'>
            <Image
              src={user?.picture}
              alt='userImage'
              width={40}
              height={40}
              className='rounded-full float-right cursor-pointer'
            />

            <ChevronDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link href='/dashboard/settings'>Settings</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <LogoutLink>Logout</LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashboardHedader;
