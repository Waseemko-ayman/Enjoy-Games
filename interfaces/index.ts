/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Variants } from 'framer-motion';
import { Messages, useTranslations } from 'next-intl';
import { ElementType, JSX, ReactNode } from 'react';

export interface Category {
  id: number;
  slug: string | null;
  name: string;
  icon: string;
  image: string;
  sub_categories: SubCategories[];
  path: string;
}

export interface SubCategories {
  id: number;
  category_id: number;
  parent_id: null;
  name: string;
  slug: string;
  icon: string;
  image?: string;
  children_count: number;
  href?: string;
  onClick?: () => void;
  // shiddatData: shiddaItem[];
  // accounts?: AccountItem[];
  // accountId?: string;
  // bundles?: {
  //   id: string;
  //   title: string;
  //   price: number;
  //   accountId: string;
  // }[];
}

export interface ProductCardProps {
  id?: number;
  category_id?: number;
  sub_category_id?: number;
  title: string;
  slug?: string;
  content?: string;
  description?: string;
  image: string;
  imgAlt?: string;
  imgTitle?: string;
  name?: string;
  price_before?: number;
  price?: number;
  discount?: null;
  shipping_payment?: string;
  ratings?: number | string;
  icon?: React.ElementType | string | any;
  showDesc?: boolean;
  showBtn?: boolean;
  variant?: CommonCardVariant;
  storeName?: string;
  storeFlagImg?: string;
  tall?: boolean;
  btnVariant?: ButtonMainVarinats;
  btnText?: string;
  otherClassNameBtn?: string;
  onClick?: () => void;
}

interface BaseIconProps {
  icon?: React.ElementType | string | any;
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

export interface NavItemProps extends BaseIconProps, BaseClassNameProps {
  name: string | ReactNode;
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
  id: number;
  label: string;
  email: string;
}

export interface SubMenuItem extends BaseIconProps {
  name: string;
  sub_categories?: SubMenuItem[];
  path?: string;
}

export interface DropdownNavItemProps extends BaseIconProps {
  name: string;
  categories?: Category[];
  isMainMenu?: boolean;
}

export interface FooterLinksProps extends BaseClassNameProps {
  secTitle: string;
  listClassName?: string;
  listName: footerListsName;
  t: TranslationFunction;
}

export interface LinkItem extends BaseIconProps {
  id: number;
  key: string;
  link: string;
  icon: React.ElementType | string;
}

export interface SectionTypeCardProps extends BaseClassNameProps {
  path?: string;
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

export interface shiddaItem {
  id: number;
  src: string;
}

export interface AccountItem {
  id: string;
  label: string;
  banner: string;
  shiddatData: shiddaItem[];
}

export interface CategoryPageProps {
  cards: SubCategories[];
}

export interface CategoryCardProps {
  onClick?: () => void;
  image?: string;
  name: string;
}

export interface CountrySelectorContentProps {
  countries: Country[];
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  closeHandler: () => void;
  t: TranslationFunction;
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
  descClassName?: string;
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
  isSubmitDisabled?: boolean;
  isSubmitting?: boolean;
  onSubmit?: () => void;
}

export interface WalletCardProps extends BaseIconProps {
  title: string;
  value: string;
  unit: string;
  bgColor: string;
  textColor: string;
  pathName: string;
  isUnitTranslatable?: boolean;
}

export interface RewardTier extends BaseIconProps {
  id: number;
  key: string;
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
  btnTexts: TranslationFunction;
}

interface RewardProgram {
  id: number;
  key: string;
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

export interface CartContentProps {
  items: CartItemData[];
  onProceedToPayment: () => void;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  // onSendAsGift: () => void;
}

export interface PaymentStepProps {
  onPaymentComplete: () => void;
  onBackToCart: () => void;
  totalAmount: number;
  items: CartItemData[];
  quantity: number;
}

export interface BannerSlide {
  id: number;
  image: string;
}

export interface myAccountStatsProps {
  id: number;
  icon: ElementType;
  titleKey: string;
  currency?: string;
  account?: number;
  href?: string;
}

export interface FormValues {
  name: string;
  email: string;
  phone?: string;
  birthDate?: string;
  gender?: 'ذكر' | 'أنثى' | null;
  options: boolean[];
  avatar?: FileList | string | null;
}

export interface paramsProps {
  locale: string;
  category: string;
  itemId: string;
  productId: string;
}

export interface BundlesPageProps {
  item: SubCategories;
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

export interface FormData {
  subject: string;
  ticketType: string;
  details: string;
}

export interface DiscoverEarnMoreCardProps extends WithChildren {
  title: string;
  description: string;
  imageSrc: string;
  cardClassName?: string;
  triggerClassName?: string;
}

export type TranslationFunction = ReturnType<
  typeof useTranslations<keyof Messages>
>;

export interface RewardCardProps {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  onClick?: () => void;
  href: string;
}

export interface AnimatedWrapperProps {
  children: ReactNode;
  custom?: number;
  variants?: Variants;
  direction?: 'x' | 'y';
  distance?: number;
  duration?: number;
}

type InputOption = {
  id: number;
  value: string;
  labelKey: string;
};

export interface InputItem {
  id: number;
  inputName: string;
  type: string;
  labelKey?: string;
  label?: string;
  placeholder?: string;
  options?: InputOption[];
}

interface Step {
  id: number;
  key: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface StepIndicatorProps {
  steps: Step[];
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface signupFormData extends LoginFormData {
  name: string;
  password_confirmation: string;
}

type Account = {
  id: string;
  name: string;
  image: string;
};

export interface SelectAccountPageProps {
  accounts: Account[];
}

export interface Sliders {
  id: number;
  image: string;
}
