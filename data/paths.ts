import { FiUser } from 'react-icons/fi';
import { IoHomeOutline, IoSearch } from 'react-icons/io5';
import { MdMoreHoriz, MdOutlineAssignment } from 'react-icons/md';

export const PATHS = {
  HOME: { name: 'الرئيسية', link: '/' },
  STORE: { name: 'المتجر', link: '/store' },
  STARS: { name: 'دليل ستارز', link: '/stars' },
  STARS_GIFTS: '/stars-gifts',
  WALLET: { name: 'محفظتي', link: '/wallet' },
  MY_PURCHASES: {
    ROOT: { name: 'طلباتي', link: '/my-purchases' },
    ITEM: (id: string | number) => ({
      name: `تفاصيل الطلب ${id}`,
      link: `/my-purchases/${id}`,
    }),
  },
  MY_CART: { name: 'سلتي', link: '/my-cart' },

  MY_ACCOUNT: {
    ROOT: { name: 'حسابي', link: '/my-account' },
    INTERESTS: { name: 'الإهتمامات', link: '/my-account/interests' },
  },

  TICKETS: {
    ROOT: { name: 'تذاكر الدعم الفني', link: '/tickets' },
    CREATE: { name: 'إضافة تذكرة جديدة', link: '/tickets/create' },
    ITEM: (id: string | number) => ({
      name: `تفاصيل التذكرة ${id}`,
      link: `/tickets/${id}`,
    }),
  },
  TERMS_OF_USER: { name: 'سياسة الإستخدام', link: '/terms-of-use' },
  REFUND_POLICY: { name: 'سياسة الإسترجاع', link: '/refund-policy' },
  PRIVACY_POLICY: { name: 'سياسة الخصوصية', link: '/privacy-policy' },
  ABOUT: { name: 'من نحن', link: '/about' },
  FAQS: {
    name: 'الأسئلة الشائعة',
    link: '/faqs',
  },
  DASHBOARD: {
    HOME: {
      ROOT: '/dashboard',
    },
    CATEGORIES: '/dashboard/categories',
    SUB_CATEGORIES: '/dashboard/sub-categories',
    PRODUCTS: '/dashboard/products',
    COUPONS: '/dashboard/coupons',
    CODES: '/dashboard/codes',
    SLIDERS: '/dashboard/sliders',
    FAQS: '/dashboard/faqs',
    TICKETS: '/dashboard/tickets',
    RATINGS: '/dashboard/ratings',
    ORDERS: {
      ROOT: '/dashboard/orders',
      ITEM: '/dashboard/orders/:id/products',
    },
    USERS: '/dashboard/users',
    PAYMENT_GATEWAYS: '/dashboard/payment-gateways',
    REPORTS: '/dashboard/reports',
    SETTINGS: '/dashboard/settings',
  },
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  OTP: '/auth/otp',
  RESET_PASS: '/reset-password',
  FORGET_PASS: '/forget-password',
  // MAX_PROGRAM: { name: 'مكسب', link: '/maxup-program' },
};

export const navBarLinks = [
  { id: 1, icon: IoHomeOutline, titleKey: 'home', link: PATHS.HOME.link },
  { id: 2, icon: IoSearch, titleKey: 'store', link: PATHS.STORE.link },
  {
    id: 3,
    icon: MdOutlineAssignment,
    titleKey: 'my-purchases',
    link: PATHS.MY_PURCHASES.ROOT.link,
  },
  {
    id: 4,
    icon: FiUser,
    titleKey: 'RegisterNow',
    link: PATHS.LOGIN,
    hideWhenAuth: true,
  },
  { id: 5, icon: MdMoreHoriz, titleKey: 'more', onClick: true },
];
