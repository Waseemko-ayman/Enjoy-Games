import {
  FaChartBar,
  FaCrown,
  FaDiamond,
  FaFacebook,
  FaFlag,
  FaGift,
  // FaHeart,
  FaInstagram,
  FaRegFlag,
  FaRegGem,
  FaRegStar,
  FaSackDollar,
  FaSnapchat,
  FaTelegram,
  FaTiktok,
  FaUser,
  // FaWallet,
} from 'react-icons/fa6';
import { IoArrowRedoOutline } from 'react-icons/io5';
import { MdEmail, MdOutlineAlternateEmail } from 'react-icons/md';
import { PiSparkleFill } from 'react-icons/pi';
import { PATHS } from './paths';
import {
  IoMdHelpCircle,
  IoMdHelpCircleOutline,
  IoMdPricetag,
} from 'react-icons/io';
import { FiAward, FiLogOut, FiTrendingUp } from 'react-icons/fi';
import { InputItem, RewardTier } from '@/interfaces';
import { FaTachometerAlt } from 'react-icons/fa';

export const EnjoyWinWinData = [
  // {
  //   id: 1,
  //   translationKey: 'participateAndWin',
  //   buttonTextKey: 'MoreAboutParticipateAndWin',
  //   image: '/assets/coin.gif',
  //   href: '#',
  // },
  {
    id: 1,
    translationKey: 'enjoyGames',
    buttonTextKey: 'MoreAboutEnjoyGames',
    image: '/assets/coin.gif',
    href: PATHS.STARS.link,
  },
];

export const ServiceData = [
  {
    id: 1,
    image: 'paper-plane.gif',
    alt: 'paper-plane',
    translationKey: 'paperPlane',
  },
  {
    id: 2,
    image: 'credit-card.gif',
    alt: 'credit-card',
    translationKey: 'creditCard',
  },
  {
    id: 3,
    image: 'phone.gif',
    alt: 'phone',
    translationKey: 'phone',
  },
];

export const contactData = [
  {
    id: 1,
    label: 'email',
    email: 'Info@enjoygames.shop',
    icon: MdEmail,
  },
  {
    id: 2,
    label: 'helpCenter',
    email: 'Support@chargerspeed.online',
    icon: IoMdHelpCircle,
  },
];

export const FOOTER_LINKS_DATA = {
  LearnMore: [
    {
      id: 1,
      key: 'about',
      url: PATHS.ABOUT.link,
    },
    {
      id: 2,
      key: 'faqs',
      url: PATHS.FAQS.link,
    },
    {
      id: 3,
      key: 'privacyPolicy',
      url: PATHS.PRIVACY_POLICY.link,
    },
    {
      id: 4,
      key: 'refundPolicy',
      url: PATHS.REFUND_POLICY.link,
    },
    {
      id: 5,
      key: 'termsOfUse',
      url: PATHS.TERMS_OF_USER.link,
    },
  ],
  BusinessAndSolutions: [
    {
      id: 1,
      key: 'news',
      url: '#',
    },
    {
      id: 2,
      key: 'helpCenter',
      url: '#',
    },
  ],
  shop_app: [
    {
      id: 1,
      src: '/assets/digitals-stores/play.jpg',
      alt: 'Google Play Logo',
      url: '#',
      ariaLabel: 'googlePlayApp',
    },
    {
      id: 2,
      src: '/assets/digitals-stores/app.jpg',
      alt: 'App Store Logo',
      url: '#',
      ariaLabel: 'appStoreApp',
    },
  ],
  socialMedia: [
    {
      id: 1,
      url: 'https://www.facebook.com/profile.php?id=61568686790856',
      icon: FaFacebook,
      ariaLabel: 'facebook',
    },
    {
      id: 2,
      url: 'https://t.me/azouzz1994',
      icon: FaTelegram,
      ariaLabel: 'telegram',
    },
    {
      id: 3,
      url: 'https://www.instagram.com/charger_speed?igsh=Yms4bWU1bWZhM3hq&utm_source=qr',
      icon: FaInstagram,
      ariaLabel: 'instagram',
    },
    {
      id: 4,
      url: 'https://www.tiktok.com/@charger_speed?_t=ZS-8z7OVQX2Nc2&_r=1',
      icon: FaTiktok,
      ariaLabel: 'tiktok',
    },
    {
      id: 5,
      url: 'https://t.snapchat.com/VWSRbZOT',
      icon: FaSnapchat,
      ariaLabel: 'snapchat',
    },
  ],
};

export const menuLists = [
  {
    id: 1,
    linksItem: [
      { id: 1, key: 'stars', icon: IoArrowRedoOutline, link: PATHS.STARS.link },
      // { id: 2, key: 'wallet', icon: IoWalletOutline, link: PATHS.WALLET.link },
      // {
      //   id: 3,
      //   key: 'interests',
      //   icon: FaHeart,
      //   link: PATHS.MY_ACCOUNT.INTERESTS.link,
      // },
    ],
  },
  {
    id: 2,
    linksItem: [
      { id: 1, key: 'tickets', icon: FaRegFlag, link: PATHS.TICKETS.ROOT.link },
      {
        id: 2,
        key: 'faqs',
        icon: IoMdHelpCircleOutline,
        link: PATHS.FAQS.link,
      },
      {
        id: 3,
        key: 'referrals',
        icon: FaRegFlag,
        link: PATHS.REFERRALS.link,
      },
      {
        id: 4,
        key: 'dashboard',
        icon: FaTachometerAlt,
        link: PATHS.DASHBOARD.HOME.ROOT,
      },
      // { id: 3, key: 'TalkToCustomerService', icon: MdOutlineEmail, link: '#' },
    ],
  },
];

export const userList = [
  {
    section: 'account',
    items: [
      { id: 1, title: 'حسابي', link: PATHS.MY_ACCOUNT.ROOT.link, icon: FaUser },
      {
        id: 2,
        title: 'طلباتي',
        link: PATHS.MY_PURCHASES.ROOT.link,
        icon: IoMdPricetag,
      },
      {
        id: 3,
        title: 'تذاكر الدعم الفني',
        link: PATHS.TICKETS.ROOT.link,
        icon: FaFlag,
      },
    ],
  },
  // {
  //   section: 'rank',
  //   rank: {
  //     level: 1,
  //     title: 'الرتبة الحالية لحسابك',
  //     subtitle: 'زيادة الرتبة تعني زيادة العائد لكل عملية',
  //   },
  // },
  {
    section: 'general',
    items: [
      // {
      //   id: 4,
      //   title: 'برنامج مكسب',
      //   link: PATHS.MAX_PROGRAM.link,
      //   icon: FaLink,
      // },
      {
        id: 4,
        title: 'ولاء إنجوي',
        link: PATHS.STARS.link,
        icon: PiSparkleFill,
      },
      // {
      //   id: 5,
      //   title: 'الإهتمامات',
      //   link: PATHS.MY_ACCOUNT.INTERESTS.link,
      //   icon: FaHeart,
      // },
    ],
  },
  {
    section: 'wallet',
    items: [
      // {
      //   id: 8,
      //   title: 'المحفظة',
      //   link: PATHS.WALLET.link,
      //   icon: FaWallet,
      //   badge: '#0',
      // },
      {
        id: 8,
        title: 'دعواتي',
        link: PATHS.REFERRALS.link,
        icon: FaFlag,
      },
    ],
  },
  {
    section: 'dashboard',
    items: [
      {
        id: 10,
        title: 'لوحة التحكم',
        link: PATHS.DASHBOARD.HOME.ROOT,
        icon: FaTachometerAlt,
      },
    ],
  },
  {
    section: 'logout',
    items: [{ id: 11, title: 'تسجيل خروج', icon: FiLogOut }],
  },
];

export const countries = [
  {
    name: 'السعودية',
    currency: 'الريال السعودي',
    img: 'saudi-arabia',
    code: 'SAR',
  },
  {
    name: 'الإمارات',
    currency: 'درهم إماراتي',
    img: 'united-arab-emirates',
    code: 'AED',
  },
  {
    name: 'الكويت',
    currency: 'الدينار الكويتي',
    img: 'kuwait',
    code: 'KWD',
  },
  {
    name: 'قطر',
    currency: 'الريال القطري',
    img: 'qatar',
    code: 'QAR',
  },
  {
    name: 'البحرين',
    currency: 'الدينار البحريني',
    img: 'bahrain',
    code: 'BHD',
  },
  {
    name: 'عمان',
    currency: 'الريال العماني',
    img: 'oman',
    code: 'OMR',
  },
  {
    name: 'العراق',
    currency: 'الدينار العراقي',
    img: 'iraq',
    code: 'IQD',
  },
  {
    name: 'مصر',
    currency: 'الجنيه المصري',
    img: 'egypt',
    code: 'EGP',
  },
  {
    name: 'الأردن',
    currency: 'الدينار الأردني',
    img: 'jordan',
    code: 'JOD',
  },
  {
    name: 'الولايات المتحدة',
    currency: 'الدولار الأمريكي',
    img: 'usa',
    code: 'USD',
  },
  {
    name: 'ألمانيا',
    currency: 'اليورو',
    img: 'germany',
    code: 'EUR',
  },
  {
    name: 'المملكة المتحدة',
    currency: 'الجنيه الإسترليني',
    img: 'united-kingdom',
    code: 'GBP',
  },
  {
    name: 'أستراليا',
    currency: 'الدولار الأسترالي',
    img: 'australia',
    code: 'AUD',
  },
];

export const featuresData = [
  {
    id: 1,
    key: 'feature1',
    bgColor: 'bg-enjoy-primary-deep',
    textColor: 'text-white',
    icon: FiTrendingUp,
  },
  {
    id: 2,
    key: 'feature2',
    bgColor: 'bg-enjoy-secondary-soft',
    icon: FaGift,
  },
  {
    id: 3,
    key: 'feature3',
    bgColor: 'bg-enjoy-glass',
    icon: FaChartBar,
  },
  {
    id: 4,
    key: 'feature4',
    bgColor: 'bg-enjoy-primary-soft',
    icon: FaSackDollar,
  },
];

export const tiers = [
  {
    id: 1,
    key: 'junior',
    icon: FaRegGem,
    amount: 0, // أول ما يسجل
    percentage: 0.0025, // 0.25% خصم
    isActive: true,
  },
  {
    id: 2,
    key: 'active',
    icon: FaCrown,
    amount: 750, // ≈ 200$
    percentage: 0.004, // 0.4% خصم
    isActive: false,
  },
  {
    id: 3,
    key: 'pro',
    icon: FaRegStar,
    amount: 1876, // ≈ 500$
    percentage: 0.005, // 0.5% خصم
    isActive: false,
  },
  {
    id: 4,
    key: 'expert',
    icon: FiAward,
    amount: 3752, // ≈ 1000$
    percentage: 0.007, // 0.7% خصم
    isActive: false,
  },
  {
    id: 5,
    key: 'vip',
    icon: FaDiamond,
    amount: 18760, // ≈ 5000$
    percentage: 0.01, // 1% خصم
    isActive: false,
  },
];

export const inviteStepsData = [
  {
    id: 1,
    title: 'انسخ رابط الدعوة',
    description:
      'تقوم بداية بنسخ رابط الدعوة الفريد الخاص بك لتستطيع مشاركته مع أصدقائك ومعارفك',
    image: 'character-2',
    footerType: 'button',
  },
  {
    id: 2,
    title: 'شارك الرابط مع الأصدقاء',
    description:
      'أرسل رابط الدعوة لأصدقائك ومعارفك عبر الواتساب، تويتر، أو حتى الحمام الزاجل. كلما زاد عدد المشاركين، زادت أرباحك.',
    image: 'character-3',
    footerType: 'social',
    socialLinks: [
      { icon: '/icons/whatsapp.svg', href: '#' },
      { icon: '/icons/twitter.svg', href: '#' },
      { icon: '/icons/pigeon.svg', href: '#' },
    ],
    order: 'left',
  },
  {
    id: 3,
    title: 'اربح 0.7% على كل عملية',
    description:
      'كل مرة يشتري أحد أصدقائك عبر رابط الدعوة الخاص بك، تربح 0.7% تضاف إلى محفظتك بكل سهولة!',
    image: 'character-4',
    footerType: 'none',
  },
  {
    id: 4,
    title: 'انتقل للمستوى التالي',
    description: 'دليل تتيح لك 5 مستويات بنسبة عائد تصل الى 0.7%',
    image: 'character-5',
    footerType: 'none',
    order: 'left',
  },
];

export const mockApiData: RewardTier[] = [
  { id: 1, key: 'البرونزية', percentage: 0.3, isActive: true },
  { id: 2, key: 'الفضية', percentage: 0.4, isActive: false },
  { id: 3, key: 'الذهبية', percentage: 0.5, isActive: false },
  { id: 4, key: 'البلاتينيوم', percentage: 0.6, isActive: false },
  { id: 5, key: 'VIP', percentage: 0.7, isActive: false },
];

export const inputData = [
  {
    id: 1,
    label: 'الإسم',
    icon: FaUser,
    name: 'name',
  },
  {
    id: 2,
    label: 'البريد الإلكتروني',
    type: 'email',
    icon: MdOutlineAlternateEmail,
    name: 'email',
  },
  {
    id: 3,
    type: 'number',
    label: 'رقم الجوال',
    placeholder: 'xxxxxxxxx',
    name: 'phone',
  },
  {
    id: 4,
    label: 'تاريخ الميلاد',
    type: 'date',
    placeholder: '--/--/----',
    name: 'birthDate',
  },
  {
    id: 5,
    label: 'الجنس',
    type: 'select',
    placeholder: 'gender',
    name: 'gender',
    options: [
      {
        id: 1,
        value: 'male',
        labelKey: 'male',
      },
      {
        id: 2,
        value: 'female',
        labelKey: 'female',
      },
    ],
  },
  {
    id: 6,
    type: 'password',
    label: 'password',
    name: 'password',
    placeholder: 'yourPassword',
  },
  {
    id: 7,
    type: 'password',
    label: 'password_confirmation',
    name: 'password_confirmation',
    placeholder: 'repassword',
  },
];

export const InterestsData = [
  {
    id: 1,
    src: '/assets/contactAndData.webp',
    alt: 'هدايا',
    title: 'هدايا',
  },
  {
    id: 2,
    src: '/assets/contactAndData.webp',
    alt: 'هدايا',
    title: 'هدايا',
  },
  {
    id: 3,
    src: '/assets/contactAndData.webp',
    alt: 'هدايا',
    title: 'هدايا',
  },
  {
    id: 4,
    src: '/assets/contactAndData.webp',
    alt: 'هدايا',
    title: 'هدايا',
  },
  {
    id: 5,
    src: '/assets/contactAndData.webp',
    alt: 'هدايا',
    title: 'هدايا',
  },
  {
    id: 6,
    src: '/assets/contactAndData.webp',
    alt: 'هدايا',
    title: 'هدايا',
  },
  {
    id: 7,
    src: '/assets/contactAndData.webp',
    alt: 'هدايا',
    title: 'هدايا',
  },
];

export const ticketsInputsTypes = [
  {
    id: 1,
    name: 'subject',
    placeholder: 'عنوان التذكرة',
  },
  // {
  //   id: 2,
  //   type: 'select',
  //   name: 'ticketType',
  //   placeholder: 'حدد نوع التذكرة',
  //   options: [
  //     {
  //       id: 1,
  //       label: 'مشكلة بأحد الطلبات',
  //       value: 'order-issue',
  //     },
  //     {
  //       id: 2,
  //       label: 'مشكلة بالدفع والتحويل',
  //       value: 'payment-issue',
  //     },
  //     {
  //       id: 3,
  //       label: 'اقتراح او شيء اخر',
  //       value: 'suggestion-or-other',
  //     },
  //   ],
  // },
  {
    id: 2,
    type: 'textarea',
    name: 'message',
    placeholder: 'يرجي كتابة وصف لمساعتدك بشكل أدق',
  },
];

export const accessInputs: InputItem[] = [
  {
    id: 1,
    inputName: 'login_method',
    labelKey: 'login_method',
    type: 'select',
    options: [
      { id: 1, value: 'phone', labelKey: 'phone' },
      { id: 2, value: 'email', labelKey: 'email' },
      { id: 3, value: 'twitter', labelKey: 'twitter' },
      { id: 4, value: 'facebook', labelKey: 'facebook' },
    ],
    errorKey: 'loginMethodRequired',
  },
  {
    id: 2,
    inputName: 'email_phone',
    labelKey: 'phone',
    type: 'text',
    errorKey: 'phoneRequired',
  },
  {
    id: 3,
    inputName: 'password',
    labelKey: 'password',
    type: 'password',
    errorKey: 'passwordRequired',
  },
  {
    id: 4,
    inputName: 'account_id',
    labelKey: 'accountId',
    type: 'text',
    errorKey: 'accountIdRequired',
  },
  {
    id: 5,
    inputName: 'checkbox',
    labelKey: 'unlockAccount',
    type: 'checkbox',
    placeholder: 'تم الإلغاء',
    errorKey: 'unlockAccountRequired',
  },
];

export const codeInputs: InputItem[] = [
  {
    id: 1,
    inputName: 'email',
    labelKey: 'email',
    errorKey: 'emailRequired',
    type: 'email',
  },
];

export const accountIdInputs: InputItem[] = [
  {
    id: 1,
    inputName: 'account_id',
    labelKey: 'accountId',
    errorKey: 'accountIdRequired',
    type: 'number',
  },
];

export const multiIdInputs: InputItem[] = [
  {
    id: 1,
    inputName: 'account_1',
    labelKey: 'accountId',
    errorKey: 'accountIdRequired',
    type: 'number',
  },
  {
    id: 2,
    inputName: 'account_2',
    labelKey: 'accountId',
    errorKey: 'accountIdRequired',
    type: 'number',
  },
];

export const accountOptions = [
  'accountOptions.sendCardCodeToEmail',
  'accountOptions.getUpdates',
  'accountOptions.specialOccasions',
  'accountOptions.interestsInfo',
];

export const MyPurchasesTypes = [
  { id: 1, labelKey: 'all' },
  { id: 2, labelKey: 'completed' },
  { id: 3, labelKey: 'pending' },
  { id: 4, labelKey: 'cancelled' },
  { id: 5, labelKey: 'paid' },
  { id: 6, labelKey: 'processing' },
];

export const FaqsFilterTypes = [
  { id: 1, labelKey: 'all' },
  { id: 2, labelKey: 'generated' },
  { id: 3, labelKey: 'manual' },
];

export const loginInputs = [
  {
    id: 1,
    type: 'email',
    label: 'email',
    name: 'email',
    placeholder: 'writeYorEmail',
  },
  {
    id: 2,
    type: 'password',
    label: 'password',
    name: 'password',
    placeholder: 'yourPassword',
  },
];

export const signupInputs = [
  // ...loginInputs,
  {
    id: 1,
    type: 'text',
    label: 'name',
    name: 'name',
    placeholder: 'writeYorName',
  },
  {
    id: 2,
    type: 'email',
    label: 'email',
    name: 'email',
    placeholder: 'writeYorEmail',
  },
  {
    id: 3,
    type: 'password',
    label: 'password',
    name: 'password',
    placeholder: 'yourPassword',
  },
  {
    id: 4,
    type: 'password',
    label: 'password_confirmation',
    name: 'password_confirmation',
    placeholder: 'repassword',
  },
  {
    id: 5,
    type: 'text',
    label: 'referral_code',
    name: 'referral_code',
    placeholder: 'referralCode',
  },
];
