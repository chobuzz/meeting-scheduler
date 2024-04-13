'use client';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '@/config/FirebaseConfig';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const LocationOptions = [
  {
    id: 1,
    svg: '/googleMeet.svg',
    name: 'Google Meet',
  },
  {
    id: 2,
    svg: '/zoom.svg',
    name: 'Zoom',
  },
  {
    id: 3,
    svg: '/phone.svg',
    name: 'Phone',
  },
  {
    id: 4,
    svg: '/message.svg',
    name: 'Others',
  },
];

const ColorOptions = ['#4F75FE', '#13C38B', '#9F3CFE', '#FF555D', '#FF7D4F'];

const CreateForm = ({ setFormData }) => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const [meetingName, setMeetingName] = useState('');
  const [duration, setDuration] = useState(30);
  const [location, setLocation] = useState('');
  const [meetingUrl, setMeetingUrl] = useState('');
  const [meetingColor, setMeetingColor] = useState('');

  useEffect(() => {
    setFormData({
      meetingName,
      duration,
      location,
      meetingUrl,
      meetingColor,
    });
  }, [meetingName, duration, location, meetingUrl, meetingColor]);

  const onCreateMeeting = async (e) => {
    e.preventDefault();
    const id = Date.now().toString();
    console.log('id', id);
    await setDoc(doc(db, 'MeetingEvent', id), {
      id,
      meetingName,
      duration,
      location,
      meetingUrl,
      meetingColor,
      businessId: doc(db, 'Business', user?.email),
      createBy: user?.email,
    });
    toast('New Meeting Event Created!');
    router.replace('/dashboard/meeting-type');
  };

  return (
    <div className='flex flex-col border min-h-screen shadow-lg p-4 '>
      <Link href='/dashboard'>
        <div className='flex justify-start cursor-pointer items-center'>
          <ChevronLeft />
          <p className='text-sm'>Cancel</p>
        </div>
      </Link>

      <div className='flex flex-col mt-8 gap-8'>
        <div className='flex flex-col gap-4'>
          <label className='text-xl font-bold'>Meeting Name*</label>
          <Input
            placeholder='Enter Meeting Name'
            onChange={(e) => {
              setMeetingName(e.target.value);
            }}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <label className='text-xl font-bold'>Meeting Time*</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='max-w-40'
              >
                {duration} Min
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-40'>
              <DropdownMenuItem onClick={() => setDuration(15)}>
                15 Min
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDuration(30)}>
                30 Min
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDuration(45)}>
                45 Min
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDuration(60)}>
                60 Min
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex flex-col gap-4'>
          <label className='text-xl font-bold'>Meeting Location*</label>
          <div className='grid grid-cols-4 gap-4'>
            {LocationOptions.map((option) => {
              return (
                <div
                  key={option.id}
                  className={`flex border p-4 items-center justify-center ${
                    location == option.name && 'border-primary bg-blue-100'
                  }`}
                >
                  <Image
                    src={option.svg}
                    width={40}
                    height={40}
                    alt={option.name}
                    onClick={() => {
                      setLocation(option.name);
                    }}
                  />
                </div>
              );
            })}
          </div>
          {location && (
            <div className='flex flex-col gap-4'>
              <label className='text-xl font-bold'>Meeting Url*</label>
              <Input
                placeholder='Enter Meeting Url'
                onChange={(e) => {
                  setMeetingUrl(e.target.value);
                }}
              />
            </div>
          )}
        </div>
        <div className='flex flex-col gap-4'>
          <label className='text-xl font-bold'>Meeting Color*</label>
          <div className='grid grid-cols-5'>
            {ColorOptions.map((color) => {
              return (
                <div
                  onClick={() => {
                    setMeetingColor(color);
                    console.log('meetingcolor', meetingColor);
                  }}
                  className={`w-10 h-10 rounded-full ${
                    meetingColor == color && 'border-4 border-black'
                  }`}
                  style={{ backgroundColor: color }}
                  key={color}
                />
              );
            })}
          </div>
        </div>
        <div>
          <Button
            disabled={
              !(
                meetingName &&
                meetingUrl &&
                meetingColor &&
                location &&
                duration
              )
            }
            className='w-full my-4'
            onClick={(e) => onCreateMeeting(e)}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
