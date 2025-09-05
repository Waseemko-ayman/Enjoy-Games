/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Loading from '@/components/molecules/loading';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

const BodyWrapper = ({ children }: { children: React.ReactNode }) => {
  const [, setMainContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMainContent = async () => {
      try {
        const res = await fetch('/api/proxy');
        const data = await res.json();
        setMainContent(data);
      } catch (error) {
        console.error('Error fetching main content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMainContent();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default BodyWrapper;
