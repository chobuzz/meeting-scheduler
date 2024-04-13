import React from 'react';
import SideNavBar from './_components/sidebar';
import DashboardHedader from './_components/dashboardHeader';

const layout = ({ children }) => {
  return (
    <div className='flex'>
      <SideNavBar />
      <div className='w-full'>
        <DashboardHedader />
        {children}
      </div>
    </div>
  );
};

export default layout;
