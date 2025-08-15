import MainDashboardLayout from '@/components/organism/layouts/MainDashboardLayout';
import type React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainDashboardLayout>{children}</MainDashboardLayout>;
}
