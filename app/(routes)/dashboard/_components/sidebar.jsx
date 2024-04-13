'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CalendarCheck, Briefcase, Clock, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideNavBar = () => {
  const pathname = usePathname();

  const [selectedMenu, setSelectedMenu] = useState(pathname);

  useEffect(() => {
    pathname && setSelectedMenu(pathname);
  }, [pathname]);

  const menuList = [
    {
      id: 1,
      name: 'Meeting Type',
      domain: '/dashboard/meeting-type',
      icon: Briefcase,
    },
    {
      id: 2,
      name: 'Scheduled Meeting',
      domain: '/dashboard/scheduled-meeting',
      icon: CalendarCheck,
    },
    {
      id: 3,
      name: 'Availability',
      domain: '/dashboard/availability',
      icon: Clock,
    },
    {
      id: 4,
      name: 'Settings',
      domain: '/dashboard/settings',
      icon: Settings,
    },
  ];
  return (
    <div className='hidden md:block bg-slate-100 min-h-screen w-64'>
      <div className='flex flex-col p-4 justify-center items-center'>
        <Image
          src='/logo.svg'
          width={200}
          height={200}
          alt='logo'
          className='cursor-pointer w-full pr-2 mt-6'
          priority={true}
        />
        <Link
          href='/create-meeting'
          className='w-full'
        >
          <Button className='w-full rounded-3xl mt-6'>
            <Plus className='pr-2' /> Create
          </Button>
        </Link>
      </div>
      <div className='flex flex-col'>
        {menuList.map((item, _) => {
          return (
            <div
              className='py-2'
              key={item.id}
            >
              <Link href={item.domain}>
                <Button
                  variant='ghost'
                  className={`justify-start w-full ${
                    selectedMenu == item.domain && 'text-primary bg-blue-100'
                  }`}
                >
                  <item.icon className='mr-2' />
                  {item.name}
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideNavBar;
