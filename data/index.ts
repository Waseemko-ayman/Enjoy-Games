import {
  FaChartBar,
  FaCrown,
  FaDiamond,
  FaFacebook,
  FaFlag,
  FaGift,
  FaHeart,
  FaInstagram,
  FaLinkedin,
  FaRegFlag,
  FaRegGem,
  FaRegHeart,
  FaRegStar,
  FaSackDollar,
  FaStar,
  FaTwitter,
  FaUser,
  FaWallet,
} from 'react-icons/fa6';
import { IoArrowRedoOutline, IoWalletOutline } from 'react-icons/io5';
import {
  MdEmail,
  MdOutlineAlternateEmail,
  MdOutlineEmail,
} from 'react-icons/md';
import { PiSparkleFill } from 'react-icons/pi';
import { PATHS } from './paths';
import {
  IoMdHelpCircle,
  IoMdHelpCircleOutline,
  IoMdPricetag,
} from 'react-icons/io';
import { FiAward, FiLogOut, FiTrendingUp } from 'react-icons/fi';
import { Sparkles, Wallet } from 'lucide-react';
import { BannerSlide, InputItem, RewardTier } from '@/interfaces';

export const shiddats = [
  {
    id: 1,
    name: 'بطاقة شحن جواكر 70,000 توكن',
    image: '/assets/play-station.webp',
    price_before: 77.36,
    price: 88.36,
    storeFlagImg: 'british-flag.png',
    storeName: 'المتجر البريطاني',
    ratings: '1996',
  },
];

export const digitalStores = [
  {
    id: 1,
    category_id: 1,
    slug: null,
    parent_id: null,
    name: 'آيتونز',
    icon: '/assets/play-station.webp',
    image: '/assets/play-station.webp',
    children_count: 0,
    // shiddatData: shiddats,
    // accounts: [
    //   {
    //     id: 1,
    //     label: 'حساب سعودي',
    //     banner: '/assets/play-station.webp',
    //     shiddatData: [shiddats[0], shiddats[1]],
    //   },
    // ],
  },
];

export const gamingPlatforms = [
  {
    id: 1,
    category_id: 1,
    slug: null,
    parent_id: null,
    name: 'بلاي ستيشن',
    icon: '/assets/play-station.webp',
    image: '/assets/play-station.webp',
    children_count: 0,
    // accounts: [
    //   {
    //     id: 'account1',
    //     label: 'حساب سعودي',
    //     banner: '/assets/play-station.webp',
    //     shiddatData: [shiddats[0], shiddats[1]],
    //   },
    // ],
  },
];

export const shoppingCarts = [
  {
    id: 1,
    category_id: 1,
    slug: null,
    parent_id: null,
    name: 'أمازون',
    icon: '/assets/play-station.webp',
    image: '/assets/play-station.webp',
    children_count: 0,
  },
];

export const servicesAndSubscriptions = [
  {
    id: 1,
    category_id: 1,
    slug: null,
    parent_id: null,
    name: 'هنقرستيشن',
    icon: '/assets/play-station.webp',
    image: '/assets/play-station.webp',
    children_count: 0,
  },
];

// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------

export const subMenuItems = [
  {
    id: 1,
    slug: null,
    name: 'متاجر رقمية',
    icon: '/assets/digitalStores.webp',
    image: '/assets/digitalStores.webp',
    sub_categories: digitalStores,
    path: PATHS.APP_STORES.link,
  },
  {
    id: 2,
    slug: null,
    name: 'منصات ألعاب',
    icon: '/assets/digitalStores.webp',
    image: '/assets/digitalStores.webp',
    sub_categories: gamingPlatforms,
    path: PATHS.GAMES_CARDS.link,
  },
  {
    id: 3,
    slug: null,
    name: 'بطاقات تسوق',
    icon: '/assets/digitalStores.webp',
    image: '/assets/digitalStores.webp',
    sub_categories: shoppingCarts,
    path: PATHS.SHOP_CARDS.link,
  },
  {
    id: 5,
    slug: null,
    name: 'خدمات وإشتراكات',
    icon: '/assets/digitalStores.webp',
    image: '/assets/digitalStores.webp',
    sub_categories: servicesAndSubscriptions,
    path: PATHS.SERVICES.link,
  },
];

export const BestSellersData = [
  {
    id: 1,
    image: '/assets/best-sellers/itunes.webp',
    name: 'قسائم إنجوي قيمز',
  },
  {
    id: 2,
    image: '/assets/best-sellers/itunes.webp',
    name: 'آيتونز',
  },
  {
    id: 3,
    image: '/assets/best-sellers/sawa.webp',
    name: 'شحن سوا',
  },
  {
    id: 4,
    image: '/assets/best-sellers/yalla-ludo.webp',
    name: 'يلا لودو',
  },
];

export const SuggestedProdData = [
  {
    id: 1,
    image: '/assets/play-station.webp',
    name: 'ديسكورد',
  },
  {
    id: 2,
    image: '/assets/play-station.webp',
    name: 'أجيبه',
  },
  {
    id: 3,
    image: '/assets/play-station.webp',
    name: 'باكو (Baco)',
  },
  {
    id: 4,
    image: '/assets/play-station.webp',
    name: 'ستيم',
  },
];

export const NewlyArrivedData = [
  {
    id: 1,
    image: '/assets/play-station.webp',
    storeFlagImg: 'british-flag.png',
    name: 'بلايستيشن 40 جنيه استرليني',
    price: 189.64,
    storeName: 'المتجر البريطاني',
    ratings: '1996',
  },
  {
    id: 2,
    image: '/assets/play-station.webp',
    storeFlagImg: 'saudi-arabia-flag.png',
    name: 'سوبر مول 200 ريال',
    price: 189.64,
    storeName: 'المتجر السعودي',
    ratings: '1996',
  },
  {
    id: 3,
    image: '/assets/play-station.webp',
    storeFlagImg: 'saudi-arabia-flag.png',
    name: 'نون مينتس 500 ريال',
    price: 189.64,
    storeName: 'المتجر السعودي',
    ratings: '1996',
  },
  {
    id: 4,
    image: '/assets/play-station.webp',
    storeFlagImg: 'europe-flag.png',
    name: 'ستيم 30 يورو',
    price: 189.64,
    storeName: 'المتجر الأوروبي',
    ratings: '1996',
  },
];

export const EnjoyWinWinData = [
  {
    id: 1,
    translationKey: 'participateAndWin',
    buttonTextKey: 'MoreAboutParticipateAndWin',
    image: '/assets/coin.gif',
    href: '#',
  },
  {
    id: 2,
    translationKey: 'enjoyGames',
    buttonTextKey: 'MoreAboutEnjoyGames',
    image: '/assets/coin.gif',
    href: PATHS.STARS.link,
  },
];

export const ServiceData = [
  {
    id: 1,
    image: 'paper-plane',
    alt: 'paper-plane',
    translationKey: 'paperPlane',
  },
  {
    id: 2,
    image: 'credit-card',
    alt: 'credit-card',
    translationKey: 'creditCard',
  },
  {
    id: 3,
    image: 'phone',
    alt: 'phone',
    translationKey: 'phone',
  },
];

export const contactData = [
  {
    id: 1,
    label: 'email',
    email: 'contact@enjoygames.com',
    icon: MdEmail,
  },
  {
    id: 2,
    label: 'helpCenter',
    email: 'help.enjoygames.com',
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
      key: 'faq',
      url: PATHS.FAQ.link,
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
      key: 'termsOfUser',
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
    // {
    //   id: 3,
    //   key: 'أنضم للتجار',
    //   url: '#',
    // },
  ],
  shop_app: [
    {
      id: 1,
      src: '/assets/digitals-stores/play.jpg',
      alt: 'Google Play Logo',
      url: '#',
      ariaLabel: "googlePlayApp",
    },
    {
      id: 2,
      src: '/assets/digitals-stores/app.jpg',
      alt: 'App Store Logo',
      url: '#',
      ariaLabel: "appStoreApp",
    },
  ],
  socialMedia: [
    {
      id: 1,
      url: '#',
      icon: FaFacebook,
      ariaLabel: 'facebook',
    },
    {
      id: 2,
      url: '#',
      icon: FaTwitter,
      ariaLabel: 'twitter',
    },
    {
      id: 3,
      url: '#',
      icon: FaInstagram,
      ariaLabel: 'instagram',
    },
    {
      id: 4,
      url: '#',
      icon: FaLinkedin,
      ariaLabel: 'linkedin',
    },
  ],
};

export const menuLists = [
  {
    id: 1,
    linksItem: [
      { id: 1, key: 'stars', icon: IoArrowRedoOutline, link: PATHS.STARS.link },
      { id: 2, key: 'wallet', icon: IoWalletOutline, link: PATHS.WALLET.link },
      { id: 3, key: 'interests', icon: FaRegHeart, link: '#' },
    ],
  },
  {
    id: 2,
    linksItem: [
      { id: 1, key: 'tickets', icon: FaRegFlag, link: '#' },
      { id: 2, key: 'TalkToCustomerService', icon: MdOutlineEmail, link: '#' },
      { id: 3, key: 'faq', icon: IoMdHelpCircleOutline, link: '#' },
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
        link: PATHS.MY_PURCHASES.link,
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
  {
    section: 'rank',
    rank: {
      level: 1,
      title: 'الرتبة الحالية لحسابك',
      subtitle: 'زيادة الرتبة تعني زيادة العائد لكل عملية',
    },
  },
  {
    section: 'general',
    items: [
      // {
      //   id: 4,
      //   title: 'برنامج مكسب',
      //   link: PATHS.MAX_PROGRAM.link,
      //   icon: FaLink,
      // },
      { id: 4, title: 'دليل ستارز', link: PATHS.STARS.link, icon: FaFlag },
      {
        id: 5,
        title: 'الإهتمامات',
        link: PATHS.MY_ACCOUNT.INTERESTS.link,
        icon: FaHeart,
      },
    ],
  },
  {
    section: 'wallet',
    items: [
      {
        id: 8,
        title: 'المحفظة',
        link: PATHS.WALLET.link,
        icon: FaWallet,
        badge: '#0',
      },
      {
        id: 9,
        title: 'نقاط دليل ستارز',
        link: PATHS.STARS.link,
        icon: PiSparkleFill,
        badge: '0',
      },
    ],
  },
  {
    section: 'logout',
    items: [{ id: 10, title: 'تسجيل خروج', icon: FiLogOut }],
  },
];

export const countries = [
  { name: 'السعودية', currency: 'الريال السعودي', img: 'saudi-arabia' },
  { name: 'الإمارات', currency: 'درهم إماراتي', img: 'united-arab-emirates' },
  { name: 'الكويت', currency: 'الدينار الكويتي', img: 'kuwait' },
  { name: 'قطر', currency: 'الريال القطري', img: 'qatar' },
  { name: 'البحرين', currency: 'الدينار البحريني', img: 'bahrain' },
  { name: 'عمان', currency: 'الدينار العماني', img: 'oman' },
  { name: 'العراق', currency: 'الدينار العراقي', img: 'iraq' },
  { name: 'الأردن', currency: 'الدينار الأردني', img: 'jordan' },
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
    percentage: 0.2,
    isActive: true,
  },
  {
    id: 2,
    key: 'active',
    icon: FaCrown,
    percentage: 0.4,
    isActive: false,
  },
  {
    id: 3,
    key: 'pro',
    icon: FaRegStar,
    percentage: 0.6,
    isActive: false,
  },
  {
    id: 4,
    key: 'expert',
    icon: FiAward,
    percentage: 0.8,
    isActive: false,
  },
  {
    id: 5,
    key: 'vip',
    icon: FaDiamond,
    percentage: 1,
    isActive: false,
  },
];

export const faqData = [
  {
    id: 1,
    question: '1️⃣ ما هو إنجوي قيمز ؟',
    answer:
      'إنجوي قيمز هو رنامج نقاط الولاء الذي يمكنك من كسب النقاط مع كل عملية شراء داخل إنجوي قيمز، ثم استبدالها بـ رصيد في محفظتك أو بطاقات رقمية مثل آيتونز، يلا لودو، وغيرها.',
  },
  {
    id: 2,
    question: '2️⃣ كيف يمكنني كسب النقاط ؟',
    answer:
      'يمكنك كسب النقاط عند إتمام عمليات الشراء داخل إنجوي قيمز. كل عملية شراء تمنحك عددًا معينًا من النقاط، والتي يمكنك استبدالها لاحقًا.',
  },
  {
    id: 3,
    question: '3️⃣ كيف أستبدل النقاط ؟',
    answer: [
      'عند تجميع نقاط كافية، يمكنك استبدالها بـ:',
      'رصيد يُضاف إلى محفظتك داخل إنجوي قيمز.',
      'بطاقات رقمية متنوعة مثل آيتونز، يلا لودو، وغيرها.',
    ],
  },
  {
    id: 4,
    question: '4️⃣ هل هناك حد معين لاستخدام النقاط ؟',
    answer:
      'لا، يمكنك استبدال النقاط في أي وقت طالما لديك الرصيد الكافي، ولكن بعض البطاقات قد تتطلب حدًا أدنى معينًا من النقاط للاستبدال.',
  },
  {
    id: 5,
    question: '5️⃣ هل يمكنني تحويل نقاطي لشخص آخر ؟',
    answer:
      'حاليًا، لا يمكن تحويل النقاط بين الحسابات، ولكن يمكنك استخدامها لشراء بطاقات رقمية وإهدائها لأي شخص.',
  },
  {
    id: 6,
    question: '6️⃣ هل تنتهي صلاحية النقاط ؟ ',
    answer:
      'لا يوجد هناك تاريخ محدد لانتهاء النقاط ويمكنك استخدامها واستبدالها في أي وقت.',
  },
  {
    id: 7,
    question: '7️⃣ كيف يمكنني معرفة عدد النقاط التي أملكها ؟',
    answer:
      'يمكنك الاطلاع على رصيد نقاطك في أي وقت عبر حسابك في إنجوي قيمز، حيث ستجد سجل جميع عمليات الكسب والاستبدال.',
  },
  {
    id: 8,
    question: '8️⃣ ماذا أفعل إذا لم يصلني الرصيد أو البطاقة بعد الاستبدال ؟',
    answer:
      'إذا واجهت أي مشكلة، يمكنك التواصل مع الدعم الفني، وسنساعدك في حل المشكلة بأسرع وقت ممكن.',
  },
];

export const WalletSectionData = [
  {
    id: 1,
    link: PATHS.WALLET.link,
    title: 'wallet',
    value: '0',
    unit: '/assets/saudi_riyal.png',
    icon: Wallet,
    bgColor: 'bg-violet-600',
    textColor: 'text-white',
    isUnitTranslatable: false,
  },
  {
    id: 2,
    link: PATHS.STARS.link,
    title: 'stars',
    value: '0',
    unit: 'point',
    icon: Sparkles,
    bgColor: 'bg-orange-300',
    textColor: 'text-[#060919]',
    isUnitTranslatable: true,
  },
  // {
  //   id: 3,
  //   link: '#',
  //   title: 'maxup',
  //   value: '0',
  //   unit: '/assets/saudi_riyal.png',
  //   icon: Wallet,
  //   bgColor: 'bg-amber-50',
  //   textColor: 'text-[#060919]',
  //   isUnitTranslatable: false,
  // },
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

export const rewardsPrograms = [
  {
    id: 1,
    key: 'bonusesPrograms',
    type: 'earnings',
  },
  {
    id: 2,
    key: 'maxupProgram',
    type: 'earnings',
    amount: 0,
    currency: 'ريال',
    description: 'profiledProfits',
  },
  {
    id: 3,
    key: 'starsPoints',
    type: 'point',
    amount: 0,
    currency: 'point',
    description: 'convertiblePoints',
  },
];

export const HeroSlides: BannerSlide[] = [
  { id: 1, image: '/assets/banners/banner1.webp' },
  { id: 2, image: '/assets/banners/banner2.webp' },
  { id: 3, image: '/assets/banners/banner3.webp' },
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
  {
    id: 2,
    type: 'select',
    name: 'ticketType',
    placeholder: 'حدد نوع التذكرة',
    options: [
      {
        id: 1,
        label: 'مشكلة بأحد الطلبات',
        value: 'order-issue',
      },
      {
        id: 2,
        label: 'مشكلة بالدفع والتحويل',
        value: 'payment-issue',
      },
      {
        id: 3,
        label: 'اقتراح او شيء اخر',
        value: 'suggestion-or-other',
      },
    ],
  },
  {
    id: 3,
    type: 'textarea',
    name: 'details',
    placeholder: 'يرجي كتابة وصف لمساعتدك بشكل أدق',
  },
];

export const inputsViaEntry: InputItem[] = [
  {
    id: 1,
    inputName: 'quantity',
    labelKey: 'quantity',
    type: 'select',
    options: [
      { id: 1, value: 'phone', labelKey: 'phone' },
      { id: 2, value: 'email', labelKey: 'email' },
      { id: 3, value: 'twitter', labelKey: 'twitter' },
      { id: 4, value: 'facebook', labelKey: 'facebook' },
    ],
  },
  {
    id: 2,
    inputName: 'phone_number',
    labelKey: 'phone',
    type: 'text',
  },
  {
    id: 3,
    inputName: 'password',
    labelKey: 'password',
    type: 'password',
  },
  {
    id: 4,
    inputName: 'id_number',
    labelKey: 'idNumber',
    type: 'text',
  },
  {
    id: 5,
    inputName: 'checkbox',
    labelKey: 'unlockAccount',
    type: 'checkbox',
    placeholder: 'تم الإلغاء',
  },
];

export const stats = [
  {
    id: 1,
    icon: Wallet,
    titleKey: 'balance',
    currency: '/assets/saudi_riyal.png',
    account: 0,
  },
  {
    id: 2,
    icon: FaStar,
    titleKey: 'currentLevel',
    account: 0,
  },
  {
    id: 3,
    icon: FaHeart,
    titleKey: 'interests',
    href: PATHS.MY_ACCOUNT.INTERESTS.link,
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
  { id: 3, labelKey: 'inProgress' },
  { id: 4, labelKey: 'cancelled' },
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
];
