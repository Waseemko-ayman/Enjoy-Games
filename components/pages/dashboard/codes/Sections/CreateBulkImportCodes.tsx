/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect } from 'react';
import {
  useForm,
  SubmitHandler,
  FieldError,
  Resolver,
  useFieldArray,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslations } from 'next-intl';

import { useProductCodes } from '@/context/selectedProductId';
import SettingsTab from '@/components/ui/display/SettingsTab';
import FormField from '@/components/ui/FormField';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import { useToast } from '@/lib/toast';
import { useUpdateContent } from '@/context/updateContentContext';
import useAPI from '@/hook/useAPI';
import { InputTypes, Option } from '@/utils/type';
import { BulkImportCodes } from '@/utils/constant';
import { Button } from '@/components/ui/button';

interface CodeItem {
  code: string;
  notes?: string;
}

interface BulkImportForm {
  productID: string;
  codes: CodeItem[];
}

const CreateBulkImportCodes = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  const t = useTranslations();
  const { showToast } = useToast();
  const { setSelectedProductId } = useProductCodes();
  const { triggerRefresh } = useUpdateContent();
  const refreshKey = 'codes';

  // ---------------- Validation ----------------
  const schema = yup.object({
    productID: yup.string().required(t('Inputs.errorsMsgs.productRequired')),
    codes: yup.array().of(
      yup.object({
        code: yup.string().required(t('Inputs.errorsMsgs.codeRequired')),
        notes: yup.string().notRequired(),
      })
    ),
  });

  type BulkFormData = yup.InferType<typeof schema>;

  // ---------------- API Hook ----------------
  const { add, isLoading } = useAPI<BulkFormData, any>(
    (productID: string) => `products/${productID}/bulk-import-codes`
  );

  const { get: getProducts, data: productsData } = useAPI<FormData, any>(
    'code/get-products'
  );

  const productsOptions: Option[] = Array.isArray(productsData)
    ? productsData.map((p: any) => ({ id: p.id, name: p.title }))
    : [];

  // ---------------- Form ----------------
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BulkFormData>({
    resolver: yupResolver(schema) as unknown as Resolver<any>,
    defaultValues: { codes: [{ code: '', notes: '' }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'codes',
  });

  const onSubmit: SubmitHandler<BulkFormData> = async (data) => {
    try {
      const payload = {
        productID: data.productID,
        codes: data?.codes?.map((c) => ({
          code: c.code.replace(/\s+/g, '-'),
          notes: c.notes || '',
        })),
      };

      const response = await add(payload, data.productID);

      if (response) {
        showToast(response.message);
        setSelectedProductId(Number(data.productID));
        reset();
        triggerRefresh(refreshKey);
        onTabChange('AllCodes');
      }
    } catch (error: any) {
      showToast(error?.response?.data?.message, 'error');
    }
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <SettingsTab
      value={value}
      title={t('Dashboard.codes.CreateBulkImportCodes')}
      description={t('Dashboard.codes.ImportCodes')}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          {BulkImportCodes.map(({ id, label, name, type, placeholder }) => {
            if (name === 'productID') {
              return (
                <FormField
                  key={id}
                  id={id}
                  inputName={name}
                  type={'select' as InputTypes}
                  label={t(`Inputs.labels.${label}`)}
                  placeholder={t(`Inputs.placeHolders.${placeholder}`)}
                  register={register}
                  control={control}
                  options={productsOptions}
                  error={
                    errors[name as keyof BulkImportForm] as
                      | FieldError
                      | undefined
                  }
                />
              );
            }

            if (type === 'dynamic') {
              return (
                <div key={id} className="flex flex-col gap-5 mt-5">
                  {fields.map((field, index) => {
                    const getDynamicFields = (index: number) => [
                      {
                        id: `code-${index}`,
                        inputName: `codes.${index}.code`,
                        type: 'text',
                        label: t('Inputs.labels.code'),
                        placeholder: t('Inputs.placeHolders.writeCode'),
                        error: errors.codes?.[index]?.code,
                      },
                      {
                        id: `notes-${index}`,
                        inputName: `codes.${index}.notes`,
                        type: 'text',
                        label: t('Inputs.labels.notes'),
                        placeholder: t('Inputs.placeHolders.writeNotes'),
                        error: errors.codes?.[index]?.notes,
                      },
                    ];
                    return (
                      <div
                        key={field.id}
                        className="flex gap-2 items-end justify-between w-full"
                      >
                        <div className="flex gap-5 w-full" key={field.id}>
                          {getDynamicFields(index).map((field) => (
                            <FormField
                              key={field.id}
                              id={field.id}
                              inputName={field.inputName}
                              type={field.type as InputTypes}
                              label={field.label}
                              placeholder={field.placeholder}
                              register={register}
                              control={control}
                              error={field.error}
                              otherClassName="flex-1"
                            />
                          ))}
                        </div>

                        {fields.length > 1 && (
                          <Button type="button" onClick={() => remove(index)}>
                            {t('BtnTexts.Remove')}
                          </Button>
                        )}
                      </div>
                    );
                  })}
                  <Button
                    type="button"
                    onClick={() => append({ code: '', notes: '' })}
                  >
                    {t('BtnTexts.AddCode')}
                  </Button>
                </div>
              );
            }

            return null;
          })}
        </div>

        <Button type="submit">
          {isLoading ? <ButtonLoading /> : t('BtnTexts.SaveChanges')}
        </Button>
        {/* {productsData === undefined || getProducsIsLoading ? (
          <Loading />
        ) : (
          <>

          </>
        )} */}
      </form>
    </SettingsTab>
  );
};

export default CreateBulkImportCodes;
