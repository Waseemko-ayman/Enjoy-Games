import {
  ButtonIconPosition,
  ButtonMainVarinats,
  ButtonTypes,
  ButtonVarinats,
  CommonCardVariant,
  footerListsName,
  NavbarLayout,
} from '@/utils/type';

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

export interface ImageProps {
  imgSrc: string;
  imgAlt: string;
  imgTitle: string;
  width: number;
  height: number;
  otherClassName?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVarinats;
  borderRadius?: string;
  otherClassName?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: ButtonTypes;
  Icon?: React.ElementType;
  iconPosition?: ButtonIconPosition;
}

export interface CommonCardProps {
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
  Icon?: React.ElementType;
}

export interface NavItemProps {
  Icon: React.ElementType | string;
  text: string;
  linkPath?: string;
  otherClassName?: string;
  otherClassNameIcon?: string;
  showArrow?: boolean;
  onClick?: () => void;
  layout?: NavbarLayout;
  isMobile?: boolean;
}

export interface SectionComponentProps {
  title: string;
  children: React.ReactNode;
}

export interface ContactInfoProps {
  label: string;
  email: string;
  Icon: React.ElementType;
}

export interface SubMenuItem {
  label: string;
  Icon: React.ElementType | string;
  submenu?: SubMenuItem[];
  path?: string;
}

export interface DropdownNavItemProps {
  text: string;
  Icon: React.ElementType | string;
  submenu?: SubMenuItem[];
  isMainMenu?: boolean;
}

export interface FooterLinksProps {
  secTitle: string;
  listClassName?: string;
  listName: footerListsName;
  otherClassName?: string;
}

export interface LinkItem {
  id: number;
  title: string;
  icon: React.ElementType;
  link: string;
}

export interface SectionTypeCardProps {
  path: string;
  title: string;
  imgSrc: string;
  imgAlt: string;
  imgTitle: string;
  width: number;
  height: number;
}

export interface ServiceCardProps {
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

export interface SectionTitleProps {
  Icon?: React.ElementType | string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  className?: string;
}

export interface FeatureCardProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  bgColor: string;
  textColor?: string;
}

export interface TierBadgeProps {
  name: string;
  icon: React.ElementType;
  isActive?: boolean;
}

export interface ResponsiveDialogDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
  headerClassName?: string;
}

export interface CustomDialogDrawerProps extends ResponsiveDialogDrawerProps {
  title?: string;
  description?: string;
}
