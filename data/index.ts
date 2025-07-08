import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa6';
import { IoGameControllerOutline } from 'react-icons/io5';
import { MdMoreHoriz, MdRestaurant, MdSignalCellularAlt } from 'react-icons/md';
import { PiShoppingCartLight, PiSquaresFourLight } from 'react-icons/pi';

const digitalStores = [
  { label: 'آيتونز', Icon: 'digitals-stores/itunes.png' },
  { label: 'قوقل بلاي', Icon: 'digitals-stores/google-play-logo.png' },
  { label: 'هواوي', Icon: 'digitals-stores/huawei-logo.png' },
];

const gamingPlatforms = [
  { label: 'بلاي ستيشن', Icon: 'games-logos/playstation-logo.png' },
  { label: 'إكس بوكس', Icon: 'games-logos/xbox-logo.png' },
  { label: 'ستيم', Icon: 'games-logos/steam-logo.png' },
  { label: 'بيبجي', Icon: 'games-logos/pubg-logo.png' },
  { label: 'جواكر', Icon: 'games-logos/jawaker-logo.png' },
  { label: 'يلا لودو', Icon: 'games-logos/yalla-ludo-logo.jpg' },
  { label: 'روبلوكس', Icon: 'games-logos/roblox-logo.png' },
  { label: 'فري فاير', Icon: 'games-logos/free-fire-logo.png' },
  {
    label: 'موبايل ليجندز',
    Icon: 'games-logos/mobile-legends-logo.png',
  },
  {
    label: 'بليزارد',
    Icon: 'games-logos/blizzard_entertainment-logo.jpg',
  },
  { label: 'دومينو كافيه', Icon: 'games-logos/domino-cafe-logo.webp' },
  { label: 'لودو كلوب', Icon: 'games-logos/ludo-club-logo.jpg' },
  { label: 'فالورنت', Icon: 'games-logos/valorant-logo.png' },
  { label: 'نيكسون', Icon: 'games-logos/nexon-logo.jpg' },
  { label: 'فاينل فانتسي', Icon: 'games-logos/final-fantasy-logo.png' },
  { label: 'يلا فزعة', Icon: 'games-logos/yalla-fazaa-logo.png' },
  {
    label: 'جراند ثفت أوتو',
    Icon: 'games-logos/grand-theft-auto-logo.png',
  },
  { label: 'كـاروم جـولد', Icon: 'games-logos/carrom-gold-logo.jpeg' },
  {
    label: 'بلاك كلوفر موبايل',
    Icon: 'games-logos/black-clouer-logo.jpg',
  },
  { label: 'NBA 2K24', Icon: 'games-logos/nba-2k24-logo.jpeg' },
  { label: 'R2 Games', Icon: 'games-logos/R2games-logo.jpg' },
  { label: 'بارشيس لودو', Icon: 'games-logos/parchios-club-logo.jpg' },
  {
    label: 'Madden NFL أيه 25',
    Icon: 'games-logos/madden-NFL25-logo.png',
  },
  { label: 'نينتندو', Icon: 'games-logos/nintendo-logo.png' },
  { label: 'نداء الحرب', Icon: 'games-logos/nidaa-al-harb-logo.webp' },
  { label: 'فورتنايت', Icon: 'games-logos/fortnite-logo.png' },
  { label: 'آي آي إف سي 25', Icon: 'games-logos/fc25-logo.webp' },
  { label: 'كملنا', Icon: 'games-logos/kamlna-logo.png' },
  {
    label: 'ليج أوف ليجندز',
    Icon: 'games-logos/league-of-legends-logo.jpg',
  },
  { label: 'EA Play', Icon: 'games-logos/EA-play-logo.png' },
  { label: 'جينشين إمباكت', Icon: 'games-logos/genshin-logo.webp' },
  { label: 'Riot Access', Icon: 'games-logos/riot-access-logo.png' },
  {
    label: 'تين باي جولد',
    Icon: 'games-logos/teen-patti-gold-logo.png',
  },
  { label: 'أبيكس ليجندز', Icon: 'games-logos/apex-logo.png' },
  { label: 'أنداون', Icon: 'games-logos/undawn-logo.jpg' },
  {
    label: 'آونر أوف كينجز',
    Icon: 'games-logos/honor-of-kings-logo.jpg',
  },
  {
    label: 'أرينا بريكوت',
    Icon: 'games-logos/arena-brenkout-logo.jpg',
  },
  {
    label: 'PUBG NewState',
    Icon: 'games-logos/pubg-new-state-logo.jpg',
  },
  {
    label: 'سي أوف ثيفز',
    Icon: 'games-logos/sea-of-thieves-emblem-logo.png',
  },
  { label: 'كول أوف ديوتي', Icon: 'games-logos/call-of-duty.jpg' },
  { label: 'ماين كرافت', Icon: 'games-logos/minecraft-logo.jpeg' },
  { label: 'آي آي إف سي 24', Icon: 'games-logos/fc24-logo.webp' },
  {
    label: 'فـاينل فانتسي',
    Icon: 'games-logos/final-fantasy-logo.png',
  },
  {
    label: 'كاندي كراش سـاغـا',
    Icon: 'games-logos/candy-crush-logo.webp',
  },
];

const contactAndData = [
  { label: 'شحن سوا', Icon: 'Communication-data-logos/stc-logo.jpg' },
  {
    label: 'شحن موبايلي',
    Icon: 'Communication-data-logos/mobily-logo.png',
  },
  {
    label: 'شحن ليبارا',
    Icon: 'Communication-data-logos/Lebara-logo.png',
  },
  {
    label: 'فيرجن موبايل',
    Icon: 'Communication-data-logos/virgin-mobile-logo.png',
  },
  { label: 'كويك نت', Icon: 'Communication-data-logos/stc-logo.jpg' },
  {
    label: 'فرندي موبايل',
    Icon: 'Communication-data-logos/friendi-logo.jpg',
  },
  {
    label: 'فرندي نت',
    Icon: 'Communication-data-logos/friendi-logo.jpg',
  },
  { label: 'زين نت', Icon: 'Communication-data-logos/zain-logo.jpg' },
  {
    label: 'زين فليكس',
    Icon: 'Communication-data-logos/zain-logo.jpg',
  },
  { label: 'زين شباب', Icon: 'Communication-data-logos/zain-logo.jpg' },
  { label: 'شحن زين', Icon: 'Communication-data-logos/zain-logo.jpg' },
  {
    label: 'موبايلي نت',
    Icon: 'Communication-data-logos/mobily-logo.png',
  },
  { label: 'باقات سوا', Icon: 'Communication-data-logos/stc-logo.jpg' },
  {
    label: 'سلام',
    Icon: 'Communication-data-logos/salam-mobile-logo.png',
  },
  {
    label: 'ليبارا نت',
    Icon: 'Communication-data-logos/Lebara-logo.png',
  },
  {
    label: 'ريد بل داتا',
    Icon: 'Communication-data-logos/red-bull-mobile-logo.jpg',
  },
  { label: 'إيـوا', Icon: 'Communication-data-logos/aywa-logo.jpg' },
];

const shoppingCarts = [
  {
    label: 'أمازون',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  { label: 'إيباي', Icon: 'shopping-carts/shopping-carts-logos/ebay-logo.png' },
  {
    label: 'ريزر جولد',
    Icon: 'shopping-carts/shopping-carts-logos/razer-gold-logo.png',
  },
  {
    label: 'باي سيف كارد',
    Icon: 'shopping-carts/shopping-carts-logos/paysafecard-logo.png',
  },
  { label: 'نون', Icon: 'shopping-carts/shopping-carts-logos/noon-logo.jpeg' },
  {
    label: 'هوم سنتر',
    Icon: 'shopping-carts/shopping-carts-logos/home-center-logo.jpeg',
  },
  {
    label: 'سبلاش',
    Icon: 'shopping-carts/shopping-carts-logos/splash-logo.png',
  },
  {
    label: 'لولو هايبرماركت',
    Icon: 'shopping-carts/shopping-carts-logos/lulu-logo.png',
  },
  {
    label: 'باتشي',
    Icon: 'shopping-carts/shopping-carts-logos/patchi-logo.jpeg',
  },
  {
    label: 'النهدي',
    Icon: 'shopping-carts/shopping-carts-logos/nahdi-logo.png',
  },
  {
    label: 'ڤوكس سينما',
    Icon: 'shopping-carts/shopping-carts-logos/vox-logo.png',
  },
  {
    label: 'ساكو',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أسواق التميمي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'ماكس',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'نايس ون',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'جرير',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'ستايلي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'سنتربوينت',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'بيبي شوب',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'شو مارت',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'لايف ستايل',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'هوم بوكس',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'آني وداني',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'جمعية حجر الخيرية',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'شي إن',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'شو إكسبريس',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'المنيع',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'بنده',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'نمشي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'شكراً',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'كروكس',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أنجلوت',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'بيبي فتيحي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أسواق المزرعة',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'القثمي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'المسافر',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'تويز آر آص',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'فوغا كلوسيت',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'الشايع للساعات',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'البداح للعود',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'Qidz',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أسواق عبدالله العثيم',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'د.كيف كافيه',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  { label: '', Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg' },
  {
    label: 'جو سبا',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'زهرة الربيع',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'دولار بلس',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'سكيتشرز',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'الأربش للذهب والمجوهرات',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'شوكولاتة روشة',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'مجوهرات داماس',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'فلاي إن',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'سويتر',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'جمعية نافع لسقيا الماء - بطاقة تبرع',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'بن داود',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'نباتاتي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'فلورينا',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'دكتور ام',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'الدبلومات',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'إيتالي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'مغربي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'ناتشيرلايزر',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أورجانيك',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'جوي الوكاس',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'الماس الجوري',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أو دو تواليت',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'حدائق نورا',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'تافولا',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أثليتس كو',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'سي سي سي',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'كور',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'إيرلاينجيفت',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'برغرفيول',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'إنسباير',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'ميرميد سبا',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
  {
    label: 'أردين',
    Icon: 'shopping-carts/shopping-carts-logos/amazon-logo.jpg',
  },
];

const servicesAndSubscriptions = [
  {
    label: 'هنقرستيشن',
    Icon: 'services-subscriptions/hunger-station.png',
  },
  { label: 'نعناع', Icon: 'services-subscriptions/nana-logo.png' },
  { label: 'مكافي', Icon: 'services-subscriptions/mcafee-logo.png' },
  {
    label: 'نون مينتس',
    Icon: 'services-subscriptions/noon-mintes-logo.png',
  },
  { label: 'مرسول', Icon: 'services-subscriptions/marsool-logo.png' },
  { label: 'ديسكورد', Icon: 'services-subscriptions/discord-logo.png' },
  {
    label: 'ستوري تل',
    Icon: 'services-subscriptions/storytel-logo.webp',
  },
  {
    label: 'سوبر مول',
    Icon: 'services-subscriptions/super-mall-logo.png',
  },
  { label: 'تويتش', Icon: 'services-subscriptions/twitch-logo.png' },
  {
    label: 'مايكروسفت أوفيس',
    Icon: 'services-subscriptions/microsoft-logo.webp',
  },
  { label: 'أجيبه', Icon: 'services-subscriptions/ajeebh-logo.png' },
  { label: 'ناو ناو', Icon: 'services-subscriptions/now-now-logo.png' },
  {
    label: 'شاهد | رياضة',
    Icon: 'services-subscriptions/shahid-logo.png',
  },
  {
    label: 'كاسبرسكي',
    Icon: 'services-subscriptions/kaspersky-logo.png',
  },
  {
    label: 'نون فود',
    Icon: 'services-subscriptions/noon-food-logo.png',
  },
];

const restaurants = [
  { label: 'وشنة (Washna)', Icon: 'restaurants-logos/washna-logo.jpeg' },
  { label: 'فينور (Venor)', Icon: 'restaurants-logos/venor-logo.webp' },
  {
    label: 'صبحي كابر (Sobhy Kaber)',
    Icon: 'restaurants-logos/sobhy-kaber-logo.png',
  },
  { label: 'سراي (Seray)', Icon: 'restaurants-logos/seray-logo.png' },
  { label: 'ميموز (Memos)', Icon: 'restaurants-logos/memos-logo.png' },
  {
    label: 'هابرا (HABRA beef canteen)',
    Icon: 'restaurants-logos/habra-logo.jpg',
  },
  { label: 'في قلبك (Figalbak)', Icon: 'restaurants-logos/figalbak-logo.jpg' },
  {
    label: 'بلاك تاب (Black Tap Craft Burgers)',
    Icon: 'restaurants-logos/black-tap-logo.png',
  },
  { label: 'عسيب (Aseeb)', Icon: 'restaurants-logos/aseeb-logo.png' },
  { label: 'ميز (Meez)', Icon: 'restaurants-logos/meez-logo.png' },
  { label: 'أوڤن (Ovun)', Icon: 'restaurants-logos/ovun-logo.jpeg' },
  { label: 'مدموزيل (Mlle)', Icon: 'restaurants-logos/mlle-logo.jpg' },
  {
    label: 'ال كامينو (El Camino)',
    Icon: 'restaurants-logos/elcamino-logo.jpg',
  },
  {
    label: 'دار العوجا (Daralauja)',
    Icon: 'restaurants-logos/daralauja-logo.jpg',
  },
  { label: 'اركومي (Arcomi)', Icon: 'restaurants-logos/arcomi-logo.jpg' },
  { label: 'شاركوزا (Charcoza)', Icon: 'restaurants-logos/charcoza-logo.jpeg' },
  { label: 'الكوفية (Alkofeia)', Icon: 'restaurants-logos/alkofeia-logo.jpg' },
  {
    label: 'سنشري برجر (Century Burger)',
    Icon: 'restaurants-logos/century-burger-logo.png',
  },
  { label: 'لاڤاش (Lavash)', Icon: 'restaurants-logos/lavash-logo.jpeg' },
  { label: 'أوف وايت (Offwhite)', Icon: 'restaurants-logos/offwhite-logo.jpg' },
  {
    label: 'بيت عمر (Beit Omar)',
    Icon: 'restaurants-logos/beit-omar-logo.jpeg',
  },
  { label: 'ميسور (Maysore)', Icon: 'restaurants-logos/maysore-logo.jpg' },
  { label: 'كرزة (Karazah)', Icon: 'restaurants-logos/karazah-logo.png' },
  { label: 'Section-B', Icon: 'restaurants-logos/section-b-logo.png' },
  { label: 'باكو (Baco)', Icon: 'restaurants-logos/baco-logo.jpg' },
  { label: 'أرمين (Armin)', Icon: 'restaurants-logos/armin-logo.webp' },
  { label: 'ياواتشا', Icon: 'restaurants-logos/yawatsha-logo.png' },
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
