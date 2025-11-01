/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup';
import { alphanumericWithArabicRegex, emailRegex, phoneReqExp } from './regex';

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
    date: Yup.string()
      .nullable()
      .optional()
      .test(
        'valid-date',
        `${t('Inputs.errorsMsgs.invalidDate')} ${currentYear}`,
        (value) => {
          if (!value) return true;
          const year = new Date(value).getFullYear();
          return year >= 1935 && year <= currentYear;
        }
      ),
    gender: Yup.string()
      .nullable()
      .optional()
      .test(
        'valid-gender',
        t('Inputs.errorsMsgs.genderInvalid'),
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

export const getUserSchema = (
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
    email: Yup.string()
      .email()
      .matches(emailRegex, t('Inputs.errorsMsgs.emailPatternInvalid'))
      .required(t('Inputs.errorsMsgs.emailRequired')),
    password: Yup.string().required(t('Inputs.errorsMsgs.passwordRequired')),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password')], t('Inputs.errorsMsgs.repasswordNotMatch'))
      .required(t('Inputs.errorsMsgs.repasswordRequired')),
    date: Yup.string()
      .nullable()
      .optional()
      .test(
        'valid-date',
        `${t('Inputs.errorsMsgs.invalidDate')} ${currentYear}`,
        (value) => {
          if (!value) return true;
          const year = new Date(value).getFullYear();
          return year >= 1935 && year <= currentYear;
        }
      ),
    gender: Yup.string()
      .nullable()
      .optional()
      .test(
        'valid-gender',
        t('Inputs.errorsMsgs.genderInvalid'),
        (value) => !value || ['male', 'female'].includes(value)
      ),
    phone: Yup.string()
      .nullable()
      .optional()
      .matches(phoneReqExp, t('Inputs.errorsMsgs.phoneInvalid')),
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
  gender: user?.gender || null,
  photo: user?.photo || null,
  password: user?.password || null,
  password_confirmation: user?.password_confirmation || null,
  permissions: user?.permissions || [],
});

export const toFormData = (data: Record<string, any>) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'photo') {
      if (value instanceof FileList && value.length > 0) {
        formData.append('photo', value[0]); // إرسال الملف نفسه
      }
      // لا تفعل شيء إذا القيمة string (اسم الصورة موجود مسبقًا)
    } else if (key === 'permissions' && Array.isArray(value)) {
      value.forEach((v) => formData.append('permissions[]', v));
    } else if (value != null) {
      formData.append(key, value as any);
    } else {
      formData.append(key, '');
    }
  });

  return formData;
};

