import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MainDashboardLayout from '@/components/organism/layouts/MainDashboardLayout';
import type React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <MainDashboardLayout>{children}</MainDashboardLayout>
    </ProtectedRoute>
  );
}
