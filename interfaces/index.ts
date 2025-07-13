import {
  ButtonIconPosition,
  ButtonMainVarinats,
  ButtonTypes,
  ButtonVarinats,
  CommonCardVariant,
  footerListsName,
  NavbarLayout,
} from '@/utils/type';

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
}

export interface CommonCardProps extends BaseIconProps {
  title: string;
  titleIsLink?: boolean;
  productLink?: string;
  description?: boolean;
  imgSrc: string;
  imgAlt: string;
  imgTitle: string;
  price?: number;
  storeName?: string;
  storeFlagImg?: string;
  variant?: CommonCardVariant;
  cardLinkPath?: string;
  ratings?: string;
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
  imgTitle: string;
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

export interface CardItem {
  Icon: string;
  label: string;
  banner?: string;
  href?: string;
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
