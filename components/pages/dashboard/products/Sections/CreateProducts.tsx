/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import {
  getSuCategoryResponse,
  ProductCardProps,
  ProductResponse,
  suCategoryResponse,
} from '@/interfaces';
import * as yup from 'yup';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@/lib/toast';
import useAPI from '@/hook/useAPI';
import { CreateProductsFields } from '@/utils/constant';
import FormField from '@/components/ui/FormField';
import { InputTypes, ProductOption } from '@/utils/type';
import SettingsTab from '@/components/ui/display/SettingsTab';
import { useUpdateContent } from '@/context/updateContentContext';
import { useTranslations } from 'next-intl';
import { extractText } from '@/utils/extractText';
import Image from 'next/image';
import { API_IMAGE_URL } from '@/config/api';
import Loading from '@/components/molecules/loading';
import ErrorFetching from '@/components/molecules/ErrorFetching';

// ----------------------------------------------------------------

const CreateProducts = ({
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
  const t = useTranslations();
  const inputT = useTranslations('Inputs.errorsMsgs');
  const { triggerRefresh } = useUpdateContent();
  const refreshKey = 'products';

  // ----------------------------------------------------------------

  const createSchema = yup.object({
    titleAr: yup.string().required(inputT('arabicTitleRequired')),
    titleEn: yup.string().required(inputT('englishTitleRequired')),
    categoryID: yup.string().required(inputT('categoryRequired')),
    subCategoryID: yup.string().required(inputT('subCategoryRequired')),
    contentAr: yup.string().required(inputT('arabicContentRequired')),
    contentEn: yup.string().required(inputT('englishContentRequired')),
    descriptionAr: yup.string().required(inputT('arabicDescriptionRequired')),
    descriptionEn: yup.string().required(inputT('englishDescriptionRequired')),
    price: yup.string().required(inputT('priceRequired')),
    priceBefore: yup.string().nullable(),
    discount: yup.string().nullable(),
    vatRate: yup
      .number()
      .typeError(inputT('vatRateRequired'))
      .required(inputT('vatRateRequired'))
      .min(0, inputT('vatRateBetween'))
      .max(100, inputT('vatRateBetween')),
    isActive: yup.boolean().nullable(),
    shippingPayment: yup.string().required(inputT('shippingPaymentRequired')),
    image: yup
      .mixed<FileList>()
      .test('required', inputT('avatarRequired'), function (value) {
        return (
          editId !== null || (value instanceof FileList && value.length > 0)
        );
      }),
  });

  type ProductFormData = yup.InferType<typeof createSchema>;

  // API Hook
  // Create Sub Category
  const { add, isLoading: createLoading } = useAPI<FormData, ProductCardProps>(
    'product/create'
  );

  // Get Categories
  const { get: getCategories, data: categoriesData } = useAPI<
    FormData,
    suCategoryResponse
  >('get/categories');

  // Get Single Category
  const {
    getSingle,
    isLoading: getSingleIsLoading,
    error: getSingleError,
  } = useAPI<FormData, ProductCardProps>('product/show');

  // Edit Category
  const { edit, isLoading: updateLoading } = useAPI<FormData, ProductCardProps>(
    'product/update'
  );

  // ----------------------------------------------------------------

  const categoriesOptions =
    Array.isArray(categoriesData) && categoriesData.length
      ? categoriesData
      : [];

  // ----------------------------------------------------------------

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<any, ProductFormData>({
    resolver: yupResolver(createSchema),
    defaultValues: {
      isActive: true,
    },
  });

  const selectedCategoryID = watch('categoryID');

  // ----------------------------------------------------------------

  // API Hook (get Sub Categories)
  const { get: getSubCategoriesProducts, data: subCategoriesProductsData } =
    useAPI<FormData, getSuCategoryResponse>(
      `categories/${selectedCategoryID || 0}/sub-categories/products`
    );

  const subCategoriesProductsOptions =
    Array.isArray(subCategoriesProductsData) && subCategoriesProductsData.length
      ? subCategoriesProductsData
      : [];

  // ----------------------------------------------------------------

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    try {
      const formData = new FormData();

      formData.append('title[ar]', data.titleAr);
      formData.append('title[en]', data.titleEn);
      formData.append('category_id', data.categoryID);
      formData.append('sub_category_id', data.subCategoryID);
      formData.append('content[ar]', extractText(data.contentAr));
      formData.append('content[en]', extractText(data.contentEn));
      formData.append('description[ar]', extractText(data.descriptionAr));
      formData.append('description[en]', extractText(data.descriptionEn));
      formData.append('price', data.price);
      if (data.priceBefore) formData.append('price_before', data.priceBefore);
      if (data.discount) formData.append('discount', data.discount);
      formData.append('vat_rate', String(data.vatRate));
      formData.append('is_active', data.isActive ? '1' : '0');
      formData.append('shipping_payment', data.shippingPayment);

      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      } else if (!data.image && editId !== null) {
        formData.append('image', null as any);
      }

      let response: { data: ProductCardProps; message: string } | undefined;

      if (editId !== null) {
        response = (await edit(editId, formData)) as {
          data: ProductCardProps;
          message: string;
        };
      } else {
        response = (await add(formData)) as {
          data: ProductCardProps;
          message: string;
        };
      }

      if (response) {
        showToast(response?.message);
        reset({
          titleAr: response.data['title[ar]'] ?? '',
          titleEn: response.data['title[en]'] ?? '',
          categoryID: response.data.category_id?.toString() ?? '',
          subCategoryID: response.data.sub_category_id?.toString() ?? '',
          contentAr: response.data['content[ar]'] ?? '',
          contentEn: response.data['content[en]'] ?? '',
          descriptionAr: response.data['description[ar]'] ?? '',
          descriptionEn: response.data['description[en]'] ?? '',
          price: toStringValue(response.data.price),
          priceBefore: toStringValue(response.data.price_before),
          discount: toStringValue(response.data.discount),
          isActive: toBoolean(response.data.is_active),
          shippingPayment: response.data.shipping_payment ?? '',
          vatRate: response.data.vat_rate ?? 0,
        });
        triggerRefresh(refreshKey);
        onTabChange('allProducts');
        onEditIdChange(null);
      }
    } catch (error) {
      const apiError = (error as any)?.response?.message;
      showToast(apiError, 'error');
    }
  };

  // ----------------------------------------------------------------

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const toStringValue = (val: any) =>
    typeof val === 'string'
      ? val
      : typeof val === 'number'
      ? val.toString()
      : val?.amount?.toString() ?? '';

  const toBoolean = (val: any) => Boolean(val);

  useEffect(() => {
    if (editId !== null) {
      (async () => {
        try {
          const res = (await getSingle(editId)) as ProductResponse | undefined;
          if (res?.data) {
            reset({
              titleAr: res.data.title?.ar ?? '',
              titleEn: res.data.title?.en ?? '',
              categoryID: res.data.category_id?.toString() ?? '',
              subCategoryID: res.data.sub_category_id?.toString() ?? '',
              contentAr: res.data.content?.ar ?? '',
              contentEn: res.data.content?.en ?? '',
              descriptionAr: res.data.description?.ar ?? '',
              descriptionEn: res.data.description?.en ?? '',
              price: toStringValue(res.data.price),
              priceBefore: toStringValue(res.data.price_before),
              discount: toStringValue(res.data.discount),
              isActive: toBoolean(res.data.is_active),
              shippingPayment: res.data.shipping_payment ?? '',
              vatRate: res.data.vat_rate ?? 0,
            });
            setImagePreview(
              res.data.image ? `${API_IMAGE_URL}${res.data.image}` : null
            );
          }
        } catch (error) {
          console.error('فشل في جلب بيانات القسم:', error);
          showToast((error as any)?.response?.message, 'error');
        }
      })();
    }
  }, [editId]);

  useEffect(() => {
    if (selectedCategoryID) {
      getSubCategoriesProducts();
    }
  }, [selectedCategoryID, getSubCategoriesProducts]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // ----------------------------------------------------------------

  const isLoading = createLoading || updateLoading;

  return (
    <SettingsTab
      value={value}
      title={t('Dashboard.products.createProduct')}
      description={t('Dashboard.products.createNewProduct')}
    >
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {getSingleIsLoading ? (
          <Loading />
        ) : getSingleError ? (
          <ErrorFetching />
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 mb-5">
              {CreateProductsFields.map(
                ({
                  id,
                  label,
                  name,
                  placeholder,
                  type,
                  options: itemOptions,
                }) => {
                  let options: ProductOption[] = [];
                  if (name === 'categoryID') options = categoriesOptions ?? [];
                  else if (name === 'subCategoryID')
                    options = subCategoriesProductsOptions ?? [];
                  else if (name === 'shippingPayment')
                    options = itemOptions ?? [];
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
                        errors[name as keyof ProductFormData] as
                          | FieldError
                          | undefined
                      }
                      editId={editId}
                      {...(type === 'file' ? { accept: 'image/*' } : {})}
                    />
                  );
                }
              )}
            </div>
            {/*
            {iconPreview && (
              <div className="mb-3">
                <label className="block mb-1">معاينة الأيقونة:</label>
                <Image
                  src={iconPreview}
                  alt="Icon Preview"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover"
                />
              </div>
            )}
            */}
            {imagePreview && (
              <div className="mb-3">
                {getSingleIsLoading ? (
                  <Loading />
                ) : (
                  <Image
                    src={imagePreview}
                    alt="Image Preview"
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover"
                  />
                )}
              </div>
            )}
            <Button type="submit">
              {isLoading ? <ButtonLoading /> : t('BtnTexts.SaveChanges')}
            </Button>
          </>
        )}
      </form>
    </SettingsTab>
  );
};

export default CreateProducts;
