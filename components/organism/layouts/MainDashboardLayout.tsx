'use client';
import React from 'react';
import { DashboardSidebar } from '@/components/ui/display/dashboard-sidebar';

const MainDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <div className="h-full sticky top-0 z-50">
        <DashboardSidebar />
      </div>

      <main className="flex-1 overflow-y-auto p-4 pt-16 md:p-6 md:pt-6">
        {children}
      </main>
    </div>
  );
};

export default MainDashboardLayout;
