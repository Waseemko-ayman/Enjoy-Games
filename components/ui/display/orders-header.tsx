'use client';

import { Button } from '@/components/ui/button';
import { CalendarIcon, Filter } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import { FaGlobe } from 'react-icons/fa6';
import { useToggleLocale } from '@/hook/useToggleLocale';

export function OrdersHeader({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onFilter,
  addLoading,
  errors,
  setErrors,
}: {
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  onFilter: () => void;
  addLoading: boolean;
  errors: { start?: boolean; end?: boolean };
  setErrors: React.Dispatch<
    React.SetStateAction<{ start?: boolean; end?: boolean }>
  >;
}) {
  const t = useTranslations();
  const langTexts = useTranslations('Languages');
  const { toggleLocale, isArabic } = useToggleLocale();

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
              className={`justify-start text-left font-normal h-9 px-3 ${
                errors.start ? 'border-red-500' : ''
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? (
                format(startDate, 'PPP')
              ) : (
                <span>{t('Dashboard.Chart.selectStartDate')}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => {
                setStartDate(date);
                setErrors((prev) => ({ ...prev, start: false }));
              }}
              disabled={(date) =>
                date > new Date() || date < new Date('1900-01-01')
              }
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`justify-start text-left font-normal h-9 px-3 ${
                errors.end ? 'border-red-500' : ''
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? (
                format(endDate, 'PPP')
              ) : (
                <span>{t('Dashboard.Chart.selectEndDate')}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={(date) => {
                setEndDate(date);
                setErrors((prev) => ({ ...prev, end: false }));
              }}
              disabled={(date) =>
                date > new Date() || date < new Date('1900-01-01')
              }
            />
          </PopoverContent>
        </Popover>
        <Button
          variant="outline"
          size="sm"
          className="h-9"
          onClick={() => onFilter()}
          disabled={addLoading}
        >
          {addLoading ? (
            <ButtonLoading />
          ) : (
            <>
              <Filter className="mr-2 h-4 w-4" />
              {t('BtnTexts.filter')}
            </>
          )}
        </Button>
        <Button size="sm" className="h-9" onClick={toggleLocale}>
          <FaGlobe className="mr-2 h-4 w-4" />
          {isArabic ? langTexts('english') : langTexts('arabic')}
        </Button>
        {/* <Button size="sm" className="h-9">
          <Download className="mr-2 h-4 w-4" />
          {t('BtnTexts.export')}
        </Button> */}
      </div>
    </div>
  );
}
