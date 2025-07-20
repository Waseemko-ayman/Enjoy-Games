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
  FaTwitter,
  FaUser,
  FaWallet,
} from 'react-icons/fa6';
import {
  IoArrowRedoOutline,
  IoGameControllerOutline,
  IoWalletOutline,
} from 'react-icons/io5';
import {
  MdMoreHoriz,
  MdOutlineAlternateEmail,
  MdOutlineEmail,
} from 'react-icons/md';
import {
  PiShoppingCartLight,
  PiSparkleFill,
  PiSquaresFourLight,
} from 'react-icons/pi';
import { PATHS } from './paths';
import { IoMdHelpCircleOutline, IoMdPricetag } from 'react-icons/io';
import { FiAward, FiLogOut, FiTrendingUp } from 'react-icons/fi';
import { Sparkles, Wallet } from 'lucide-react';
import { BannerSlide, RewardTier } from '@/interfaces';

export const shiddats = [
  {
    id: 1,
    title: 'بطاقة شحن جواكر 70,000 توكن',
    src: '/assets/play-station.webp',
    price: 77.36,
    newPrice: 88.36,
    storeFlagImg: 'british-flag.png',
    storeName: 'المتجر البريطاني',
    ratings: '1996',
  },
  {
    id: 2,
    title: 'بطاقة شحن جواكر 70,000 توكن',
    src: '/assets/play-station.webp',
    price: 77.36,
    newPrice: 88.36,
    storeFlagImg: 'british-flag.png',
    storeName: 'المتجر البريطاني',
    ratings: '1996',
  },
  {
    id: 3,
    title: 'بطاقة شحن جواكر 70,000 توكن',
    src: '/assets/play-station.webp',
    price: 77.36,
    newPrice: 88.36,
    storeFlagImg: 'british-flag.png',
    storeName: 'المتجر البريطاني',
    ratings: '1996',
  },
  {
    id: 4,
    title: 'بطاقة شحن جواكر 70,000 توكن',
    src: '/assets/play-station.webp',
    price: 77.36,
    newPrice: 88.36,
    storeFlagImg: 'british-flag.png',
    storeName: 'المتجر البريطاني',
    ratings: '1996',
  },
  {
    id: 5,
    title: 'بطاقة شحن جواكر 70,000 توكن',
    src: '/assets/play-station.webp',
    price: 77.36,
    newPrice: 88.36,
    storeFlagImg: 'british-flag.png',
    storeName: 'المتجر البريطاني',
    ratings: '1996',
  },
  {
    id: 6,
    title: 'بطاقة شحن جواكر 70,000 توكن',
    src: '/assets/play-station.webp',
    price: 77.36,
    newPrice: 88.36,
    storeFlagImg: 'british-flag.png',
    storeName: 'المتجر البريطاني',
    ratings: '1996',
  },
];

export const digitalStores = [
  {
    id: 'itunes',
    label: 'آيتونز',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    requiresAccount: true,
    shiddatData: shiddats,
  },
  {
    id: 'google-play',
    label: 'قوقل بلاي',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    requiresAccount: false,
    shiddatData: shiddats,
  },
  {
    id: 'huawei',
    label: 'هواوي',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    requiresAccount: true,
    shiddatData: shiddats,
  },
];

export const gamingPlatforms = [
  {
    id: 'playstation',
    label: 'بلاي ستيشن',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
  {
    id: 'xbox',
    label: 'إكس بوكس',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
  {
    id: 'steam',
    label: 'ستيم',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
  {
    id: 'pubg',
    label: 'بيبجي',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
  {
    id: 'jawaker',
    label: 'جواكر',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
  {
    id: 'yalla-ludo',
    label: 'يلا لودو',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
];

export const shoppingCarts = [
  {
    id: 'amazon',
    label: 'أمازون',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
  {
    id: 'ebay',
    label: 'إيباي',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
  {
    id: 'razer-gold',
    label: 'ريزر جولد',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
  {
    id: 'paysafecard',
    label: 'باي سيف كارد',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
  {
    id: 'noon',
    label: 'نون',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
  {
    id: 'home-center',
    label: 'هوم سنتر',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
];

export const servicesAndSubscriptions = [
  {
    id: 'hungerstation',
    label: 'هنقرستيشن',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
  {
    id: 'nana',
    label: 'نعناع',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
  {
    id: 'mcafee',
    label: 'مكافي',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
  {
    id: 'noon-mintes',
    label: 'نون مينتس',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
  {
    id: 'marsool',
    label: 'مرسول',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
  {
    id: 'discord',
    label: 'ديسكورد',
    Icon: '/assets/play-station.webp',
    banner: '/assets/play-station.webp',
    shiddatData: shiddats,
  },
];

// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------

export const subMenuItems = [
  {
    id: 1,
    label: 'متاجر رقمية',
    Icon: PiSquaresFourLight,
    submenu: digitalStores,
    src: '/assets/digitalStores.webp',
    path: PATHS.APP_STORES.link,
  },
  {
    id: 2,
    label: 'منصات ألعاب',
    Icon: IoGameControllerOutline,
    submenu: gamingPlatforms,
    src: '/assets/gamingPlatforms.webp',
    path: PATHS.GAMES_CARDS.link,
  },
  {
    id: 3,
    label: 'بطاقات تسوق',
    Icon: PiShoppingCartLight,
    submenu: shoppingCarts,
    src: '/assets/shoppingCarts.webp',
    path: PATHS.SHOP_CARDS.link,
  },
  {
    id: 5,
    label: 'خدمات وإشتراكات',
    Icon: MdMoreHoriz,
    submenu: servicesAndSubscriptions,
    src: '/assets/servicesAndSubscriptions.webp',
    path: PATHS.SERVICES.link,
  },
];

export const BestSellersData = [
  {
    id: 1,
    src: '/assets/best-sellers/itunes.webp',
    title: 'قسائم إنجوي قيمز',
  },
  {
    id: 2,
    src: '/assets/best-sellers/itunes.webp',
    title: 'آيتونز',
  },
  {
    id: 3,
    src: '/assets/best-sellers/sawa.webp',
    title: 'شحن سوا',
  },
  {
    id: 4,
    src: '/assets/best-sellers/yalla-ludo.webp',
    title: 'يلا لودو',
  },
];

export const SuggestedProdData = [
  {
    id: 1,
    src: '/assets/play-station.webp',
    title: 'ديسكورد',
  },
  {
    id: 2,
    src: '/assets/play-station.webp',
    title: 'أجيبه',
  },
  {
    id: 3,
    src: '/assets/play-station.webp',
    title: 'باكو (Baco)',
  },
  {
    id: 4,
    src: '/assets/play-station.webp',
    title: 'ستيم',
  },
];

export const NewlyArrivedData = [
  {
    id: 1,
    src: '/assets/play-station.webp',
    storeFlagImg: 'british-flag.png',
    title: 'بلايستيشن 40 جنيه استرليني',
    price: 189.64,
    storeName: 'المتجر البريطاني',
    ratings: '1996',
  },
  {
    id: 2,
    src: '/assets/play-station.webp',
    storeFlagImg: 'saudi-arabia-flag.png',
    title: 'سوبر مول 200 ريال',
    price: 189.64,
    storeName: 'المتجر السعودي',
    ratings: '1996',
  },
  {
    id: 3,
    src: '/assets/play-station.webp',
    storeFlagImg: 'saudi-arabia-flag.png',
    title: 'نون مينتس 500 ريال',
    price: 189.64,
    storeName: 'المتجر السعودي',
    ratings: '1996',
  },
  {
    id: 4,
    src: '/assets/play-station.webp',
    storeFlagImg: 'europe-flag.png',
    title: 'ستيم 30 يورو',
    price: 189.64,
    storeName: 'المتجر الأوروبي',
    ratings: '1996',
  },
];

export const EnjoyWinWinData = [
  {
    id: 1,
    title: 'شارك وأربح',
    description:
      'أنت أحد شركاؤنا, حيث يمكنك يمكنك مشاركة رابط الدعوة وستربح من كل طلب عن طريقك',
    image: '/assets/coin.gif',
    buttonText: 'المزيد عن شارك وإربح',
  },
  {
    id: 2,
    title: 'إنجوي قيمز',
    description:
      'عند الشراء تحصل على نقاط إنجوي قيمز يمكنك إستبدالها بما يناسبك من المكافآت',
    image: '/assets/coin.gif',
    buttonText: 'المزيد عن إنجوي قيمز',
  },
];

export const ServiceData = [
  {
    id: 1,
    image: 'paper-plane',
    alt: 'paper-plane',
    title: 'أستلم بطاقتك بشكل فوري',
    description:
      'بمجرد شرائك بطاقة من موقع إنجوي قيمز، ستصلك بشكل تلقائي على البريد الإلكتروني، وبشكل فوري',
  },
  {
    id: 2,
    image: 'credit-card',
    alt: 'credit-card',
    title: 'طرق دفع آمنة ومتنوعة',
    description:
      'إنجوي قيمز يتيح طرق دفع متنوعة ، وآمنة وتناسب كافة احتياجاتكم ورغباتكم، دون إنتظار أو تعقيدات',
  },
  {
    id: 3,
    image: 'phone',
    alt: 'phone',
    title: 'تطبيقات تعمل بكفاءة عالية',
    description:
      'يمكنك تحميل تطبيقات إنجوي قيمز على الايفون، و الأندرويد والإستمتاع بتجربة مميزة، وفريدة في تسوق بطاقاتك',
  },
];

export const FOOTER_LINKS_DATA = {
  LearnMore: [
    {
      id: 1,
      text: 'من نحن',
      url: PATHS.ABOUT.link,
    },
    {
      id: 2,
      text: 'الأسئلة الشائعة',
      url: PATHS.FAQ.link,
    },
    {
      id: 3,
      text: 'سياسة الخصوصية',
      url: PATHS.PRIVACY_POLICY.link,
    },
    {
      id: 4,
      text: 'سياسة الإسترجاع',
      url: PATHS.REFUND_POLICY.link,
    },
    {
      id: 5,
      text: 'سياسة الخدمة',
      url: PATHS.TERMS_OF_USER.link,
    },
  ],
  BusinessAndSolutions: [
    {
      id: 1,
      text: 'الأخبار',
      url: '#',
    },
    {
      id: 2,
      text: 'مركز المساعدة',
      url: '#',
    },
    // {
    //   id: 3,
    //   text: 'أنضم للتجار',
    //   url: '#',
    // },
  ],
  shop_app: [
    {
      id: 1,
      src: '/assets/digitals-stores/play.jpg',
      alt: 'google play',
      url: '#',
    },
    {
      id: 2,
      src: '/assets/digitals-stores/app.jpg',
      alt: 'app store',
      url: '#',
    },
  ],
  socialMedia: [
    {
      id: 1,
      url: '#',
      icon: FaFacebook,
    },
    {
      id: 2,
      url: '#',
      icon: FaTwitter,
    },
    {
      id: 3,
      url: '#',
      icon: FaInstagram,
    },
    {
      id: 4,
      url: '#',
      icon: FaLinkedin,
    },
  ],
};

export const menuLists = [
  {
    id: 1,
    linksItem: [
      {
        id: 1,
        title: 'دليل ستارز',
        icon: IoArrowRedoOutline,
        link: PATHS.STARS.link,
      },
      {
        id: 2,
        title: 'المحفظة',
        link: PATHS.WALLET.link,
        icon: IoWalletOutline,
      },
      {
        id: 3,
        title: 'الإهتمامات',
        icon: FaRegHeart,
        link: '#',
      },
    ],
  },
  {
    id: 2,
    linksItem: [
      {
        id: 1,
        title: 'تذاكر الدعم الفني',
        link: '#',
        icon: FaRegFlag,
      },
      {
        id: 2,
        title: 'التحدث مع خدمة العملاء',
        icon: MdOutlineEmail,
        link: '#',
      },
      {
        id: 3,
        title: 'الأسئلة الشائعة',
        icon: IoMdHelpCircleOutline,
        link: '#',
      },
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
    items: [{ id: 10, title: 'تسجيل خروج', link: '#', icon: FiLogOut }],
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
    title: 'اجمع النقاط',
    description: 'احصل على نقاط مع كل عملية شراء',
    bgColor: 'bg-enjoy-primary-deep',
    textColor: 'text-white',
    icon: FiTrendingUp,
  },
  {
    id: 2,
    title: 'ضاعف مكافآتك ',
    description: 'ارتقِ بالمستويات للحصول على مزايا أكثر.',
    bgColor: 'bg-enjoy-secondary-soft',
    icon: FaGift,
  },
  {
    id: 3,
    title: 'راقب تقدمك ',
    description: 'تابع نقاطك وتاريخ معاملاتك في حسابك.',
    bgColor: 'bg-enjoy-glass',
    icon: FaChartBar,
  },
  {
    id: 4,
    title: 'استبدل النقاط',
    description: 'استبدلها ببطاقات رقمية أو حوّلها إلى نقاط نقدي',
    bgColor: 'bg-enjoy-primary-soft',
    icon: FaSackDollar,
  },
];

export const tiers = [
  {
    id: 1,
    name: 'دليل جونيور',
    icon: FaRegGem,
    percentage: 0.2,
    isActive: true,
  },
  {
    id: 2,
    name: 'دليل نشط',
    icon: FaCrown,
    percentage: 0.4,
    isActive: false,
  },
  {
    id: 3,
    name: 'دليل محترف',
    icon: FaRegStar,
    percentage: 0.6,
    isActive: false,
  },
  {
    id: 4,
    name: 'دليل خبير',
    icon: FiAward,
    percentage: 0.8,
    isActive: false,
  },
  {
    id: 5,
    name: 'دليل مميز',
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
    title: 'محفظتي',
    value: '0',
    unit: 'saudi_riyal',
    icon: Wallet,
    bgColor: 'bg-violet-600',
    textColor: 'text-white',
  },
  {
    id: 2,
    link: PATHS.STARS.link,
    title: 'دليل ستارز',
    value: '0',
    unit: 'نقطة',
    icon: Sparkles,
    bgColor: 'bg-orange-300',
    textColor: 'text-[#060919]',
  },
  {
    id: 3,
    link: '#',
    title: 'دليل مكسب',
    value: '0',
    unit: 'saudi_riyal',
    icon: Wallet,
    bgColor: 'bg-amber-50',
    textColor: 'text-[#060919]',
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
  { id: 1, name: 'البرونزية', percentage: 0.3, isActive: true },
  { id: 2, name: 'الفضية', percentage: 0.4, isActive: false },
  { id: 3, name: 'الذهبية', percentage: 0.5, isActive: false },
  { id: 4, name: 'البلاتينيوم', percentage: 0.6, isActive: false },
  { id: 5, name: 'VIP', percentage: 0.7, isActive: false },
];

export const rewardsPrograms = [
  {
    id: 1,
    title: 'برامج المكافآت',
    type: 'earnings',
  },
  // {
  //   id: 2,
  //   title: 'برنامج مكسب',
  //   type: 'earnings',
  //   amount: 0,
  //   currency: 'ريال',
  //   description: 'أرباحك القابلة للسحب',
  // },
  {
    id: 2,
    title: 'نقاط دليل ستارز',
    type: 'points',
    amount: 0,
    currency: 'نقطة',
    description: 'نقاطك القابلة للتحويل',
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
    name: 'username',
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

export const inputsViaEntry = [
  {
    id: 1,
    inputName: 'quantity',
    label: 'طريقة الدخول',
    type: 'select',
    optios: [
      { id: 1, value: 'phone', label: 'رقم الهاتف' },
      { id: 2, value: 'email', label: 'البريد' },
      { id: 3, value: 'twitter', label: 'تويتر' },
      { id: 4, value: 'facebook', label: 'فيس بوك' },
    ],
  },
  {
    id: 2,
    inputName: 'phone_number',
    label: 'رقم الجوال أو الإيميل',
    type: 'text',
  },
  {
    id: 3,
    inputName: 'password',
    label: 'كلمة المرور',
    type: 'password',
  },
  {
    id: 4,
    inputName: 'id_number',
    label: 'رقم الايدي',
    type: 'text',
  },
  {
    id: 4,
    inputName: 'checkbox',
    label: 'قد قمت بالغاء القفل من الحساب',
    type: 'checkbox',
    placeholder: 'تم الإلغاء',
  },
];
