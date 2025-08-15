export type ButtonMainVarinats = 'primary' | 'secondary';
export type ButtonVarinats =
  | ButtonMainVarinats
  | 'third'
  | 'forth'
  | 'fifth'
  | 'ghost'
  | 'circle';
export type ButtonTypes = 'submit' | 'button' | 'reset';
export type ButtonIconPosition = 'left' | 'right';
export type CommonCardVariant = 'row' | 'column';
export type footerListsName =
  | 'LearnMore'
  | 'BusinessAndSolutions'
  | 'shop_app'
  | 'socialMedia';

export type NavbarLayout = 'default' | 'store';
export type InputTypes =
  | 'text'
  | 'password'
  | 'search'
  | 'number'
  | 'email'
  | 'phone'
  | 'tel'
  | 'select'
  | 'multi-select'
  | 'date'
  | 'editor'
  | 'radio'
  | 'file'
  | 'textarea'
  | 'checkbox';

export type Option = { id: string | number | null; name: string };
export type ProductOption = { id: string; name: string };
export type ValueOption = { value: string | number; label: string };
