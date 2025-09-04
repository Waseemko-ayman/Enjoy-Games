/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import * as yup from 'yup';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@/lib/toast';
import useAPI from '@/hook/useAPI';
import { CreateCouponsFields } from '@/utils/constant';
import FormField from '@/components/ui/FormField';
import { InputTypes, Option } from '@/utils/type';
import SettingsTab from '@/components/ui/display/SettingsTab';
import { useUpdateContent } from '@/context/updateContentContext';
import {
  CategoryResponse,
  CouponOptionsResponse,
  CreateCoupon,
  ProductCardProps,
  SubCategories,
} from '@/interfaces';
import { useTranslations } from 'next-intl';

const CreateCoupons = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  const { showToast } = useToast();
  const t = useTranslations();
  const inputT = useTranslations('Inputs.errorsMsgs');
  const { triggerRefresh } = useUpdateContent();
  const refreshKey = 'coupons';

  // ----------------------------------------------------------------

  const createSchema = yup.object({
    code: yup.string().required(inputT('couponRequired')),
    value: yup.string().required(inputT('valueRequired')),
    type: yup
      .string()
      .oneOf(['fixed', 'percent'])
      .required(inputT('typeCouponRequired')),
    usage_limit: yup.string().required(inputT('usageLimitRequired')),
    expires_from: yup.string().required(inputT('expiresFromRequired')),
    expires_at: yup.string().required(inputT('expiresAtRequired')),
    allowed_user_ids: yup.array().of(yup.number()).nullable(),
    excluded_product_ids: yup.array().of(yup.number()).nullable(),
    excluded_categories_ids: yup.array().of(yup.number()).nullable(),
    excluded_subcategory_ids: yup.array().of(yup.number()).nullable(),
  });

  type CouponFormData = yup.InferType<typeof createSchema>;

  // ----------------------------------------------------------------

  // API Hook
  const { add, isLoading } = useAPI<FormData, CreateCoupon>('coupon/create');

  // API Hook (get Categories)
  const { get: getOptions, data: optionsData } = useAPI<
    FormData,
    CouponOptionsResponse
  >('coupon/options');

  // ----------------------------------------------------------------

  // Contain Null Value
  // const categoriesOptions = [
  //   { id: null, name: t("Messages.undefined") },
  //   ...(optionsData?.categories?.map((c: CategoryResponse, idx: number) => ({
  //     id: c.id ?? `cat-temp-${idx}`,
  //     name: c.name || t("Messages.undefined"),
  //   })) ?? []),
  // ];

  const categoriesOptions =
    optionsData?.categories?.map((c: CategoryResponse, idx: number) => ({
      id: c.id ?? `cat-temp-${idx}`,
      name: c.name || t('Messages.undefined'),
    })) ?? [];

  const subCategoriesOptions =
    optionsData?.sub_categories?.map((s: SubCategories, idx: number) => ({
      id: s.id ?? `sub-temp-${idx}`,
      name: s.name || t('Messages.undefined'),
    })) ?? [];

  const productsOptions =
    optionsData?.products?.map((p: ProductCardProps, idx: number) => ({
      id: p.id ?? `prod-temp-${idx}`,
      name: p.title || t('Messages.undefined'),
    })) ?? [];

  const usersOptions =
    optionsData?.users?.map(
      (u: { id: number; name: string | null }, idx: number) => ({
        id: u.id ?? `user-temp-${idx}`,
        name: u.name || t('Messages.undefined'),
      })
    ) ?? [];

  // ----------------------------------------------------------------

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<any, CouponFormData>({
    resolver: yupResolver(createSchema),
  });

  // ----------------------------------------------------------------

  const onSubmit: SubmitHandler<CouponFormData> = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(`${key}[]`, String(v)));
        } else {
          formData.append(key, String(value));
        }
      });

      const response = await add(formData);

      if (response) {
        showToast(response.message);
        reset();
        triggerRefresh(refreshKey);
        onTabChange('allCoupons');
      }
    } catch (err: any) {
      showToast(err?.response?.message || 'حدث خطأ', 'error');
    }
  };

  // ----------------------------------------------------------------

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  return (
    <SettingsTab
      value={value}
      title={t('Dashboard.coupons.createProduct')}
      description={t('Dashboard.coupons.createNewProduct')}
    >
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="grid gap-5 md:grid-cols-2 mb-5">
          {CreateCouponsFields.map(
            ({ id, label, name, placeholder, type, options: itemOptions }) => {
              let options: Option[] = [];

              switch (name) {
                case 'allowed_user_ids':
                  options = usersOptions ?? [];
                  break;
                case 'excluded_product_ids':
                  options = productsOptions ?? [];
                  break;
                case 'excluded_categories_ids':
                  options = categoriesOptions ?? [];
                  break;
                case 'excluded_subcategory_ids':
                  options = subCategoriesOptions ?? [];
                  break;
                default:
                  options = itemOptions ?? [];
              }

              // // تحديد إذا كانت هذه select متعدد
              const isMultiSelect = [
                'allowed_user_ids',
                'excluded_product_ids',
                'excluded_categories_ids',
                'excluded_subcategory_ids',
              ].includes(name);

              return (
                <FormField
                  key={id}
                  id={id}
                  inputName={name}
                  type={type as InputTypes}
                  label={t(`Inputs.labels.${label}`)}
                  placeholder={t(`Inputs.placeHolders.${placeholder}`)}
                  register={register}
                  control={control}
                  options={options}
                  isMulti={isMultiSelect}
                  error={
                    errors[name as keyof CouponFormData] as
                      | FieldError
                      | undefined
                  }
                />
              );
            }
          )}
        </div>

        <Button type="submit">
          {isLoading ? <ButtonLoading /> : t('BtnTexts.SaveChanges')}
        </Button>
      </form>
    </SettingsTab>
  );
};

export default CreateCoupons;
