import Button from '@/components/atomic/Button';
import CountryDrawer from '@/components/molecules/CountryDrawer';
import MenuCard from '@/components/molecules/MenuCard';
import { countries, menuLists } from '@/data';
import { PATHS } from '@/data/paths';
import { PopupMenuProps } from '@/utils/type';
import Link from 'next/link';
import { useState } from 'react';
import { FaGlobe } from 'react-icons/fa6';
import { FiLogIn } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import { MdOutlineShoppingCart } from 'react-icons/md';

const PopupMenu: React.FC<PopupMenuProps> = ({ animateClose, onClose }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>(
    'السعودية - ريال سعودي'
  );
  const [open, setOpen] = useState(false);

  const circularButtonContainerStyle =
    'relative bg-white flex items-center justify-between p-1 rounded-[50%]';

  const iconStyle = 'cursor-pointer';
  const btnStyle = 'py-1.5';

  return (
    <div
      className={`fixed inset-0 bg-white z-[1000] ${
        animateClose
          ? 'animate-out slide-out-to-top duration-300'
          : 'animate-in slide-in-from-top duration-300'
      }`}
    >
      <div className="h-[60px] bg-enjoy-glass flex items-center justify-between gap-2 px-3">
        <div className={`${circularButtonContainerStyle} !bg-gray-300`}>
          <IoIosArrowForward
            className={`${iconStyle} text-sm`}
            onClick={onClose}
          />
        </div>
        <h5 className="text-center text-2xl font-bold w-full overflow-hidden whitespace-nowrap">
          المزيد
        </h5>
        <div
          className={`${circularButtonContainerStyle} border border-[var(--enjoy-gray-300)]`}
        >
          <MdOutlineShoppingCart
            className={`${iconStyle} text-lg text-enjoy-primary`}
          />
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="flex items-center justify-between gap-2">
          <Link href={PATHS.LOGIN} className="w-full">
            <Button
              otherClassName={btnStyle}
              iconPosition="left"
              Icon={FiLogIn}
            >
              تسجيل دخول
            </Button>
          </Link>
          <Link href={PATHS.SIGN_UP} className="w-full">
            <Button variant="forth" otherClassName={btnStyle}>
              أنشىء حساب
            </Button>
          </Link>
        </div>
        <div className="mt-8">
          {menuLists.map((card) => (
            <MenuCard key={card.id} linksList={card.linksItem} />
          ))}
          <div className="flex flex-col items-start gap-3 py-3 px-5 bg-white rounded-[10px] shadow-[0_8.293px_37.319px_4.147px_rgba(0,0,0,0.08)] mb-4">
            <div className="flex items-center gap-3">
              <FaGlobe />
              <button className="text-lg cursor-pointer">غير اللغة</button>
            </div>
            <CountryDrawer
              countries={countries}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              open={open}
              setOpen={setOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupMenu;
