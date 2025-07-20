import { FiUser } from 'react-icons/fi';
import { IoHomeOutline, IoSearch } from 'react-icons/io5';
import { MdMoreHoriz, MdOutlineAssignment } from 'react-icons/md';

export const PATHS = {
  HOME: { name: 'الرئيسية', link: '/' },
  APP_STORES: {
    name: 'بطاقات المتاجر الرقمية',
    link: '/categories/digital-stores',
  },
  GAMES_CARDS: { name: 'بطاقات ألعاب', link: '/categories/games-platforms' },
  SERVICES: {
    name: 'بطاقات الخدمات والإشتراكات',
    link: '/categories/services',
  },
  SHOP_CARDS: { name: 'بطاقات تسوّق متنوعة', link: '/categories/shop-cards' },
  STORE: { name: 'المتجر', link: '/store' },
  STARS: { name: 'دليل ستارز', link: '/stars' },
  // MAX_PROGRAM: { name: 'مكسب', link: '/maxup-program' },
  STARS_GIFTS: '/stars-gifts',
  WALLET: { name: 'محفظتي', link: '/wallet' },
  MY_PURCHASES: { name: 'طلباتي', link: '/my-purchases' },
  MY_CART: { name: 'سلتي', link: '/my-cart' },

  MY_ACCOUNT: {
    ROOT: { name: 'حسابي', link: '/my-account' },
    INTERESTS: { name: 'الإهتمامات', link: '/my-account/interests' },
  },

  TICKETS: {
    ROOT: { name: 'تذاكر الدعم الفني', link: '/tickets' },
    CREATE: { name: 'إضافة تذكرة جديدة', link: '/tickets/create' },
  },
  TERMS_OF_USER: { name: 'سياسة الإستخدام', link: '/terms-of-use' },
  REFUND_POLICY: { name: 'سياسة الإسترجاع', link: '/refund-policy' },
  PRIVACY_POLICY: { name: 'سياسة الخصوصية', link: '/privacy-policy' },
  ABOUT: { name: 'من نحن', link: '/about' },
  FAQ: {
    name: 'الأسئلة الشائعة',
    link: '/faq',
  },
  LOGIN: 'login',
  OTP: '/otp',
};

export const navBarLinks = [
  { id: 1, icon: IoHomeOutline, title: 'الرئيسية', link: PATHS.HOME.link },
  { id: 2, icon: IoSearch, title: 'المتجر', link: PATHS.STORE.link },
  {
    id: 3,
    icon: MdOutlineAssignment,
    title: 'طلباتي',
    link: PATHS.MY_PURCHASES.link,
  },
  { id: 4, icon: FiUser, title: 'سجّل الآن', link: PATHS.LOGIN },
  { id: 5, icon: MdMoreHoriz, title: 'المزيد', onClick: true },
];
