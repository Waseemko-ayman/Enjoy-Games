import { Home } from 'lucide-react';
import { FaBox, FaImages, FaList, FaSitemap, FaStar } from 'react-icons/fa6';
import { IoBarcodeSharp } from 'react-icons/io5';
import { FaQuestionCircle, FaTachometerAlt, FaTicketAlt } from 'react-icons/fa';
import { PATHS } from '@/data/paths';
import { MdLocalOffer } from 'react-icons/md';
import { FiShoppingCart } from 'react-icons/fi';

export const sidebarLinks = [
  {
    title: 'enjoyGames',
    href: PATHS.HOME.link,
    icon: Home,
  },
  {
    title: 'dashboard',
    href: PATHS.DASHBOARD.HOME.ROOT,
    icon: FaTachometerAlt,
  },
  {
    title: 'categories',
    href: PATHS.DASHBOARD.CATEGORIES,
    icon: FaList,
  },
  {
    title: 'subCategories',
    href: PATHS.DASHBOARD.SUB_CATEGORIES,
    icon: FaSitemap,
  },
  {
    title: 'products',
    href: PATHS.DASHBOARD.PRODUCTS,
    icon: FaBox,
  },
  {
    title: 'coupons',
    href: PATHS.DASHBOARD.COUPONS,
    icon: MdLocalOffer,
  },
  {
    title: 'codes',
    href: PATHS.DASHBOARD.CODES,
    icon: IoBarcodeSharp,
  },
  {
    title: 'sliders',
    href: PATHS.DASHBOARD.SLIDERS,
    icon: FaImages,
  },
  {
    title: 'faqs',
    href: PATHS.DASHBOARD.FAQS,
    icon: FaQuestionCircle,
  },
  {
    title: 'tickets',
    href: PATHS.DASHBOARD.TICKETS,
    icon: FaTicketAlt,
  },
  {
    title: 'ratings',
    href: PATHS.DASHBOARD.RATINGS,
    icon: FaStar,
  },
  {
    title: 'orders',
    href: PATHS.DASHBOARD.ORDERS.ROOT,
    icon: FiShoppingCart,
  },
  // {
  //   title: 'Payment Gateways',
  //   href: PATHS.DASHBOARD.PAYMENT_GATEWAYS,
  //   icon: CreditCard,
  // },
  // {
  //   title: 'Reports',
  //   href: PATHS.DASHBOARD.REPORTS,
  //   icon: BarChart3,
  // },
  // {
  //   title: 'Settings',
  //   href: PATHS.DASHBOARD.SETTINGS,
  //   icon: Settings,
  // },
];

export const CreateCategoriesFields = [
  {
    id: 'name[ar]',
    name: 'nameAr',
    label: 'arabicName',
    placeholder: 'writeArabicName',
    type: 'text',
  },
  {
    id: 'name[en]',
    name: 'nameEn',
    label: 'englishName',
    placeholder: 'writeEnglishName',
    type: 'text',
  },
  {
    id: 'icon',
    name: 'icon',
    label: 'icon',
    placeholder: 'icon',
    type: 'file',
  },
  {
    id: 'image',
    name: 'image',
    label: 'image',
    placeholder: 'addImage',
    type: 'file',
  },
];

export const CreateSubCategoriesFields = [
  {
    id: 'name[ar]',
    name: 'nameAr',
    label: 'arabicName',
    placeholder: 'writeArabicName',
    type: 'text',
  },
  {
    id: 'name[en]',
    name: 'nameEn',
    label: 'englishName',
    placeholder: 'writeEnglishName',
    type: 'text',
  },
  {
    id: 'icon',
    name: 'icon',
    label: 'icon',
    placeholder: 'icon',
    type: 'file',
  },
  {
    id: 'image',
    name: 'image',
    label: 'image',
    placeholder: 'addImage',
    type: 'file',
  },
  {
    id: 'category_id',
    name: 'categoryID',
    label: 'categoryID',
    placeholder: 'categoryID',
    type: 'select',
  },
  {
    id: 'parent_id',
    name: 'parentID',
    label: 'parentID',
    placeholder: 'parentID',
    type: 'select',
  },
];

export const CreateProductsFields = [
  {
    id: 'title[ar]',
    name: 'titleAr',
    label: 'arabicTitle',
    placeholder: 'writeArabicTitle',
    type: 'text',
  },
  {
    id: 'title[en]',
    name: 'titleEn',
    label: 'englishTitle',
    placeholder: 'writeEnglishTitle',
    type: 'text',
  },
  {
    id: 'category_id',
    name: 'categoryID',
    label: 'categoryID',
    placeholder: 'categoryID',
    type: 'select',
  },
  {
    id: 'sub_category_id',
    name: 'subCategoryID',
    label: 'parentID',
    placeholder: 'parentID',
    type: 'select',
  },
  {
    id: 'content[ar]',
    name: 'contentAr',
    label: 'arabicContent',
    placeholder: 'writeArabicContent',
    type: 'editor',
  },
  {
    id: 'content[en]',
    name: 'contentEn',
    label: 'englishContent',
    placeholder: 'writeEnglishContent',
    type: 'editor',
  },
  {
    id: 'description[ar]',
    name: 'descriptionAr',
    label: 'arabicDescription',
    placeholder: 'writeArabicDescription',
    type: 'editor',
  },
  {
    id: 'description[en]',
    name: 'descriptionEn',
    label: 'englishDescription',
    placeholder: 'writeEnglishDescription',
    type: 'editor',
  },
  {
    id: 'price',
    name: 'price',
    label: 'price',
    placeholder: 'writePrice',
    type: 'text',
  },
  {
    id: 'price_before',
    name: 'priceBefore',
    label: 'priceBefore',
    placeholder: 'writePriceBefore',
    type: 'text',
  },
  {
    id: 'shipping_payment',
    name: 'shippingPayment',
    label: 'shippingPayment',
    placeholder: 'shippingPayment',
    type: 'select',
    options: [
      { id: 'code', name: 'code' },
      { id: 'account_id', name: 'accountId' },
      { id: 'multi_id', name: 'multiId' },
      { id: 'access', name: 'access' },
    ],
    // options: [
    //   { id: 'code', name: 'كود' },
    //   { id: 'account_id', name: 'رقم تعريفي' },
    //   { id: 'multi_id', name: 'رقمين تعريفيين' },
    //   { id: 'access', name: 'صلاحية الدخول أو بيانات الحساب' },
    // ],
  },
  {
    id: 'discount',
    name: 'discount',
    label: 'discount',
    placeholder: 'writeDiscount',
    type: 'text',
  },
  {
    id: 'image',
    name: 'image',
    label: 'image',
    placeholder: 'addImage',
    type: 'file',
  },
  {
    id: 'is_active',
    name: 'isActive',
    label: 'isActive',
    placeholder: 'isActive',
    type: 'checkbox',
  },
];

export const CreateImgSliderFields = [
  {
    id: 'image_ar',
    name: 'imageAr',
    label: 'arabicImage',
    placeholder: 'addImage',
    type: 'file',
  },
  {
    id: 'image_en',
    name: 'imageEn',
    label: 'englishImage',
    placeholder: 'addImage',
    type: 'file',
  },
];

export const CreateCodesFields = [
  {
    id: 'product_id',
    name: 'productID',
    label: 'productID',
    placeholder: 'productID',
    type: 'select',
  },
  {
    id: 'code',
    name: 'code',
    label: 'code',
    placeholder: 'writeCode',
    type: 'text',
  },
];

export const CreateCouponsFields = [
  {
    id: 'code',
    name: 'code',
    label: 'code',
    placeholder: 'writeCode',
    type: 'text',
  },
  {
    id: 'value',
    name: 'value',
    label: 'value',
    placeholder: 'writeValue',
    type: 'text',
  },
  {
    id: 'type',
    name: 'type',
    label: 'typeCoupon',
    placeholder: 'selectType',
    type: 'select',
    options: [
      { id: 'fixed', name: 'fixed' },
      { id: 'percent', name: 'percent' },
    ],
    // options: [
    //   { id: 'fixed', name: 'مقدار ثابت' },
    //   { id: 'percent', name: 'نسبة مئوية' },
    // ],
  },
  {
    id: 'usage_limit',
    name: 'usage_limit',
    label: 'usageLimit',
    placeholder: 'writeUsageLimit',
    type: 'text',
  },
  {
    id: 'expires_from',
    name: 'expires_from',
    label: 'expiresFrom',
    placeholder: 'YYYY-MM-DD',
    type: 'text',
  },
  {
    id: 'expires_at',
    name: 'expires_at',
    label: 'expiresAt',
    placeholder: 'YYYY-MM-DD',
    type: 'text',
  },
  {
    id: 'allowed_user_ids',
    name: 'allowed_user_ids',
    label: 'allowedUserIds',
    placeholder: 'selectUsers',
    type: 'multi-select',
  },
  {
    id: 'excluded_product_ids',
    name: 'excluded_product_ids',
    label: 'excludedProductIds',
    placeholder: 'selectProducts',
    type: 'multi-select',
  },
  {
    id: 'excluded_categories_ids',
    name: 'excluded_categories_ids',
    label: 'excludedCategoriesIds',
    placeholder: 'selectCategories',
    type: 'multi-select',
  },
  {
    id: 'excluded_subcategory_ids',
    name: 'excluded_subcategory_ids',
    label: 'excludedSubcategoryIdds',
    placeholder: 'selectSsubCategories',
    type: 'multi-select',
  },
];

export const CreateFaqsFields = [
  {
    id: 'question[ar]',
    name: 'questionAr',
    label: 'arabicQuestion',
    placeholder: 'writeArabicQuestion',
    type: 'text',
  },
  {
    id: 'question[en]',
    name: 'questionEn',
    label: 'englishQuestion',
    placeholder: 'writeEnglishQuestion',
    type: 'text',
  },
  {
    id: 'answer[ar]',
    name: 'answerAr',
    label: 'arabicAnswer',
    placeholder: 'writeArabicAnswer',
    type: 'text',
  },
  {
    id: 'answer[en]',
    name: 'answerEn',
    label: 'englishAnswer',
    placeholder: 'writeEnglishAnswer',
    type: 'text',
  },
];

export const CreateTicketsFields = [
  {
    id: 'subject',
    name: 'subject',
    label: 'subject',
    placeholder: 'writeSubject',
    type: 'text',
  },
  {
    id: 'message',
    name: 'message',
    label: 'message',
    placeholder: 'writeMessage',
    type: 'text',
  },
  {
    id: 'attachments',
    name: 'attachments',
    label: 'attachments',
    placeholder: 'selectAttachments',
    type: 'file',
  },
];

export const PayPalSettingsFields = [
  {
    id: 'paypal-client-id',
    name: 'clientID',
    label: 'Client ID',
    placeholder: 'Client ID...',
  },
  {
    id: 'paypal-secret',
    name: 'clientSecret',
    label: 'Client Secret',
    placeholder: 'Client Secret...',
    type: 'password',
  },
  {
    id: 'paypal-mode',
    name: 'environment',
    label: 'Environment',
    type: 'select',
    options: [
      { id: 'sandbox', name: 'Sandbox (Testing)' },
      { id: 'live', name: 'Live (Production)' },
    ],
    SelectValuePlaceholder: 'Select the environment',
  },
];

export const BankTransferSettingsFields = [
  {
    id: 'bank-name',
    name: 'bankName',
    label: 'Bank Name',
    placeholder: 'Bank Name',
  },
  {
    id: 'account-name',
    name: 'accountName',
    label: 'Account Name',
    placeholder: 'Account Name',
  },
  {
    id: 'account-number',
    name: 'accountNumber',
    label: 'Account Number',
    placeholder: 'Account Number',
    type: 'number',
  },
  {
    id: 'routing-number',
    name: 'routingNumber',
    label: 'Routing Number',
    placeholder: 'Routing Number',
    type: 'number',
  },
  {
    id: 'instructions',
    name: 'paymentInstructions',
    label: 'Payment Instructions',
    placeholder: 'Instructions for donors making bank transfers...',
    type: 'textarea',
  },
];

export const BackupSettingsFields = [
  {
    id: 'backup-frequency',
    name: 'backup-frequency',
    label: 'Backup Frequency',
    type: 'select',
    options: [
      { id: 'daily', name: 'Daily' },
      { id: 'weekly', name: 'Weekly' },
      { id: 'monthly', name: 'Monthly' },
    ],
    SelectValuePlaceholder: 'Select frequency',
    fullWidth: true,
  },
  {
    id: 'backup-time',
    name: 'backup-time',
    label: 'Backup Time',
    type: 'time',
    fullWidth: true,
  },
  {
    id: 'retention-period',
    name: 'retention-period',
    label: 'Retention Period',
    type: 'select',
    options: [
      { id: '7', name: '7 days' },
      { id: '14', name: '14 days' },
      { id: '30', name: '30 days' },
      { id: '90', name: '90 days' },
      { id: '365', name: '1 year' },
    ],
    SelectValuePlaceholder: 'Select retention period',
    fullWidth: true,
  },
];

export const notificationTypes = [
  {
    id: 'donation-notifications',
    label: 'Donation Notifications',
    description: 'Receive notifications when new donations are made',
    settingKey: 'donations',
  },
  {
    id: 'campaign-notifications',
    label: 'Campaign Notifications',
    description: 'Receive notifications about campaign progress and goals',
    settingKey: 'campaigns',
  },
  {
    id: 'system-notifications',
    label: 'System Notifications',
    description: 'Receive notifications about system updates and issues',
    settingKey: 'system',
  },
  {
    id: 'report-notifications',
    label: 'Report Notifications',
    description: 'Receive notifications when new reports are available',
    settingKey: 'reports',
  },
];

export const notificationPreferences = [
  {
    id: 'email-notifications',
    label: 'Email Notifications',
    description: 'Receive email notifications for important events',
    settingKey: 'email',
  },
  {
    id: 'browser-notifications',
    label: 'Browser Notifications',
    description: 'Receive browser notifications when using the dashboard',
    settingKey: 'browser',
  },
  {
    id: 'marketing-emails',
    label: 'Marketing Emails',
    description: 'Receive updates about new features and improvements',
    settingKey: 'marketing',
  },
];

export const OrganizationInfoFields = [
  {
    id: 'org-name',
    name: 'orgName',
    label: 'Organization Name',
    placeholder: 'Donation Management System',
  },
  {
    id: 'org-email',
    name: 'contactEmail',
    label: 'Contact Email',
    placeholder: 'contact@example.org',
    type: 'email',
  },
  {
    id: 'org-phone',
    name: 'phone',
    label: 'Phone Number',
    placeholder: '+1 (555) 123-4567',
    type: 'number',
  },
  {
    id: 'org-website',
    name: 'website',
    label: 'Website',
    placeholder: 'https://example.org',
  },
  {
    id: 'address',
    name: 'address',
    label: 'Address',
    placeholder:
      '123 Charity Lane, Suite 101 Nonprofit City, CA 12345 United States',
    type: 'textarea',
    fullWidth: true,
  },
];

export const SystemSettingsFields = [
  {
    id: 'date-format',
    name: 'dateFormat',
    label: 'Date Format',
    type: 'select',
    options: [
      { id: 'MM/DD/YYYY', name: 'MM/DD/YYYY' },
      { id: 'DD/MM/YYYY', name: 'DD/MM/YYYY' },
      { id: 'YYYY-MM-DD', name: 'YYYY-MM-DD' },
    ],
    SelectValuePlaceholder: 'Select date format',
  },
  {
    id: 'currency',
    name: 'currency',
    label: 'Default Currency',
    type: 'select',
    options: [
      { id: 'USD', name: 'USD ($)' },
      { id: 'EUR', name: 'EUR (€)' },
      { id: 'GBP', name: 'GBP (£)' },
      { id: 'CAD', name: 'CAD ($)' },
      { id: 'AUD', name: 'AUD ($)' },
    ],
    SelectValuePlaceholder: 'Select currency',
  },
  {
    id: 'timezone',
    name: 'timezone',
    label: 'Timezone',
    type: 'select',
    options: [
      { id: 'America/New_York', name: 'Eastern Time (ET)' },
      { id: 'America/Chicago', name: 'Central Time (CT)' },
      { id: 'America/Denver', name: 'Mountain Time (MT)' },
      { id: 'America/Los_Angeles', name: 'Pacific Time (PT)' },
      { id: 'Europe/London', name: 'Greenwich Mean Time (GMT)' },
    ],
    SelectValuePlaceholder: 'Select timezone',
  },
  {
    id: 'language',
    name: 'language',
    label: 'Language',
    type: 'select',
    options: [
      { id: 'en', name: 'English' },
      { id: 'es', name: 'Spanish' },
      { id: 'fr', name: 'French' },
      { id: 'de', name: 'German' },
      { id: 'ar', name: 'Arabic' },
    ],
    SelectValuePlaceholder: 'Select language',
  },
];

export const AccountSettingsFields = [
  {
    id: 'name',
    name: 'name',
    label: 'الإسم',
    placeholder: 'Enter your first name',
    // fullWidth: true,
  },
  {
    id: 'email',
    name: 'email',
    label: 'البريد الإلكتروني',
    type: 'email',
    placeholder: 'example@example.com',
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'رقم الجوال',
    type: 'number',
    placeholder: 'xxxxxxxxx',
  },
  {
    id: 'birthDate',
    name: 'birthDate',
    label: 'تاريخ الميلاد',
    type: 'date',
    placeholder: '--/--/----',
  },
  {
    id: 5,
    label: 'الجنس',
    type: 'select',
    placeholder: 'حدد الجنس',
    name: 'gender',
    options: [
      {
        id: 'male',
        name: 'ذكر',
      },
      {
        id: 'female',
        name: 'أنثى',
      },
      // {
      //   id: 1,
      //   value: 'male',
      //   label: 'ذكر',
      // },
      // {
      //   id: 2,
      //   value: 'female',
      //   label: 'أنثى',
      // },
    ],
  },
];

export const SecuritySettingsFields = [
  {
    id: 'current-password',
    name: 'current-password',
    label: 'Current Password',
    type: 'password',
    placeholder: 'Enter your current password',
  },
  {
    id: 'new-password',
    name: 'newPassword',
    label: 'New Password',
    type: 'password',
    placeholder: 'Enter your new password',
  },
  {
    id: 'confirm-password',
    name: 'rePassword',
    label: 'Confirm New Password',
    type: 'password',
    placeholder: 'Confirm New Password',
  },
];
