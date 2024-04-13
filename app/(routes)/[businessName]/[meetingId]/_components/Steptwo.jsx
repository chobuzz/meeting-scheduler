import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const Steptwo = ({ setName, setEmail, setNotes, name, email, notes }) => {
  return (
    <div className='flex flex-col col-span-2 w-full h-full'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col w-60'>
          <Label
            className='font-bold'
            htmlFor='Name'
          >
            Name*
          </Label>
          <Input
            type='text'
            id='Name'
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className='flex flex-col w-60'>
          <Label
            className='font-bold'
            htmlFor='email'
          >
            Email*
          </Label>
          <Input
            type='email'
            id='email'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className='flex flex-col w-full'>
          <Label
            className='font-bold'
            htmlFor='notes'
          >
            Share any Notes
          </Label>
          <Textarea
            id='notes'
            placeholder='Type your message here.'
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
        </div>
      </div>
    </div>
  );
};

export default Steptwo;
