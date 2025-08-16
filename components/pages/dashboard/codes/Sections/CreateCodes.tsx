/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import {
  CodesFormData,
  CreateCodeResponse,
  ProductCardProps,
  ShowCodeRequest,
  suCategoryResponse,
  UpdateCodeResponse,
} from '@/interfaces';
import * as yup from 'yup';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@/lib/toast';
import useAPI from '@/hook/useAPI';
import { CreateCodesFields } from '@/utils/constant';
import FormField from '@/components/ui/FormField';
import { InputTypes, Option } from '@/utils/type';
import SettingsTab from '@/components/ui/display/SettingsTab';
import { useUpdateContent } from '@/context/updateContentContext';
import { useProductCodes } from '@/context/selectedProductId';
import { useTranslations } from 'next-intl';

// ----------------------------------------------------------------

const CreateCodes = ({
  value,
  editId,
  onEditIdChange,
  onTabChange,
}: {
  value: string;
  editId: string | number | null;
  onEditIdChange: (id: string | number | null) => void;
  onTabChange: (val: string) => void;
}) => {
  const { showToast } = useToast();
  const { triggerRefresh } = useUpdateContent();
  const { setSelectedProductId } = useProductCodes();
  const t = useTranslations();

  // ----------------------------------------------------------------

  const createSchema = yup.object({
    productID: yup.string().required(t('Inputs.errorsMsgs.productRequired')),
    code: yup.string().required(t('Inputs.errorsMsgs.codeRequired')),
  });

  type CodeFormData = yup.InferType<typeof createSchema>;

  // ----------------------------------------------------------------

  // API Hook
  const { add, isLoading: createLoading } = useAPI<
    FormData,
    CreateCodeResponse
  >('code/create');

  // Get Products
  const { get: getProducts, data: productsData } = useAPI<
    FormData,
    suCategoryResponse
  >('code/get-products');

  // Get Single Category
  const { getSingle } = useAPI<FormData, ShowCodeRequest>('code/show');

  // Edit Category
  const { edit, isLoading: updateLoading } = useAPI<
    FormData,
    UpdateCodeResponse
  >('code/update');

  // ----------------------------------------------------------------

  const productsOptions: Option[] =
    Array.isArray(productsData) && productsData.length
      ? productsData.map((p: ProductCardProps) => ({
          id: p.id ?? null,
          name: p.title || t('Messages.undefined'),
        }))
      : [];

  // ----------------------------------------------------------------

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CodesFormData>({
    resolver: yupResolver(createSchema),
  });

  // ----------------------------------------------------------------

  const onSubmit: SubmitHandler<CodesFormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('product_id', data.productID);
      formData.append('code', data.code);

      let response:
        | { data: CreateCodeResponse | UpdateCodeResponse; message: string }
        | undefined;

      if (editId !== null) {
        response = (await edit(editId, formData)) as {
          data: UpdateCodeResponse;
          message: string;
        };
      } else {
        response = (await add(formData)) as {
          data: CreateCodeResponse;
          message: string;
        };
      }

      if (response) {
        showToast(response.message);
        setSelectedProductId(Number(data.productID));
        reset();
        triggerRefresh();
        onTabChange('AllCodes');
        onEditIdChange(null);
      }
    } catch (error) {
      const apiError = (error as any)?.response?.message;
      showToast(apiError);
    }
  };

  // ----------------------------------------------------------------

  useEffect(() => {
    if (editId !== null) {
      (async () => {
        try {
          const res = await getSingle(editId);
          if (res?.data) {
            reset({
              productID: res.data.product_id ?? '',
              code: res.data.code ?? '',
            });
          }
        } catch (error) {
          console.error('فشل في جلب بيانات القسم:', error);
          const apiError = (error as any)?.response?.message;
          showToast(apiError);
        }
      })();
    }
  }, [editId]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // ----------------------------------------------------------------

  const isLoading = createLoading || updateLoading;

  return (
    <SettingsTab
      value={value}
      title={t('Dashboard.codes.createCode')}
      description={t('Dashboard.codes.createNewCode')}
    >
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="grid gap-5 md:grid-cols-2 mb-5">
          {CreateCodesFields.map(({ id, label, name, placeholder, type }) => {
            let options: Option[] = [];
            if (name === 'productID') options = productsOptions ?? [];
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
                error={
                  errors[name as keyof CodeFormData] as FieldError | undefined
                }
              />
            );
          })}
        </div>
        <Button type="submit">
          {isLoading ? <ButtonLoading /> : t('BtnTexts.SaveChanges')}
        </Button>
      </form>
    </SettingsTab>
  );
};

export default CreateCodes;
