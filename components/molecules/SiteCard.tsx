import React from 'react';
import { SiteCardProps } from '@/interfaces';

const SiteCard = ({
  icon: Icon,
  gradient,
  titleKey,
  settings,
  t,
}: SiteCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className={`bg-gradient-to-r ${gradient} px-6 py-4`}>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{titleKey}</h3>
            <p className="text-sm text-white/90">{settings?.label}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-200">
            <span className="text-sm font-medium text-slate-600">
              {t('TimeoutMinutes')}
            </span>
            <span className="text-2xl font-bold text-slate-900">
              {settings?.timeout_minutes ?? 0}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-600">
              {t('TimeoutHours')}
            </span>
            <span className="text-2xl font-bold text-slate-900">
              {settings?.timeout_hours ?? 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteCard;
