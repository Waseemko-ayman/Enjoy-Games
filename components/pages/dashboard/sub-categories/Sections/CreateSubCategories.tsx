/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import SettingsTab from '@/components/ui/display/SettingsTab';
import FormField from '@/components/ui/FormField';
import { CreateSubCategoriesFields } from '@/utils/constant';
import { InputTypes, Option } from '@/utils/type';
import useAPI from '@/hook/useAPI';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import { useToast } from '@/lib/toast';
import { useEffect } from 'react';
import { useUpdateContent } from '@/context/updateContentContext';
import {
  getSuCategoryResponse,
  subCategoryFormData,
  suCategoryResponse,
} from '@/interfaces';
import { useTranslations } from 'next-intl';

// ----------------------------------------------------------------

function mapToOptions(
  items: { id: number; name: string }[],
  nullLabel = 'بدون اختيار'
): Option[] {
  return [
    { id: null, name: nullLabel },
    ...items.map((item) => ({ id: item.id, name: item.name })),
  ];
}

// ----------------------------------------------------------------

const CreateSubCategories = ({
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
  const refreshKey = 'subCategories';

  // ----------------------------------------------------------------

  const createSchema = yup.object({
    nameAr: yup.string().required(inputT('arabicNameRequired')),
    nameEn: yup.string().required(inputT('englishNameRequired')),
    categoryID: yup.string().required(inputT('categoryRequired')),
    parentID: yup.string().nullable(),
    icon: yup
      .mixed<FileList>()
      .test('required', inputT('iconRequired'), (value) => {
        return value instanceof FileList && value.length > 0;
      })
      .required(inputT('iconRequired')),
    image: yup
      .mixed<FileList>()
      .test('required', inputT('avatarRequired'), (value) => {
        return value instanceof FileList && value.length > 0;
      })
      .required(inputT('avatarRequired')),
  });

  // ----------------------------------------------------------------

  // API Hook
  // Create Sub Category
  const { add, isLoading: createLoading } = useAPI<
    FormData,
    suCategoryResponse
  >('sub-category/create');

  // Get Single Sub Category
  const { getSingle } = useAPI<FormData, suCategoryResponse>(
    'sub-category/show'
  );

  // Edit Sub Category
  const { edit, isLoading: updateLoading } = useAPI<
    FormData,
    suCategoryResponse
  >('sub-category/update');

  // Get Categories
  const { get: getCategories, data: categoriesData } = useAPI<
    FormData,
    suCategoryResponse
  >('get/categories');

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
  } = useForm<any, subCategoryFormData>({
    resolver: yupResolver(createSchema),
    defaultValues: {
      categoryID: categoriesOptions[0]?.id?.toString() ?? '',
      parentID: null,
    },
  });

  const selectedCategoryID = watch('categoryID');

  // ----------------------------------------------------------------

  // API Hook (get Sub Categories)
  const { get: getSubCategories, data: subCategoriesData } = useAPI<
    FormData,
    getSuCategoryResponse
  >(`get/category/${selectedCategoryID || 0}/sub-categories`);

  const subCategoriesOptions =
    Array.isArray(subCategoriesData) && subCategoriesData.length
      ? mapToOptions(subCategoriesData)
      : [{ id: null, name: 'بدون اختيار' }];

  // ----------------------------------------------------------------

  const onSubmit: SubmitHandler<subCategoryFormData> = async (data) => {
    try {
      const formData = new FormData();

      // Add text data
      formData.append('name[ar]', data.nameAr);
      formData.append('name[en]', data.nameEn);
      formData.append('category_id', data.categoryID);
      if (data.parentID !== null) {
        formData.append('parent_id', data.parentID ?? '');
      }

      // Add files if found
      if (data.icon[0]) formData.append('icon', data.icon[0]);
      if (data.image[0]) formData.append('image', data.image[0]);

      let response: { data: suCategoryResponse; message: string } | undefined;

      if (editId !== null) {
        response = (await edit(editId, formData)) as {
          data: suCategoryResponse;
          message: string;
        };
      } else {
        response = (await add(formData)) as {
          data: suCategoryResponse;
          message: string;
        };
      }

      if (response) {
        showToast(response?.message);
        reset();
        triggerRefresh(refreshKey);
        onTabChange('allSubCategories');
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
              categoryID: res.data.category_id?.toString() ?? '',
              parentID: res.data.parent_id ?? null,
            });
            // setIconPreview(res.data.icon ?? null);
            // setImagePreview(res.data.image ?? null);
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
      getSubCategories();
    }
  }, [selectedCategoryID, getSubCategories]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // ----------------------------------------------------------------

  const isLoading = createLoading || updateLoading;

  return (
    <SettingsTab
      value={value}
      title={t('Dashboard.subCategories.createSubCategories')}
      description={t('Dashboard.subCategories.createNewSubCategories')}
    >
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="grid gap-5 md:grid-cols-2 mb-5">
          {CreateSubCategoriesFields.map(
            ({ id, label, name, placeholder, type }) => {
              let options: Option[] = [];
              if (name === 'categoryID') options = categoriesOptions;
              else if (name === 'parentID') options = subCategoriesOptions;

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
                    errors[name as keyof subCategoryFormData] as
                      | FieldError
                      | undefined
                  }
                  {...(type === 'file' ? { accept: 'image/*' } : {})}
                />
              );
            }
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
        <Button type="submit">
          {isLoading ? <ButtonLoading /> : t('BtnTexts.SaveChanges')}
        </Button>
      </form>
    </SettingsTab>
  );
};

export default CreateSubCategories;
