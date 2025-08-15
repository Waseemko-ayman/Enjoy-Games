'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Download, Filter } from 'lucide-react';
import { format } from 'date-fns';
import PageTitle from '@/components/ui/common/PageTitle';
import DonationOverview from './Sections/DonationOverview';
import FinancialReports from './Sections/FinancialReports';
import SavedReports from './Sections/SavedReports';
import TabsNavigation from '@/components/ui/display/TabsNavigation';

const ReportsPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isMounted, setIsMounted] = useState(false);

  // Client-side only
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const tabsData = [
    { value: 'overview', label: 'Overview' },
    { value: 'financial', label: 'Financial' },
    { value: 'saved', label: 'Saved Reports' },
  ];

  return (
    <div className="space-y-6">
      <PageTitle
        title="Reports"
        description="View and download financial reports and analytics"
      />

      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-start text-left font-normal h-9 px-3"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button variant="outline" size="sm" className="h-9">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button size="sm" className="h-9">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsNavigation tabs={tabsData} />
        <DonationOverview isMounted={isMounted} />
        <FinancialReports isMounted={isMounted} />
        <SavedReports />
      </Tabs>
    </div>
  );
};

export default ReportsPage;
