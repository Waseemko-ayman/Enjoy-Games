import { DollarSign } from 'lucide-react';
import { Home } from 'lucide-react';
import { FaBox, FaImages, FaList, FaSitemap } from 'react-icons/fa6';
import { IoBarcodeSharp } from 'react-icons/io5';
// import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
import { FaQuestionCircle, FaTachometerAlt } from 'react-icons/fa';
import { PATHS } from '@/data/paths';

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
    icon: FaBox,
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
  // {
  //   title: 'tickets',
  //   href: PATHS.DASHBOARD.TICKETS,
  //   icon: FaTicketAlt,
  // },
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
  //   title: 'Notifications',
  //   href: PATHS.DASHBOARD.NOTIFICATIONS.ROOT,
  //   icon: Bell,
  // },
  // {
  //   title: 'Settings',
  //   href: PATHS.DASHBOARD.SETTINGS,
  //   icon: Settings,
  // },
];

export const CreateCampaingTabFields = [
  {
    id: 'campaign-name',
    name: 'campaignName',
    label: 'Campaign Name',
    type: 'text',
    placeholder: 'Enter campaign name',
  },
  {
    id: 'email-subject',
    name: 'emailSubject',
    label: 'Email Subject',
    type: 'text',
    placeholder: 'Enter email subject',
  },
  {
    id: 'template',
    name: 'template',
    label: 'Template',
    type: 'select',
    options: [
      { value: 'thank-you', label: 'Thank You Template' },
      { value: 'newsletter', label: 'Newsletter Template' },
      { value: 'fundraising', label: 'Fundraising Template' },
    ],
    SelectValuePlaceholder: 'Select the template',
  },
  {
    id: 'email-content',
    name: 'emailContent',
    label: 'Email Content',
    type: 'textarea',
    placeholder: 'Enter email content...',
  },
  {
    id: 'recipient-group',
    name: 'recipientGroup',
    label: 'Recipient Group',
    type: 'select',
    options: [
      { value: 'all-donors', label: 'All Donors' },
      { value: 'recent-donors', label: 'Recent Donors (Last 30 Days)' },
      { value: 'major-donors', label: 'Major Donors' },
      { value: 'inactive-donors', label: 'Inactive Donors' },
    ],
    SelectValuePlaceholder: 'Select recipient group',
  },
];

export const CreateCategoriesFields = [
  {
    id: 'name[ar]',
    name: 'nameAr',
    label: 'الإسم (عربي)',
    placeholder: 'أكتب الاسم بالعربية',
    type: 'text',
  },
  {
    id: 'name[en]',
    name: 'nameEn',
    label: 'الإسم (إنجليزي)',
    placeholder: 'أكتب الاسم بالإنجليزية',
    type: 'text',
  },
  {
    id: 'icon',
    name: 'icon',
    label: 'أيقونة',
    placeholder: 'أيقونة',
    type: 'file',
  },
  {
    id: 'image',
    name: 'image',
    label: 'صورة',
    placeholder: 'صورة',
    type: 'file',
  },
];

export const CreateSubCategoriesFields = [
  {
    id: 'name[ar]',
    name: 'nameAr',
    label: 'الإسم (عربي)',
    placeholder: 'أكتب الاسم بالعربية',
    type: 'text',
  },
  {
    id: 'name[en]',
    name: 'nameEn',
    label: 'الإسم (إنجليزي)',
    placeholder: 'أكتب الاسم بالإنجليزية',
    type: 'text',
  },
  {
    id: 'icon',
    name: 'icon',
    label: 'أيقونة',
    placeholder: 'أيقونة',
    type: 'file',
  },
  {
    id: 'image',
    name: 'image',
    label: 'صورة',
    placeholder: 'صورة',
    type: 'file',
  },
  {
    id: 'category_id',
    name: 'categoryID',
    label: 'القسم',
    placeholder: 'القسم',
    type: 'select',
  },
  {
    id: 'parent_id',
    name: 'parentID',
    label: 'القسم الثانوي',
    placeholder: 'القسم الثانوي',
    type: 'select',
  },
];

export const CreateProductsFields = [
  {
    id: 'title[ar]',
    name: 'titleAr',
    label: 'العنوان (عربي)',
    placeholder: 'أكتب العنوان بالعربية',
    type: 'text',
  },
  {
    id: 'title[en]',
    name: 'titleEn',
    label: 'العنوان (إنجليزي)',
    placeholder: 'أكتب العنوان بالإنجليزية',
    type: 'text',
  },
  {
    id: 'category_id',
    name: 'categoryID',
    label: 'القسم',
    placeholder: 'القسم',
    type: 'select',
  },
  {
    id: 'sub_category_id',
    name: 'subCategoryID',
    label: 'القسم الثانوي',
    placeholder: 'القسم الثانوي',
    type: 'select',
  },
  {
    id: 'content[ar]',
    name: 'contentAr',
    label: 'المحتوى (عربي)',
    placeholder: 'أكتب المحتوى بالعربية',
    type: 'editor',
  },
  {
    id: 'content[en]',
    name: 'contentEn',
    label: 'المحتوى (إنجليزي)',
    placeholder: 'أكتب المحتوى بالإنجليزية',
    type: 'editor',
  },
  {
    id: 'description[ar]',
    name: 'descriptionAr',
    label: 'الوصف (عربي)',
    placeholder: 'أكتب الوصف بالعربية',
    type: 'editor',
  },
  {
    id: 'description[en]',
    name: 'descriptionEn',
    label: 'الوصف (إنجليزي)',
    placeholder: 'أكتب الوصف بالإنجليزية',
    type: 'editor',
  },
  {
    id: 'price',
    name: 'price',
    label: 'السعر',
    placeholder: 'أكتب السعر',
    type: 'text',
  },
  {
    id: 'price_before',
    name: 'priceBefore',
    label: 'السعر القديم',
    placeholder: 'أكتب السعر القديم',
    type: 'text',
  },
  {
    id: 'shipping_payment',
    name: 'shippingPayment',
    label: 'طريقة الدفع',
    placeholder: 'طريقة الدفع',
    type: 'select',
    options: [
      { id: 'code', name: 'كود' },
      { id: 'account_id', name: 'رقم تعريفي' },
      { id: 'multi_id', name: 'رقمين تعريفيين' },
      { id: 'access', name: 'صلاحية الدخول أو بيانات الحساب' },
    ],
  },
  {
    id: 'discount',
    name: 'discount',
    label: 'الخصم',
    placeholder: 'أكتب قيمة الخصم',
    type: 'text',
  },
  {
    id: 'image',
    name: 'image',
    label: 'صورة',
    placeholder: 'صورة',
    type: 'file',
  },
  {
    id: 'is_active',
    name: 'isActive',
    label: 'عرض',
    placeholder: '',
    type: 'checkbox',
  },
];

export const CreateImgSliderFields = [
  {
    id: 'image_ar',
    name: 'imageAr',
    label: 'الصورة بالعربية',
    placeholder: 'أضف صورة',
    type: 'file',
  },
  {
    id: 'image_en',
    name: 'imageEn',
    label: 'الصورة بالإنجليزية',
    placeholder: 'أضف صورة',
    type: 'file',
  },
];

export const CreateCodesFields = [
  {
    id: 'product_id',
    name: 'productID',
    label: 'المنتج',
    placeholder: 'المنتج',
    type: 'select',
  },
  {
    id: 'code',
    name: 'code',
    label: 'الكود',
    placeholder: 'أكتب الكود',
    type: 'text',
  },
];

export const CreateCouponsFields = [
  {
    id: 'code',
    name: 'code',
    label: 'الكود',
    placeholder: 'أكتب الكود',
    type: 'text',
  },
  {
    id: 'value',
    name: 'value',
    label: 'القيمة',
    placeholder: 'أدخل قيمة الكوبون',
    type: 'text',
  },
  {
    id: 'type',
    name: 'type',
    label: 'نوع الكوبون',
    placeholder: 'اختر النوع',
    type: 'select',
    options: [
      { id: 'fixed', name: 'مقدار ثابت' },
      { id: 'percent', name: 'نسبة مئوية' },
    ],
  },
  {
    id: 'usage_limit',
    name: 'usage_limit',
    label: 'حد الاستخدام',
    placeholder: 'أدخل حد الاستخدام',
    type: 'text',
  },
  {
    id: 'expires_from',
    name: 'expires_from',
    label: 'تاريخ البداية',
    placeholder: 'YYYY-MM-DD',
    type: 'text',
  },
  {
    id: 'expires_at',
    name: 'expires_at',
    label: 'تاريخ الانتهاء',
    placeholder: 'YYYY-MM-DD',
    type: 'text',
  },
  {
    id: 'allowed_user_ids',
    name: 'allowed_user_ids',
    label: 'المستخدمين المسموح لهم',
    placeholder: 'اختر المستخدمين',
    type: 'multi-select',
  },
  {
    id: 'excluded_product_ids',
    name: 'excluded_product_ids',
    label: 'المنتجات المستثناة',
    placeholder: 'اختر المنتجات',
    type: 'multi-select',
  },
  {
    id: 'excluded_categories_ids',
    name: 'excluded_categories_ids',
    label: 'الأقسام المستثناة',
    placeholder: 'اختر الأقسام',
    type: 'multi-select',
  },
  {
    id: 'excluded_subcategory_ids',
    name: 'excluded_subcategory_ids',
    label: 'الأقسام الفرعية المستثناة',
    placeholder: 'اختر الأقسام الفرعية',
    type: 'multi-select',
  },
];

export const CreateFaqsFields = [
  {
    id: 'question[ar]',
    name: 'questionAr',
    label: 'السؤال (عربي)',
    placeholder: 'أكتب السؤال بالعربية',
    type: 'text',
  },
  {
    id: 'question[en]',
    name: 'questionEn',
    label: 'السؤال (إنجليزي)',
    placeholder: 'أكتب السؤال بالإنجليزية',
    type: 'text',
  },
  {
    id: 'answer[ar]',
    name: 'answerAr',
    label: 'الجواب (عربي)',
    placeholder: 'أكتب الجواب بالعربية',
    type: 'text',
  },
  {
    id: 'answer[en]',
    name: 'answerEn',
    label: 'الجواب (إنجليزي)',
    placeholder: 'أكتب الجواب بالإنجليزية',
    type: 'text',
  },
];

export const CreateTicketsFields = [
  {
    id: 'subject',
    name: 'subject',
    label: 'العنوان',
    placeholder: 'أكتب العنوان',
    type: 'text',
  },
  {
    id: 'message',
    name: 'message',
    label: 'الوصف',
    placeholder: 'أكتب الوصف...',
    type: 'text',
  },
  {
    id: 'attachments',
    name: 'attachments',
    label: 'المرفقات',
    placeholder: 'إختر ملفات',
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
      { value: 'sandbox', label: 'Sandbox (Testing)' },
      { value: 'live', label: 'Live (Production)' },
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
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' },
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
      { value: '7', label: '7 days' },
      { value: '14', label: '14 days' },
      { value: '30', label: '30 days' },
      { value: '90', label: '90 days' },
      { value: '365', label: '1 year' },
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
        id: 1,
        value: 'male',
        label: 'ذكر',
      },
      {
        id: 2,
        value: 'female',
        label: 'أنثى',
      },
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

export const dashboardLayoutFields = [
  {
    id: 'display-language',
    name: 'displayLanguage',
    label: 'Display Language',
    type: 'select',
    options: [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
      { value: 'de', label: 'German' },
      { value: 'ar', label: 'Arabic' },
    ],
    SelectValuePlaceholder: 'Select language',
  },
  {
    id: 'region',
    name: 'region',
    label: 'Region',
    type: 'select',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'eu', label: 'European Union' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' },
      { value: 'au', label: 'Australia' },
    ],
    SelectValuePlaceholder: 'Select region',
  },
];

export const localizationFields = [
  {
    id: 'sidebar-position',
    name: 'sidebarPosition',
    label: 'Sidebar Position',
    type: 'select',
    options: [
      { value: 'left', label: 'Left' },
      { value: 'right', label: 'Right' },
    ],
    SelectValuePlaceholder: 'Select position',
  },
  {
    id: 'content-density',
    name: 'contentDensity',
    label: 'Content Density',
    type: 'select',
    options: [
      { value: 'comfortable', label: 'Comfortable' },
      { value: 'compact', label: 'Compact' },
    ],
    SelectValuePlaceholder: 'Select density',
  },
];

export const DonorFields = [
  {
    id: 'first-name',
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter first name',
  },
  {
    id: 'last-name',
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Enter last name',
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'Enter email address',
    type: 'email',
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'Phone (Optional)',
    placeholder: 'Enter phone number',
    type: 'tel',
  },
];

export const DonationFields = [
  {
    id: 'amount',
    name: 'amount',
    type: 'number',
    label: 'Amount',
    placeholder: '0.00',
    withIcon: true,
    icon: DollarSign,
  },
  {
    id: 'payment-method',
    name: 'paymentMethod',
    type: 'select',
    label: 'Payment Method',
    options: [
      { value: 'cash', label: 'cash' },
      { value: 'check', label: 'check' },
      { value: 'credit-card', label: 'Credit Card' },
      { value: 'bank-transfer', label: 'Bank Transfer' },
      { value: 'other', label: 'Other' },
    ],
    SelectValuePlaceholder: 'Select payment method',
  },
  {
    id: 'date',
    name: 'date',
    type: 'date',
    label: 'Date',
  },
  {
    id: 'campaign',
    name: 'campaign',
    type: 'select',
    label: 'Campaign (Optional)',
    options: [
      { value: 'general', label: 'General Donation' },
      { value: 'summer', label: 'Summer Fundraiser' },
      { value: 'emergency', label: 'Emergency Relief' },
      { value: 'education', label: 'Education Fund' },
    ],
    SelectValuePlaceholder: 'Select campaign',
  },
  {
    id: 'notes',
    name: 'notes',
    type: 'textarea',
    label: 'Notes (Optional)',
    placeholder: 'Add any additional notes about this donation',
    fullWidth: true,
  },
];
