/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import CardWrapper from '@/components/atomic/CardWrapper';
import Layer from '@/components/atomic/Layer';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import InlineError from '@/components/molecules/InlineError';
import Loading from '@/components/molecules/loading';
import PageHeader from '@/components/molecules/PageHeader';
import Container from '@/components/organism/Container';
import useAPI from '@/hook/useAPI';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';

interface referralsData {
  total_referrals: 0;
  points_earned: 0;
  referrals: [];
}

const ReferralsPage = () => {
  const t = useTranslations('referrals');

  const {
    get,
    data: referralsData,
    isLoading,
    error,
  } = useAPI<referralsData, any>('user/my-referrals');

  useEffect(() => {
    get();
  }, [get]);

  return (
    <div>
      <PageHeader />
      <Layer>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <CardWrapper className="p-6 flex flex-col items-center">
              <p className="text-gray-500">{t('totalReferrals')}</p>
              <p className="text-3xl font-semibold">
                {isLoading ? (
                  <ButtonLoading borderColor="border-black" />
                ) : error ? (
                  <InlineError textColor="text-block" />
                ) : (
                  referralsData?.total_referrals
                )}
              </p>
            </CardWrapper>
            <CardWrapper className="p-6 flex flex-col items-center">
              <p className="text-gray-500">{t('pointsEarned')}</p>
              <p className="text-3xl font-semibold">
                {isLoading ? (
                  <ButtonLoading borderColor="border-black" />
                ) : error ? (
                  <InlineError textColor="text-block" />
                ) : (
                  referralsData?.points_earned
                )}
              </p>
            </CardWrapper>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              {t('invitedFriends')}
            </h2>
            {isLoading ? (
              <Loading />
            ) : error ? (
              <ErrorFetching />
            ) : referralsData?.referrals?.length === 0 ? (
              <p className="text-gray-500">{t('noFriends')}</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {referralsData?.referrals?.map((referral: any, idx: number) => (
                  <li key={idx} className="py-3 flex justify-between">
                    <span>{referral.name}</span>
                    <span className="text-gray-400">
                      {referral.registered_at}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </Layer>
    </div>
  );
};

export default ReferralsPage;
