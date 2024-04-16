import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CalendarCheck, Clock, Timer, NotebookPen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function MeetingList({ meetingList }) {
  console.log('meetingList', meetingList);

  return (
    <div>
      {meetingList.length == 0 ? (
        <div>No meeting scheduled</div>
      ) : (
        meetingList.map((meeting, index) => (
          <Accordion
            type='single'
            collapsible
            key={index}
          >
            <AccordionItem value='item-1'>
              <AccordionTrigger>{meeting?.date}</AccordionTrigger>
              <AccordionContent>
                <div>
                  <div className='mt-5 flex flex-col gap-4'>
                    <h2 className='flex gap-2 items-center'>
                      <CalendarCheck />
                      {meeting.date}{' '}
                    </h2>
                    <h2 className='flex gap-2 items-center'>
                      <Timer />
                      {meeting.meetingTime}{' '}
                    </h2>
                    <h2 className='flex gap-2 items-center'>
                      <Clock />
                      {meeting?.duration} Min{' '}
                    </h2>
                    <h2 className='flex gap-2 items-center'>
                      <NotebookPen />
                      {meeting?.notes}
                    </h2>
                    <Link
                      href={meeting?.meetingUrl ? meeting?.meetingUrl : '#'}
                      className='text-primary'
                    >
                      {meeting?.meetingUrl}
                    </Link>
                  </div>
                  <Link href={meeting.meetingUrl}>
                    <Button className='mt-5'>Join Now</Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))
      )}
    </div>
  );
}

export default MeetingList;
