import { FaApple, FaGamepad, FaGooglePlay, FaSimCard } from 'react-icons/fa6';
import { IoGameControllerOutline } from 'react-icons/io5';
import { MdApps, MdMoreHoriz, MdRestaurant, MdSignalCellularAlt } from 'react-icons/md';
import { PiShoppingCartLight, PiSquaresFourLight } from 'react-icons/pi';

const digitalStores = [
  { label: 'آيتونز', Icon: FaApple },
  { label: 'قوقل بلاي', Icon: FaGooglePlay },
  { label: 'هواوي', Icon: MdApps },
];

const gamingPlatforms = [
  { label: 'بلاي ستيشن', Icon: FaGamepad },
  { label: 'إكس بوكس', Icon: FaGamepad },
  { label: 'ستيم', Icon: FaGamepad },
  { label: 'بيبجي', Icon: FaGamepad },
  { label: 'جواكر', Icon: FaGamepad },
  { label: 'يلا لودو', Icon: FaGamepad },
  { label: 'روبلوكس', Icon: FaGamepad },
  { label: 'فري فاير', Icon: FaGamepad },
  { label: 'موبايل ليجندز', Icon: FaGamepad },
  { label: 'فالورانت', Icon: FaGamepad },
  { label: 'دومينو كافيه', Icon: FaGamepad },
  { label: 'لودو كلوب', Icon: FaGamepad },
  { label: 'تينسنت', Icon: FaGamepad },
  { label: 'رن سكيب', Icon: FaGamepad },
  { label: 'جراند ثفت أوتو', Icon: FaGamepad },
  { label: 'كـاروم جـولد', Icon: FaGamepad },
  { label: 'نادا كاوفر موبايل', Icon: FaGamepad },
  { label: 'NBA 2K24', Icon: FaGamepad },
  { label: 'R2 Games', Icon: FaGamepad },
  { label: 'باراميـس لودو', Icon: FaGamepad },
  { label: 'Madden NFL أيه 25', Icon: FaGamepad },
  { label: 'نينتندو', Icon: FaGamepad },
  { label: 'نداء الحرب', Icon: FaGamepad },
  { label: 'فورتنايت', Icon: FaGamepad },
  { label: 'آي آي إف سي 25', Icon: FaGamepad },
  { label: 'كملنا', Icon: FaGamepad },
  { label: 'ليج أوف ليجندز', Icon: FaGamepad },
  { label: 'EA Play', Icon: FaGamepad },
  { label: 'جينشين إمباكت', Icon: FaGamepad },
  { label: 'Riot Access', Icon: FaGamepad },
  { label: 'تين باي جولد', Icon: FaGamepad },
  { label: 'أبيكس ليجندز', Icon: FaGamepad },
  { label: 'كلش أوف كلانس', Icon: FaGamepad },
  { label: 'أنداون', Icon: FaGamepad },
  { label: 'آوفر أوف كينجز', Icon: FaGamepad },
  { label: 'أرينا بريكوت', Icon: FaGamepad },
  { label: 'PUBG NewState', Icon: FaGamepad },
  { label: 'سي أوف ثيفز', Icon: FaGamepad },
  { label: 'كول أوف ديوتي', Icon: FaGamepad },
  { label: 'ماين كرافت', Icon: FaGamepad },
  { label: 'آي آي إف سي 24', Icon: FaGamepad },
  { label: 'فـاينل فانتسي', Icon: FaGamepad },
  { label: 'كـلشـي كـرافـي سـاغـا', Icon: FaGamepad },
];

const contactAndData = [
  { label: 'شحن سوا', Icon: FaSimCard },
  { label: 'شحن موبايلي', Icon: FaSimCard },
  { label: 'شحن ليبارا', Icon: FaSimCard },
  { label: 'فيرجن موبايل', Icon: FaSimCard },
  { label: 'كويك نت', Icon: FaSimCard },
  { label: 'فرندي موبايل', Icon: FaSimCard },
  { label: 'فرندي نت', Icon: FaSimCard },
  { label: 'زين نت', Icon: FaSimCard },
  { label: 'زين فليكس', Icon: FaSimCard },
  { label: 'زين شباب', Icon: FaSimCard },
  { label: 'شحن زين', Icon: FaSimCard },
  { label: 'موبايلي نت', Icon: FaSimCard },
  { label: 'باقات سوا', Icon: FaSimCard },
  { label: 'سلام', Icon: FaSimCard },
  { label: 'ليبارا نت', Icon: FaSimCard },
  { label: 'ريد بل داتا', Icon: FaSimCard },
  { label: 'إيـوا', Icon: FaSimCard },
];

const shoppingCarts = [
  { label: 'خدمات', Icon: MdMoreHoriz },
  { label: 'اشتراكات', Icon: MdMoreHoriz },
];

const servicesAndSubscriptions = [
  { label: 'خدمات', Icon: MdMoreHoriz },
  { label: 'اشتراكات', Icon: MdMoreHoriz },
];

const restaurants = [
  { label: 'وجبات سريعة', Icon: MdRestaurant },
  { label: 'مطاعم فاخرة', Icon: MdRestaurant },
];

export const subMenuItems = [
  {
    id: 1,
    label: 'متاجر رقمية',
    Icon: PiSquaresFourLight,
    submenu: digitalStores,
    src: '/assets/digitalStores.webp',
    path: '#',
  },
  {
    id: 2,
    label: 'منصات ألعاب',
    Icon: IoGameControllerOutline,
    submenu: gamingPlatforms,
    src: '/assets/gamingPlatforms.webp',
    path: '#',
  },
  {
    id: 3,
    label: 'الإتصال والبيانات',
    Icon: MdSignalCellularAlt,
    submenu: contactAndData,
    src: '/assets/contactAndData.webp',
    path: '#',
  },
  {
    id: 4,
    label: 'بطاقات تسوق',
    Icon: PiShoppingCartLight,
    submenu: shoppingCarts,
    src: '/assets/shoppingCarts.webp',
    path: '#',
  },
  {
    id: 5,
    label: 'خدمات وإشتراكات',
    Icon: MdMoreHoriz,
    submenu: servicesAndSubscriptions,
    src: '/assets/servicesAndSubscriptions.webp',
    path: '#',
  },
  {
    id: 6,
    label: 'مطاعم',
    Icon: MdRestaurant,
    submenu: restaurants,
    src: '/assets/restaurants.webp',
    path: '#',
  },
];

export const BestSellersData = [
  {
    id: 1,
    src: 'itunes',
    title: 'قسائم دليل ستور',
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
