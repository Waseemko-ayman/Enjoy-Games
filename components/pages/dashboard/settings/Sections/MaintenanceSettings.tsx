/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Loading from '@/components/molecules/loading';
import SettingsTab from '@/components/ui/display/SettingsTab';
import { maintenanceAdditionalInfoKeys } from '@/data';
import useAPI from '@/hook/useAPI';
import { useToast } from '@/lib/toast';
import { AlertTriangle, CheckCircle2, Wrench } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

const MaintenanceSettings = () => {
  const [isMaintenance, setIsMaintenance] = useState(false);

  // Translation
  const t = useTranslations('Dashboard.settings.Maintenance');

  // Notifications
  const { showToast } = useToast();

  // API Context
  const { get, data, isLoading } = useAPI<any, any>('maintenance/status');
  const { get: toggle } = useAPI<any, any>('maintenance/toggle');

  useEffect(() => {
    get();
  }, [get]);

  useEffect(() => {
    if (data) setIsMaintenance(data.is_maintenance);
  }, [data]);

  const handleToggle = async () => {
    try {
      const toggleRes = await toggle(); // تفعيل أو تعطيل الصيانة
      const newStatus = toggleRes?.data?.is_maintenance ?? !isMaintenance;
      setIsMaintenance(newStatus); // تحديث فوري للحالة
      showToast(toggleRes?.data?.message || 'تم تحديث الحالة');
    } catch (err: any) {
      showToast(
        err?.response?.data?.message || 'حدث خطأ أثناء التبديل',
        'error'
      );
    }
  };

  return (
    <SettingsTab value="maintenance" title={t('title')} description={t('desc')}>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="bg-muted p-4 rounded-2xl shadow-sm w-full">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Wrench className="w-5 h-5 text-slate-700" />
                  <label className="text-sm font-medium">
                    {t('MaintenanceMode')}
                  </label>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
                  {t('Overview')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleToggle}
                    disabled={isLoading}
                    className={`
                      relative inline-flex h-8 w-14 sm:h-10 sm:w-[68px] items-center rounded-full
                      transition-all duration-300 ease-in-out
                      focus:outline-none focus:ring-2 focus:ring-offset-2
                      disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
                      ${
                        isMaintenance
                          ? 'bg-amber-500 focus:ring-amber-500'
                          : 'bg-slate-300 focus:ring-slate-400'
                      }
                    `}
                  >
                    <span
                      className={`
                        absolute h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-white shadow-lg
                        transition-all duration-300 ease-in-out
                        ${isMaintenance ? 'right-1.5' : 'left-1.5'}
                      `}
                    />
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  {isMaintenance ? (
                    <>
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      <span className="text-sm font-medium text-amber-700">
                        {t('SiteDisabled')}
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-700">
                        {t('SiteAvailable')}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            {isMaintenance && (
              <div className="mt-5 pt-5 border-t border-slate-200">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-amber-900 mb-1">
                        {t('ActiveInfoTitle')}
                      </h4>
                      <p className="text-sm text-amber-800 leading-relaxed">
                        {t('ActiveInfoDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="text-sm font-semibold text-slate-900 mb-3">
              {t('AdditionalInfo')}
            </h4>
            <div className="space-y-2">
              {maintenanceAdditionalInfoKeys.map((key) => (
                <div
                  key={key}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                  <p>{t(key)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </SettingsTab>
  );
};

export default MaintenanceSettings;
