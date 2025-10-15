/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateCardItem } from '@/interfaces';
import {
  AlertTriangle,
  CheckCircle,
  Globe,
  Shield,
  XCircle,
} from 'lucide-react';

export const getStatCardData = (t: any, data: any): StateCardItem[] =>
  [
    {
      title: t('TotalCases'),
      value: data?.total_suspicious_transactions,
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'blue',
    },
    {
      title: t('AcceptedTransactions'),
      value: data?.approved,
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'green',
    },
    {
      title: t('BlockedTransactions'),
      value: data?.blocked,
      icon: <XCircle className="w-6 h-6" />,
      color: 'red',
    },
    {
      title: t('BlockRate'),
      value: (data?.block_rate || 0).toFixed(1),
      icon: <Shield className="w-6 h-6" />,
      color: 'amber',
      suffix: '%',
    },
    {
      title: t('CountryMismatches'),
      value: data?.country_mismatches,
      icon: <Globe className="w-6 h-6" />,
      color: 'purple',
    },
  ] as const;
