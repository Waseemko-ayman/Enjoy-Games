import {
  ButtonIconPosition,
  ButtonMainVarinats,
  ButtonTypes,
  ButtonVarinats,
  CommonCardVariant,
  footerListsName,
} from '@/utils/type';

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