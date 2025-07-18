import ProgressCircle from '@/components/molecules/ProgressCircle';
import {
  ButtonIconPosition,
  ButtonMainVarinats,
  ButtonTypes,
  ButtonVarinats,
  CommonCardVariant,
  footerListsName,
  NavbarLayout,
} from '@/utils/type';
import { ElementType, JSX } from 'react';

interface BaseIconProps {
  Icon?: React.ElementType | string;
}

interface BaseClassNameProps {
  otherClassName?: string;
}

interface WithChildren {
  children: React.ReactNode;
}

export interface ButtonProps extends BaseClassNameProps, WithChildren {
  variant?: ButtonVarinats;
  borderRadius?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: ButtonTypes;
  Icon?: React.ElementType;
  iconPosition?: ButtonIconPosition;
  disabled?: boolean;
  bgColor?: string;
  hoverBgColor?: string;
}

export interface cardProps {
  title: string;
  price?: number;
  newPrice?: number;
  storeName?: string;
  storeFlagImg?: string;
  ratings?: number | string;
}

export interface ProductCardProps extends BaseIconProps, cardProps {
  titleIsLink?: boolean;
  productLink?: string;
  description?: boolean;
  imgSrc: string;
  imgAlt: string;
  imgTitle: string;
  variant?: CommonCardVariant;
  cardLinkPath?: string;
  tall?: boolean;
  showBtn?: boolean;
  btnVariant?: ButtonMainVarinats;
  btnText?: string;
  otherClassNameBtn?: string;
}

export interface NavItemProps extends BaseIconProps, BaseClassNameProps {
  text: string;
  linkPath?: string;
  otherClassNameIcon?: string;
  showArrow?: boolean;
  onClick?: () => void;
  layout?: NavbarLayout;
  isMobile?: boolean;
}

export interface NavbarProps {
  layout?: NavbarLayout;
  isMobile?: boolean;
}

export interface Country {
  name: string;
  currency: string;
  img: string;
}

export interface CountryDrawerProps {
  countries: Country[];
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface PopupMenuProps {
  animateClose: boolean;
  onClose: () => void;
}

export interface ImageProps extends BaseClassNameProps {
  imgSrc: string;
  imgAlt: string;
  imgTitle?: string;
  width?: number;
  height?: number;
}

export interface SectionComponentProps extends WithChildren {
  title: string;
}

export interface ContactInfoProps extends BaseIconProps {
  label: string;
  email: string;
}

export interface SubMenuItem extends BaseIconProps {
  label: string;
  submenu?: SubMenuItem[];
  path?: string;
}

export interface DropdownNavItemProps extends BaseIconProps {
  text: string;
  submenu?: SubMenuItem[];
  isMainMenu?: boolean;
}

export interface FooterLinksProps extends BaseClassNameProps {
  secTitle: string;
  listClassName?: string;
  listName: footerListsName;
}

export interface LinkItem extends BaseIconProps {
  id: number;
  title: string;
  link: string;
  icon: React.ElementType | string;
}

export interface SectionTypeCardProps extends BaseClassNameProps {
  path: string;
  title: string;
  imgSrc: string;
  imgAlt: string;
  imgTitle: string;
  width?: number;
  height?: number;
  otherClassName?: string;
}

export interface ServiceCardProps extends BaseClassNameProps {
  image: string;
  imgAlt: string;
  title: string;
  description: string;
}

export interface BannerProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export interface shiddaItem extends cardProps {
  id: number;
  src: string;
}

export interface CardItem {
  id: string;
  Icon: string;
  label: string;
  banner?: string;
  href?: string;
  requiresAccount?: boolean;
  shiddatData: shiddaItem[];
}

export interface CategoryPageProps {
  cards: CardItem[];
}

export interface CategoryCardProps {
  href?: string;
  banner?: string;
  label: string;
}

export interface CountrySelectorContentProps {
  countries: Country[];
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  closeHandler: () => void;
}

export interface SectionTitleProps extends BaseIconProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export interface FeatureCardProps extends BaseIconProps {
  title: string;
  description: string;
  bgColor: string;
  textColor?: string;
}

export interface TierBadgeProps extends BaseIconProps {
  name: string;
  isActive?: boolean;
}

export interface ResponsiveDialogDrawerProps extends WithChildren {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile?: boolean;
  trigger: React.ReactNode;
  contentClassName?: string;
  headerClassName?: string;
}

export interface CustomDialogDrawerProps extends ResponsiveDialogDrawerProps {
  title?: string;
  description?: string;
}

export interface TopBannerDrawerContentProps {
  isMobile: boolean;
  onClose: () => void;
  onDiscover: () => void;
}

export interface GridWrapperProps extends BaseClassNameProps, WithChildren {
  isScrollable?: boolean;
  gridCols?: string;
  itemClassName?: string;
}

export interface AuthLayoutProps extends SectionComponentProps {
  btnText: string;
  description: string;
  showFooterText?: boolean;
  isSubmitDisabled?: boolean;
  onSubmit?: () => void;
}

export interface WalletCardProps extends BaseIconProps {
  title: string;
  value: string;
  unit: string;
  bgColor: string;
  textColor: string;
  pathName: string;
}

export interface RewardTier {
  id: number;
  name: string;
  percentage: number;
  isActive: boolean;
}

export interface EarnMoreDrawerCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  order?: 'left' | 'right';
  footerType?: 'button' | 'social' | 'none';
  onCopyLink?: () => void;
  socialLinks?: React.ReactNode;
  otherClassName?: string;
}

export interface TierProgressWrapperProps extends WithChildren {
  title: string;
  connectionLineWidth: number;
  progress: string;
  progressFooter: React.ComponentProps<typeof ProgressCircle>['footer'];
}

export interface EarningsPointsSectionProps {
  variant: 'earnings' | 'points';
  totalAmount: number;
  withdrawableAmount: number;
  conversionRate?: string;
  starPoints?: number;
  lastWithdrawalText: JSX.Element | string;
  firstButtonHref?: string;
  secondButtonHref?: string;
}

interface RewardProgram {
  id: number;
  title: string;
  type: string;
  amount?: number;
  currency?: string;
  description?: string;
}

export interface RewardProgramItemProps {
  program: RewardProgram;
  isSelected: boolean;
}

export interface SelectableListProps<T> {
  items: T[];
  selectedItem: T;
  getKey: (item: T) => React.Key;
  onSelect: (item: T) => void;
  renderContent: (item: T, isSelected: boolean) => React.ReactNode;
  className?: string;
  listClassName?: string;
}

export interface EmptyStateBoxProps {
  imageSrc: string;
  alt: string;
  title: string;
  buttonText: string;
  btnlink: string;
}

export interface CartItemData {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  storeLabel: string;
  currencyImage: string;
}

export interface BannerSlide {
  id: number;
  image: string;
}

export interface myAccountStatsProps {
  id: number;
  icon: ElementType;
  title: string;
  currency?: string;
  account?: number;
  href?: string;
}

export interface FormValues {
  username: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: 'ذكر' | 'أنثى';
  options: boolean[];
  avatar: FileList;
}

export interface paramsProps {
  category: string;
  itemId: string;
}

export interface BundlesPageProps {
  item: CardItem;
  params: paramsProps;
}

export interface ReviewData {
  overallRating: number;
  totalReviews: number;
  ratingBreakdown: {
    excellent: number;
    good: number;
    average: number;
    poor: number;
    bad: number;
  };
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  verified?: boolean;
}

export interface ReviewApiResponse {
  success: boolean;
  data: ReviewData;
  reviews: Review[];
}

export interface ReviewData {
  overallRating: number;
  totalReviews: number;
  ratingBreakdown: {
    excellent: number;
    good: number;
    average: number;
    poor: number;
    bad: number;
  };
}

export interface ReviewSectionProps {
  data?: ReviewData;
}
