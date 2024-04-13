'use client';
import React, { useEffect, useState } from 'react';
import { app } from '@/config/FirebaseConfig';
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  orderBy,
} from 'firebase/firestore';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Settings, Clock, MapPin, Copy, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const MeetingEventList = () => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  const [eventList, setEventList] = useState([]);
  const [businessName, setBusinessName] = useState('');

  useEffect(() => {
    user && getEventList();
    user && getBusiness();
  }, [user]);

  const getEventList = async () => {
    setEventList([]);

    const q = query(
      collection(db, 'MeetingEvent'),
      where('createBy', '==', user?.email),
      orderBy('id', 'desc')
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      setEventList((prevEvent) => [...prevEvent, doc.data()]);
    });
  };

  const getBusiness = async () => {
    const docRef = doc(db, 'Business', user?.email);
    const docSnap = await getDoc(docRef);
    setBusinessName(docSnap.data().businessName);
  };

  const onCopyLink = (event) => {
    const meetingUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${businessName}/${event?.id}`;
    navigator.clipboard.writeText(meetingUrl);
    console.log('event', event);
    toast('Link Copied!');
  };

  const handleDelete = async (event) => {
    await deleteDoc(doc(db, 'MeetingEvent', event?.id)).then((resp) => {
      toast('Event Deleted!');
      getEventList();
      console.log('event.id', typeof event?.id);
    });
  };

  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {eventList.length > 0 ? (
        eventList?.map((event, index) => {
          return (
            <div
              className='flex flex-col shadow-lg rounded-lg border border-t-8 max-w-xl'
              style={{ borderTopColor: event?.meetingColor }}
            >
              <div className='p-2'>
                <div className='flex justify-end'>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Settings />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className='flex gap-1'>
                        <Pencil className='w-4 h-4 ' />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className='flex gap-1'
                        onClick={() => handleDelete(event)}
                      >
                        <Trash2 className='w-4 h-4 ' />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className='text-xs text-slate-300'>Meeting Name</p>
                <h2 className='text-lg lg:text-2xl font-bold'>
                  {event?.meetingName}
                </h2>
                <div className='flex justify-between pt-4 pb-2'>
                  <div className='flex gap-1 justify-center items-center text-slate-400'>
                    <Clock width={20} />
                    <p className='text-sm '>{event?.duration}Min</p>
                  </div>
                  <div className='flex gap-1 justify-center items-center text-slate-400'>
                    <MapPin width={20} />
                    <p className='text-sm '>{event?.location}</p>
                  </div>
                </div>
                <hr className='block'></hr>
                <div className='flex justify-between pt-4 '>
                  <div
                    onClick={() => onCopyLink(event)}
                    className='flex gap-1 cursor-pointer justify-center items-center text-primary'
                  >
                    <Copy width={15} />
                    <p className='text-xs '>Copy Link</p>
                  </div>
                  <div className='flex gap-1 justify-center items-center text-primary'>
                    <Button
                      className='border-primary rounded-full'
                      variant='outline'
                    >
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h2>No Event Found</h2>
      )}
    </div>
  );
};

export default MeetingEventList;
