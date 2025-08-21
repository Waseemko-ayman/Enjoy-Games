'use client';
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import SettingsTab from '@/components/ui/display/SettingsTab';
import FormField from '@/components/ui/FormField';
import { CategoryFormData, CategoryResponse } from '@/interfaces';
import { CreateCategoriesFields } from '@/utils/constant';
import { InputTypes } from '@/utils/type';
import useAPI from '@/hook/useAPI';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import { useToast } from '@/lib/toast';
import { useUpdateContent } from '@/context/updateContentContext';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

// ----------------------------------------------------------------

const CreateCategories = ({
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
  const { triggerRefresh } = useUpdateContent();
  const refreshKey = 'categories';

  // ----------------------------------------------------------------

  const createSchema = yup.object({
    nameAr: yup.string().required(t('Inputs.errorsMsgs.arabicNameRequired')),
    nameEn: yup.string().required(t('Inputs.errorsMsgs.englishNameRequired')),
    icon: yup
      .mixed<FileList>()
      .test('required', t('Inputs.errorsMsgs.iconRequired'), (value) => {
        return value instanceof FileList && value.length > 0;
      })
      .required(t('Inputs.errorsMsgs.iconRequired')),
    image: yup
      .mixed<FileList>()
      .test('required', t('Inputs.errorsMsgs.avatarRequired'), (value) => {
        return value instanceof FileList && value.length > 0;
      })
      .required(t('Inputs.errorsMsgs.avatarRequired')),
  });

  // ----------------------------------------------------------------

  // API Hook
  const { add, isLoading: createLoading } = useAPI<FormData, CategoryResponse>(
    'category/create'
  );

  // Get Single Category
  const { getSingle } = useAPI<FormData, CategoryResponse>('category/show');

  // Edit Category
  const { edit, isLoading: updateLoading } = useAPI<FormData, CategoryResponse>(
    'category/update'
  );

  // ----------------------------------------------------------------

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: yupResolver(createSchema),
  });

  // ----------------------------------------------------------------

  const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name[ar]', data.nameAr);
      formData.append('name[en]', data.nameEn);

      if (data.icon && data.icon[0]) formData.append('icon', data.icon[0]);
      if (data.image && data.image[0]) formData.append('image', data.image[0]);

      let response: { data: CategoryResponse; message: string } | undefined;

      if (editId !== null) {
        response = (await edit(editId, formData)) as {
          data: CategoryResponse;
          message: string;
        };
      } else {
        response = (await add(formData)) as {
          data: CategoryResponse;
          message: string;
        };
      }

      if (response) {
        showToast(response.message);
        reset();
        triggerRefresh(refreshKey);
        onTabChange('allCategories');
        onEditIdChange(null);
      }
    } catch (error) {
      const apiError = (error as any)?.response?.message;
      showToast(apiError, 'error');
    }
  };

  // ----------------------------------------------------------------

  // const [iconPreview, setIconPreview] = useState<string | null>(null);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (editId !== null) {
      (async () => {
        try {
          const res = await getSingle(editId);
          if (res?.data) {
            reset({
              nameAr: res.data.name?.ar ?? '',
              nameEn: res.data.name?.en ?? '',
            });
            // setIconPreview(res.data.icon ?? null);
            // setImagePreview(res.data.image ?? null);
          }
        } catch (error) {
          console.error('فشل في جلب بيانات القسم:', error);
          const apiError = (error as any)?.response?.message;
          showToast(apiError, 'error');
        }
      })();
    }
  }, [editId]);

  // ----------------------------------------------------------------

  const isLoading = createLoading || updateLoading;

  return (
    <SettingsTab
      value={value}
      title={t('Dashboard.categories.title')}
      description={t('Dashboard.categories.createCategories')}
    >
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="grid gap-5 md:grid-cols-2 mb-5">
          {CreateCategoriesFields.map(
            ({ id, label, name, placeholder, type }) => (
              <FormField
                key={id}
                id={id}
                inputName={name}
                type={type as InputTypes}
                label={t(`Inputs.labels.${label}`)}
                placeholder={t(`Inputs.placeHolders.${placeholder}`)}
                register={register}
                error={
                  errors[name as keyof CategoryFormData] as
                    | FieldError
                    | undefined
                }
                {...(type === 'file' ? { accept: 'image/*' } : {})}
              />
            )
          )}
        </div>

        {/* {iconPreview && (
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

        {imagePreview && (
          <div className="mb-3">
            <label className="block mb-1">معاينة الصورة:</label>
            <Image
              src={imagePreview}
              alt="Image Preview"
              width={128}
              height={128}
              className="w-32 h-32 object-cover"
            />
          </div>
        )} */}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <ButtonLoading /> : t('BtnTexts.SaveChanges')}
        </Button>
      </form>
    </SettingsTab>
  );
};

export default CreateCategories;
