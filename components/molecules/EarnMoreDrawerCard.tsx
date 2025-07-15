import Image from 'next/image';
import Button from '../atomic/Button';
import { EarnMoreDrawerCardProps } from '@/interfaces';
import { FaCopy } from 'react-icons/fa6';

const EarnMoreDrawerCard = ({
  id,
  title,
  description,
  image,
  imageAlt = 'illustration',
  order = 'right',
  footerType = 'button',
  onCopyLink,
  socialLinks,
  otherClassName,
}: EarnMoreDrawerCardProps) => {
  const number = id < 10 ? `0${id}` : id;

  return (
    <div className={`py-2 ${otherClassName}`}>
      <div
        className={`flex items-center justify-between gap-4 ${
          order === 'left' ? 'flex-row-reverse' : ''
        }`}
      >
        <div>
          <h5 className="text-base font-bold mb-2">
            {number}. {title}
          </h5>
          <p className="text-sm font-medium text-[var(--enjoy-gray-650)]">
            {description}
          </p>
        </div>
        <Image
          src={`/assets/${image}.png`}
          alt={imageAlt}
          width={90}
          height={90}
        />
      </div>

      {footerType === 'button' && (
        <Button
          variant="forth"
          otherClassName="mt-3 w-full py-3 px-5"
          handleClick={onCopyLink}
          Icon={FaCopy}
        >
          اضغط لنسخ رابطك الخاص!
        </Button>
      )}

      {footerType === 'social' && (
        <ul className="mt-4 flex gap-3">{socialLinks}</ul>
      )}
    </div>
  );
};

export default EarnMoreDrawerCard;
