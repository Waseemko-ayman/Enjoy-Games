import {
  FaChartBar,
  FaCrown,
  FaDiamond,
  FaFacebook,
  FaGift,
  FaInstagram,
  FaLinkedin,
  FaRegGem,
  FaRegHeart,
  FaRegStar,
  FaSackDollar,
  FaTwitter,
} from 'react-icons/fa6';
import { IoArrowRedoOutline, IoGameControllerOutline } from 'react-icons/io5';
import { MdMoreHoriz, MdOutlineEmail } from 'react-icons/md';
import { PiShoppingCartLight, PiSquaresFourLight } from 'react-icons/pi';
import { PATHS } from './paths';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { FiAward, FiTrendingUp } from 'react-icons/fi';
import { Sparkles, Wallet } from 'lucide-react';
import { RewardTier } from '@/interfaces';

export const digitalStores = [
  {
    label: 'آيتونز',
    Icon: 'digitals-stores/itunes.png',
    banner: 'digitals-stores/apple-store-banner.webp',
  },
  {
    label: 'قوقل بلاي',
    Icon: 'digitals-stores/google-play-logo.png',
    banner: 'digitals-stores/google-play-banner.webp',
  },
  {
    label: 'هواوي',
    Icon: 'digitals-stores/huawei-logo.png',
    banner: 'digitals-stores/huawei-banner.webp',
  },
];

export const gamingPlatforms = [
  {
    label: 'بلاي ستيشن',
    Icon: 'games-logos/playstation-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'إكس بوكس',
    Icon: 'games-logos/xbox-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'ستيم',
    Icon: 'games-logos/steam-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'بيبجي',
    Icon: 'games-logos/pubg-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'جواكر',
    Icon: 'games-logos/jawaker-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'يلا لودو',
    Icon: 'games-logos/yalla-ludo-logo.jpg',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'روبلوكس',
    Icon: 'games-logos/roblox-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'فري فاير',
    Icon: 'games-logos/free-fire-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'موبايل ليجندز',
    Icon: 'games-logos/mobile-legends-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'بليزارد',
    Icon: 'games-logos/blizzard_entertainment-logo.jpg',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'دومينو كافيه',
    Icon: 'games-logos/domino-cafe-logo.webp',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'لودو كلوب',
    Icon: 'games-logos/ludo-club-logo.jpg',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'فالورنت',
    Icon: 'games-logos/valorant-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'نيكسون',
    Icon: 'games-logos/nexon-logo.jpg',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'فاينل فانتسي',
    Icon: 'games-logos/final-fantasy-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'يلا فزعة',
    Icon: 'games-logos/yalla-fazaa-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'جراند ثفت أوتو',
    Icon: 'games-logos/grand-theft-auto-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'كـاروم جـولد',
    Icon: 'games-logos/carrom-gold-logo.jpeg',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'بلاك كلوفر موبايل',
    Icon: 'games-logos/black-clouer-logo.jpg',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'NBA 2K24',
    Icon: 'games-logos/nba-2k24-logo.jpeg',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'R2 Games',
    Icon: 'games-logos/R2games-logo.jpg',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'بارشيس لودو',
    Icon: 'games-logos/parchios-club-logo.jpg',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'Madden NFL أيه 25',
    Icon: 'games-logos/madden-NFL25-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'نينتندو',
    Icon: 'games-logos/nintendo-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'نداء الحرب',
    Icon: 'games-logos/nidaa-al-harb-logo.webp',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'فورتنايت',
    Icon: 'games-logos/fortnite-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'آي آي إف سي 25',
    Icon: 'games-logos/fc25-logo.webp',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'كملنا',
    Icon: 'games-logos/kamlna-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'ليج أوف ليجندز',
    Icon: 'games-logos/league-of-legends-logo.jpg',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'EA Play',
    Icon: 'games-logos/EA-play-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'جينشين إمباكت',
    Icon: 'games-logos/genshin-logo.webp',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'Riot Access',
    Icon: 'games-logos/riot-access-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'تين باي جولد',
    Icon: 'games-logos/teen-patti-gold-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'أبيكس ليجندز',
    Icon: 'games-logos/apex-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'أنداون',
    Icon: 'games-logos/undawn-logo.jpg',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'آونر أوف كينجز',
    Icon: 'games-logos/honor-of-kings-logo.jpg',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'أرينا بريكوت',
    Icon: 'games-logos/arena-brenkout-logo.jpg',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'PUBG NewState',
    Icon: 'games-logos/pubg-new-state-logo.jpg',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'سي أوف ثيفز',
    Icon: 'games-logos/sea-of-thieves-emblem-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'كول أوف ديوتي',
    Icon: 'games-logos/call-of-duty.jpg',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'ماين كرافت',
    Icon: 'games-logos/minecraft-logo.jpeg',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'آي آي إف سي 24',
    Icon: 'games-logos/fc24-logo.webp',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'فـاينل فانتسي',
    Icon: 'games-logos/final-fantasy-logo.png',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
  {
    label: 'كاندي كراش سـاغـا',
    Icon: 'games-logos/candy-crush-logo.webp',
    banner: 'games-banners/arena-brenkout-banner.webp',
  },
];

export const shoppingCarts = [
  {
    label: 'أمازون',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'إيباي',
    Icon: 'shopping-carts/shopping-carts-logos/ebay-logo.png',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'ريزر جولد',
    Icon: 'shopping-carts/shopping-carts-logos/razer-gold-logo.png',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'باي سيف كارد',
    Icon: 'shopping-carts/shopping-carts-logos/paysafecard-logo.png',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'نون',
    Icon: 'shopping-carts/shopping-carts-logos/noon-logo.jpeg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'هوم سنتر',
    Icon: 'shopping-carts/shopping-carts-logos/home-center-logo.jpeg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'سبلاش',
    Icon: 'shopping-carts/shopping-carts-logos/splash-logo.png',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'لولو هايبرماركت',
    Icon: 'shopping-carts/shopping-carts-logos/lulu-logo.png',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'باتشي',
    Icon: 'shopping-carts/shopping-carts-logos/patchi-logo.jpeg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'النهدي',
    Icon: 'shopping-carts/shopping-carts-logos/nahdi-logo.png',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'ڤوكس سينما',
    Icon: 'shopping-carts/shopping-carts-logos/vox-logo.png',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'ساكو',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أسواق التميمي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'ماكس',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'نايس ون',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'جرير',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'ستايلي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'سنتربوينت',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'بيبي شوب',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'شو مارت',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'لايف ستايل',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'هوم بوكس',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'آني وداني',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'جمعية حجر الخيرية',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'شي إن',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'شو إكسبريس',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'المنيع',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'بنده',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'نمشي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'شكراً',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'كروكس',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أنجلوت',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'بيبي فتيحي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أسواق المزرعة',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'القثمي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'المسافر',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'تويز آر آص',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'فوغا كلوسيت',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'الشايع للساعات',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'البداح للعود',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'Qidz',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أسواق عبدالله العثيم',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'د.كيف كافيه',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: '',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'جو سبا',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'زهرة الربيع',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'دولار بلس',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'سكيتشرز',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'الأربش للذهب والمجوهرات',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'شوكولاتة روشة',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'مجوهرات داماس',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'فلاي إن',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'سويتر',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'جمعية نافع لسقيا الماء - بطاقة تبرع',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'بن داود',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'نباتاتي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'فلورينا',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'دكتور ام',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'الدبلومات',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'إيتالي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'مغربي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'ناتشيرلايزر',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أورجانيك',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'جوي الوكاس',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'الماس الجوري',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أو دو تواليت',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'حدائق نورا',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'تافولا',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أثليتس كو',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'سي سي سي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'كور',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'إيرلاينجيفت',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'برغرفيول',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'إنسباير',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'ميرميد سبا',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
    banner: 'shopping-carts/shopping-carts-banners/amazon-banner.webp',
  },
];

export const servicesAndSubscriptions = [
  {
    label: 'هنقرستيشن',
    Icon: 'services-subscriptions/hunger-station.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    label: 'نعناع',
    Icon: 'services-subscriptions/nana-logo.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    label: 'مكافي',
    Icon: 'services-subscriptions/mcafee-logo.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    label: 'نون مينتس',
    Icon: 'services-subscriptions/noon-mintes-logo.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    label: 'مرسول',
    Icon: 'services-subscriptions/marsool-logo.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    label: 'ديسكورد',
    Icon: 'services-subscriptions/discord-logo.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    label: 'ستوري تل',
    Icon: 'services-subscriptions/storytel-logo.webp',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    label: 'سوبر مول',
    Icon: 'services-subscriptions/super-mall-logo.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    label: 'تويتش',
    Icon: 'services-subscriptions/twitch-logo.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    label: 'مايكروسفت أوفيس',
    Icon: 'services-subscriptions/microsoft-logo.webp',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    label: 'أجيبه',
    Icon: 'services-subscriptions/ajeebh-logo.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    label: 'ناو ناو',
    Icon: 'services-subscriptions/now-now-logo.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    label: 'شاهد | رياضة',
    Icon: 'services-subscriptions/shahid-logo.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    label: 'كاسبرسكي',
    Icon: 'services-subscriptions/kaspersky-logo.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
  {
    label: 'نون فود',
    Icon: 'services-subscriptions/noon-food-logo.png',
    banner: 'services-subscriptions/microsoft-logo.webp',
  },
];

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
        title: 'دليل إنجوي',
        icon: IoArrowRedoOutline,
        link: '#',
      },
      {
        id: 2,
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
        title: 'التحدث مع خدمة العملاء',
        icon: MdOutlineEmail,
        link: '#',
      },
      {
        id: 2,
        title: 'الأسئلة الشائعة',
        icon: IoMdHelpCircleOutline,
        link: '#',
      },
    ],
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
    link: PATHS.MAX_PROGRAM.link,
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
  {
    id: 2,
    title: 'برنامج مكسب',
    type: 'earnings',
    amount: 0,
    currency: 'ريال',
    description: 'أرباحك القابلة للسحب',
  },
  {
    id: 3,
    title: 'نقاط دليل ستارز',
    type: 'points',
    amount: 0,
    currency: 'نقطة',
    description: 'نقاطك القابلة للتحويل',
  },
];
