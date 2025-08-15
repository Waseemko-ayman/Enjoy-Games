'use client';

import { Button } from '@/components/ui/button';
import { CalendarIcon, Download, Filter } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function OrdersHeader() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const t = useTranslations();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {t('PagesHeaderTitles.orders')}
        </h1>
        <p className="text-muted-foreground">{t('Dashboard.desc')}</p>
      </div>
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
          {t('BtnTexts.filter')}
        </Button>
        <Button size="sm" className="h-9">
          <Download className="mr-2 h-4 w-4" />
          {t('BtnTexts.export')}
        </Button>
      </div>
    </div>
  );
}
