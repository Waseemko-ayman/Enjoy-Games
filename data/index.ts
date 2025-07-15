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
import { MdMoreHoriz, MdOutlineEmail } from 'react-icons/md';
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

export const digitalStores = [
  {
    id: 'itunes',
    label: 'آيتونز',
    Icon: 'digitals-stores/itunes.png',
    banner: 'digitals-stores/apple-store-banner.webp',
    requiresAccount: true,
  },
  {
    id: 'google-play',
    label: 'قوقل بلاي',
    Icon: 'digitals-stores/google-play-logo.png',
    banner: 'digitals-stores/google-play-banner.webp',
    requiresAccount: false,
  },
  {
    id: 'huawei',
    label: 'هواوي',
    Icon: 'digitals-stores/huawei-logo.png',
    banner: 'digitals-stores/huawei-banner.webp',
    requiresAccount: true,
  },
];

export const gamingPlatforms = [
  {
    id: 'playstation',
    label: 'بلاي ستيشن',
    Icon: 'games-logos/playstation-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    id: 'xbox',
    label: 'إكس بوكس',
    Icon: 'games-logos/xbox-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    id: 'steam',
    label: 'ستيم',
    Icon: 'games-logos/steam-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    id: 'pubg',
    label: 'بيبجي',
    Icon: 'games-logos/pubg-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    id: 'jawaker',
    label: 'جواكر',
    Icon: 'games-logos/jawaker-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    id: 'yalla-ludo',
    label: 'يلا لودو',
    Icon: 'games-logos/yalla-ludo-logo.jpg',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
];

export const shoppingCarts = [
  {
    id: 'amazon',
    label: 'أمازون',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    id: 'ebay',
    label: 'إيباي',
    Icon: 'shopping-carts/shopping-carts-logos/ebay-logo.png',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    id: 'razer-gold',
    label: 'ريزر جولد',
    Icon: 'shopping-carts/shopping-carts-logos/razer-gold-logo.png',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    id: 'paysafecard',
    label: 'باي سيف كارد',
    Icon: 'shopping-carts/shopping-carts-logos/paysafecard-logo.png',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    id: 'noon',
    label: 'نون',
    Icon: 'shopping-carts/shopping-carts-logos/noon-logo.jpeg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    id: 'home-center',
    label: 'هوم سنتر',
    Icon: 'shopping-carts/shopping-carts-logos/home-center-logo.jpeg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
];

export const servicesAndSubscriptions = [
  {
    id: 'hungerstation',
    label: 'هنقرستيشن',
    Icon: 'services-subscriptions/hunger-station.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    id: 'nana',
    label: 'نعناع',
    Icon: 'services-subscriptions/nana-logo.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    id: 'mcafee',
    label: 'مكافي',
    Icon: 'services-subscriptions/mcafee-logo.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    id: 'noon-mintes',
    label: 'نون مينتس',
    Icon: 'services-subscriptions/noon-mintes-logo.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    id: 'marsool',
    label: 'مرسول',
    Icon: 'services-subscriptions/marsool-logo.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    id: 'discord',
    label: 'ديسكورد',
    Icon: 'services-subscriptions/discord-logo.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
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
    src: 'itunes',
    title: 'قسائم إنجوي قيمز',
  },
  {
    id: 2,
    src: 'itunes',
    title: 'آيتونز',
  },
  {
    id: 3,
    src: 'sawa',
    title: 'شحن سوا',
  },
  {
    id: 4,
    src: 'yalla-ludo',
    title: 'يلا لودو',
  },
];

export const SuggestedProdData = [
  {
    id: 1,
    src: 'discord',
    title: 'ديسكورد',
  },
  {
    id: 2,
    src: 'discord',
    title: 'أجيبه',
  },
  {
    id: 3,
    src: 'discord',
    title: 'باكو (Baco)',
  },
  {
    id: 4,
    src: 'discord',
    title: 'ستيم',
  },
];

export const NewlyArrivedData = [
  {
    id: 1,
    src: 'play-station',
    storeFlagImgSrc: 'british-flag',
    title: 'بلايستيشن 40 جنيه استرليني',
    price: 189.64,
    storeName: 'المتجر البريطاني',
    ratings: '1996',
  },
  {
    id: 2,
    src: 'play-station',
    storeFlagImgSrc: 'saudi-arabia-flag',
    title: 'سوبر مول 200 ريال',
    price: 189.64,
    storeName: 'المتجر السعودي',
    ratings: '1996',
  },
  {
    id: 3,
    src: 'play-station',
    storeFlagImgSrc: 'saudi-arabia-flag',
    title: 'نون مينتس 500 ريال',
    price: 189.64,
    storeName: 'المتجر السعودي',
    ratings: '1996',
  },
  {
    id: 4,
    src: 'play-station',
    storeFlagImgSrc: 'europe-flag',
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
  followUs: [
    {
      id: 1,
      text: 'من نحن',
      url: 'https://github.com/Waseemko-ayman',
    },
    {
      id: 2,
      text: 'الأسئلة الشائعة',
      url: 'https://twitter.com/waseemabdalhady',
    },
    {
      id: 3,
      text: 'سياسة الخصوصية',
      url: 'https://www.linkedin.com/in/waseem-abd-elhadi-1b293624b/',
    },
    {
      id: 4,
      text: 'سياسة الإسترجاع',
      url: 'https://www.instagram.com/waseem.abdalhady/',
    },
    {
      id: 5,
      text: 'سياسة الخدمة',
      url: 'https://t.me/waseem_abdalhady',
    },
  ],
  works: [
    {
      id: 1,
      text: 'أنضم للتجار',
      url: '#',
    },
  ],
  works2: [
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
      { id: 1, title: 'حسابي', link: '#', icon: FaUser },
      {
        id: 2,
        title: 'طلباتي',
        link: PATHS.MY_PURCHASES.link,
        icon: IoMdPricetag,
      },
      {
        id: 3,
        title: 'تذاكر الدعم الفني',
        link: '#',
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
      { id: 5, title: 'الإهتمامات', link: '#', icon: FaHeart },
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
        link: '#',
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
