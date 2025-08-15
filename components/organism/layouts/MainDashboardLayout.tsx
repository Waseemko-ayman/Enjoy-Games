'use client';
import React from 'react';
import { DashboardSidebar } from '@/components/ui/display/dashboard-sidebar';

const MainDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-white">
      <DashboardSidebar />
      <main className="flex-1 p-4 pt-16 md:p-6 md:pt-6 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

export default MainDashboardLayout;
