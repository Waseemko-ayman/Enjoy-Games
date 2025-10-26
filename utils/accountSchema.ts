/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup';
import { alphanumericWithArabicRegex } from './regex';

export const getAccountSchema = (
  t: (key: string) => string,
  currentYear: number
) =>
  Yup.object().shape({
    name: Yup.string()
      .matches(
        alphanumericWithArabicRegex,
        t('Inputs.errorsMsgs.usernameInvalid') ||
          'الاسم يجب أن يحتوي على حروف أو أرقام فقط ويكون طوله على الأقل حرفين'
      )
      .required(t('Inputs.errorsMsgs.usernameRequired') || 'الاسم مطلوب'),
    // date: Yup.string()
    //   .nullable()
    //   .optional()
    //   .test(
    //     'valid-date',
    //     `${t('Inputs.errorsMsgs.invalidDate')} ${currentYear}`,
    //     (value) => {
    //       if (!value) return true;
    //       const year = new Date(value).getFullYear();
    //       return year >= 1935 && year <= currentYear;
    //     }
    //   ),
    date: Yup.string()
      .nullable()
      .optional()
      .test('valid-date', '', (value, context) => {
        if (!value) return true; // فارغ مسموح به

        // تحقق من وجود الفاصل '/'
        if (!value.includes('/')) {
          return context.createError({
            message:
              t('Inputs.errorsMsgs.invalidDateFormat') ||
              'التاريخ يجب أن يحتوي على الفاصل "/" بالشكل MM/DD/YYYY',
          });
        }

        const parts = value.split('/');
        if (parts.length !== 3) {
          return context.createError({
            message:
              t('Inputs.errorsMsgs.invalidDateStructure') ||
              'التاريخ غير صحيح، يجب أن يكون بالشكل MM/DD/YYYY',
          });
        }

        const [month, day, year] = parts.map(Number);

        if (isNaN(month) || isNaN(day) || isNaN(year)) {
          return context.createError({
            message:
              t('Inputs.errorsMsgs.invalidDateNumbers') ||
              'التاريخ يجب أن يحتوي على أرقام صحيحة فقط',
          });
        }

        if (month < 1 || month > 12) {
          return context.createError({
            message:
              t('Inputs.errorsMsgs.invalidMonth') ||
              'الشهر يجب أن يكون بين 1 و 12',
          });
        }

        if (day < 1 || day > 31) {
          return context.createError({
            message:
              t('Inputs.errorsMsgs.invalidDay') ||
              'اليوم يجب أن يكون بين 1 و 31',
          });
        }

        if (year < 1935 || year > currentYear) {
          return context.createError({
            message: `${t('Inputs.errorsMsgs.invalidDate')} ${currentYear}`,
          });
        }

        return true; // Everything is correct
      }),

    gender: Yup.string()
      .nullable()
      .optional()
      .test(
        'valid-gender',
        'القيمة غير صحيحة',
        (value) => !value || ['male', 'female'].includes(value)
      ),
    password: Yup.string().nullable().optional(),
    password_confirmation: Yup.string()
      .nullable()
      .optional()
      .oneOf(
        [Yup.ref('password'), null],
        t('Inputs.errorsMsgs.repasswordNotMatch')
      ),
    photo: Yup.mixed()
      .nullable()
      .optional()
      .test('is-file-or-null', t('Inputs.errorsMsgs.invalidImage'), (value) => {
        if (!value) return true;
        return value instanceof FileList || typeof value === 'string';
      }),
  });

export const getAccountDefaultValues = (user: any) => ({
  name: user?.name || '',
  email: user?.email || '',
  phone: user?.phone || '',
  date: user?.date || '',
  // date: user?.date
  //   ? new Date(user.date).toISOString().split('T')[0] // YYYY-MM-DD
  //   : '',
  gender: user?.gender || null,
  photo: user?.photo || null,
  password: user?.password || null,
  password_confirmation: user?.password_confirmation || null,
});

export const toFormData = (data: Record<string, any>) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'photo') {
      if (value instanceof FileList && value.length > 0)
        formData.append('photo', value[0]);
    } else if (value != null) {
      formData.append(key, value as any);
    } else {
      formData.append(key, value ?? ''); // Always make the value an empty string instead of null/undefined
    }
  });
  return formData;
};
