'use client';
import React, { useEffect, useState } from 'react';
import CreateForm from './_components/createForm';
import PreviewMeeting from './_components/previewMeeting';

const CreateMeeting = () => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <div className='grid grid-cols-3 min-w-max'>
      <div className='col-span-1'>
        <CreateForm setFormData={(v) => setFormData(v)} />
      </div>
      <div className='col-span-2'>
        <PreviewMeeting formData={formData} />
      </div>
    </div>
  );
};

export default CreateMeeting;
