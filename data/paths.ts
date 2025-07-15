import { FiUser } from 'react-icons/fi';
import { IoHomeOutline, IoSearch } from 'react-icons/io5';
import { MdOutlineAssignment } from 'react-icons/md';

export const PATHS = {
  HOME: { name: 'الرئيسية', link: '/' },
  APP_STORES: { name: 'بطاقات المتاجر الرقمية', link: '/category/app-stores' },
  GAMES_CARDS: { name: 'بطاقات ألعاب', link: '/category/games-cards' },
  SERVICES: { name: 'بطاقات الخدمات والإشتراكات', link: '/category/services' },
  SHOP_CARDS: { name: 'بطاقات تسوّق متنوعة', link: '/category/shop-cards' },
  LOGIN: 'login',
  STORE: { name: 'المتجر', link: '/store' },
  STARS: { name: 'دليل ستارز', link: '/stars' },
  OTP: '/otp',
  // MAX_PROGRAM: { name: 'مكسب', link: '/maxup-program' },
  STARS_GIFTS: '/stars-gifts',
  WALLET: { name: 'محفظتي', link: '/wallet' },
  MY_PURCHASES: { name: 'طلباتي', link: '/my-purchases' },
  MY_CART: { name: 'سلتي', link: '/my-cart' },
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
];
