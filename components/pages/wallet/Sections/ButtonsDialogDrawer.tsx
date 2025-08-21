/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Button from '@/components/atomic/Button';
import ButtonLoading from '@/components/atomic/ButtonLoading';
// import Input from '@/components/atomic/Input';
import DialogHeader from '@/components/molecules/DialogHeader';
import RewardProgramItem from '@/components/molecules/RewardProgramItem';
import SelectableList from '@/components/molecules/SelectableList';
import ResponsiveDialogDrawer from '@/components/organism/ResponsiveDialogDrawer';
import useAPI from '@/hook/useAPI';
import useIsMobile from '@/hook/useIsMobile';
import { RedeemResponse, TranslationFunction } from '@/interfaces';
import { useToast } from '@/lib/toast';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

const ButtonsDialogDrawer = ({
  t,
  points,
}: {
  t: TranslationFunction;
  points: number | undefined;
}) => {
  // const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const btnTxts = useTranslations('BtnTexts');
  // const inputsTxt = useTranslations('Inputs.placeHolders');
  const { showToast } = useToast();

  const { get, isLoading } = useAPI<any, RedeemResponse>(
    'user/increase-my-redeem'
  );

  const handleProgramSelect = (id: number) => {
    setSelectedProgram(selectedProgram === id ? null : id);
  };

  const handleContinue = async () => {
    if (selectedProgram) {
      const program = rewardsPrograms.find((p) => p.id === selectedProgram);

      if (program?.key === 'starsPoints') {
        try {
          const response = await get();
          if ((response as any)?.success === false) {
            showToast((response as any)?.message, 'error');
          } else {
            showToast((response as any)?.message);
          }
        } catch (error) {
          const apiError = (error as any)?.response?.message;
          showToast(apiError, 'error');
        }
      } else {
        showToast(`${t('programSelected')}: ${program?.key}`);
      }
      setOpenSecond(false);
    }
  };

  const rewardsPrograms = [
    // {
    //   id: 1,
    //   key: 'bonusesPrograms',
    //   type: 'earnings',
    // },
    // {
    //   id: 2,
    //   key: 'maxupProgram',
    //   type: 'earnings',
    //   amount: 0,
    //   currency: 'ريال',
    //   description: 'profiledProfits',
    // },
    {
      id: 2,
      key: 'starsPoints',
      type: 'point',
      amount: points || 0,
      currency: 'point',
      description: 'convertiblePoints',
    },
  ];

  return (
    <div className="flex items-center justify-center gap-4">
      {/* <ResponsiveDialogDrawer
        open={openFirst}
        setOpen={setOpenFirst}
        isMobile={isMobile}
        trigger={
          <Button otherClassName={`py-3 px-5 text-sm`}>
            {btnTxts('RechargeNow')}
          </Button>
        }
      >
        <DialogHeader
          title={t('addCoupon.title')}
          onClose={() => setOpenFirst(false)}
        />
        <div>
          <label className="block text-sm font-semibold text-[var(--enjoy-gray-650)] mb-2">
            {t('addCoupon.subTitle')}
          </label>
          <Input
            type="text"
            placeholder={inputsTxt('writeCouponHere')}
            inputName="coupon_code"
            iconClassName="text-red-500"
            variant="secondary"
            otherClassNameContainer="!border !border-gray-300 !rounded-lg"
            otherClassName="placeholder:text-enjoy-primary-deep placeholder:text-xs placeholder:font-bold"
          />
          <Button otherClassName="py-3.5 text-sm w-full mt-6">
            {btnTxts('addCoupon')}
          </Button>
        </div>
      </ResponsiveDialogDrawer> */}

      <ResponsiveDialogDrawer
        open={openSecond}
        setOpen={setOpenSecond}
        isMobile={isMobile}
        trigger={
          <Button
            variant="forth"
            otherClassName={`py-3 px-5 text-sm !bg-white w-full`}
          >
            {btnTxts('RedeemPoints')}
          </Button>
        }
      >
        <DialogHeader
          title={t('RedeemPoints.title')}
          onClose={() => {
            setOpenSecond(false);
            setSelectedProgram(null);
          }}
        />
        <h6 className="block text-sm font-semibold text-[var(--enjoy-gray-650)] mb-6 sm:mb-2">
          {t('RedeemPoints.subTitle')}
        </h6>

        <SelectableList
          items={rewardsPrograms}
          // selectedItem={
          //   rewardsPrograms.find((p) => p.id === selectedProgram) ??
          //   rewardsPrograms[0]
          // }
          selectedItem={
            rewardsPrograms.find((p) => p.id === selectedProgram) || null
          }
          getKey={(item) => item!.id}
          onSelect={(item) => handleProgramSelect(item!.id)}
          className="max-h-[400px] overflow-y-auto px-2 mb-5"
          renderContent={(program, isSelected) => (
            <RewardProgramItem program={program} isSelected={isSelected} />
          )}
          listClassName="min-h-14 flex items-center "
        />
        <Button
          otherClassName="w-full py-3.5"
          disabled={!selectedProgram}
          handleClick={handleContinue}
        >
          {isLoading ? <ButtonLoading /> : btnTxts('continue')}
        </Button>
      </ResponsiveDialogDrawer>
    </div>
  );
};

export default ButtonsDialogDrawer;
