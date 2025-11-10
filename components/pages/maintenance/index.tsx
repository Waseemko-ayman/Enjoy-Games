'use client';
import React from 'react';
import { Clock, Settings, Wrench } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import FloatingActions from '@/components/atomic/FloatingActions';

const MaintenancePage = () => {
  const t = useTranslations('Dashboard.settings.Maintenance');

  const maintenanceItems = [
    {
      icon: Settings,
      bg: 'bg-blue-500/20',
      color: 'text-blue-400',
      title: t('system_update_title'),
      desc: t('system_update_desc'),
    },
    {
      icon: Wrench,
      bg: 'bg-cyan-500/20',
      color: 'text-cyan-400',
      title: t('add_features_title'),
      desc: t('add_features_desc'),
    },
    {
      icon: Clock,
      bg: 'bg-emerald-500/20',
      color: 'text-emerald-400',
      title: t('fast_return_title'),
      desc: t('fast_return_desc'),
    },
  ];

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center px-4">
        <div>
          <div className="text-center space-y-4">
            <div className="relative flex items-center justify-center mx-auto mt-2">
              <Image
                src="/assets/logo.png"
                alt="Enjoy Games Logo"
                title="Enjoy Games"
                width={160}
                height={160}
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                {t('SiteDisabled')}
              </h1>
              <p className="text-xl md:text-2xl text-white">{t('subtitle')}</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Wrench className="w-6 h-6 text-enjoy-secondary" />
                <h2 className="text-2xl font-semibold text-white">
                  {t('updating_title')}
                </h2>
                <Wrench className="w-6 h-6 text-enjoy-secondary" />
              </div>

              <p className="text-white text-lg leading-relaxed mb-6">
                {t('updating_description')}
              </p>

              <div className="flex items-center justify-center gap-2 text-white">
                <Clock className="w-5 h-5" />
                <span className="text-sm">{t('expected_return')}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {maintenanceItems.map(
                ({ icon: Icon, bg, color, title, desc }, i) => (
                  <div
                    key={i}
                    className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors"
                  >
                    <div
                      className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center mx-auto mb-3`}
                    >
                      <Icon className={`w-6 h-6 ${color}`} />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{title}</h3>
                    <p className="text-slate-200 text-sm">{desc}</p>
                  </div>
                )
              )}
            </div>

            <div className="pt-2 pb-4">
              <p className="text-white text-sm">{t('thanks')}</p>
            </div>
          </div>
        </div>
      </div>
      <FloatingActions phone="+96893809093" />
    </div>
  );
};

export default MaintenancePage;
