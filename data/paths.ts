import { FiUser } from 'react-icons/fi';
import { IoHomeOutline, IoSearch } from 'react-icons/io5';
import { MdOutlineAssignment } from 'react-icons/md';

export const PATHS = {
  HOME: { name: 'الرئيسية', link: '/' },
  APP_STORES: { name: 'بطاقات المتاجر الرقمية', link: '/category/app-stores' },
  GAMES_CARDS: { name: 'بطاقات ألعاب', link: '/category/games-cards' },
  RECHARGE_CARDS: {
    name: 'بطاقات الإتصال والبيانات',
    link: '/category/recharge-cards',
  },
  RESTAURANT: { name: 'بطاقات المطاعم', link: '/category/restaurants' },
  SERVICES: { name: 'بطاقات الخدمات والإشتراكات', link: '/category/services' },
  SHOP_CARDS: { name: 'بطاقات تسوّق متنوعة', link: '/category/shop-cards' },
  LOGIN: 'login',
  SIGN_UP: '/signup',
  STORE: '/store',
  STARS: { name: 'دليل ستارز', link: '/stars' },
};

export const navBarLinks = [
  { id: 1, icon: IoHomeOutline, title: 'الرئيسية', link: PATHS.HOME.link },
  { id: 2, icon: IoSearch, title: 'المتجر', link: PATHS.STORE },
  { id: 3, icon: MdOutlineAssignment, title: 'طلباتي', link: '#' },
  { id: 4, icon: FiUser, title: 'سجّل الآن', link: PATHS.LOGIN },
];
