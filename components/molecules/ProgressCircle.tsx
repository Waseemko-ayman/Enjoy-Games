import Link from 'next/link';
import React from 'react';

interface ProgressCircleProps {
  progress: string;
  progressColor?: string;
  label?: string;
  footer?:
    | { type: 'link'; text: string; href: string }
    | { type: 'text'; text: string };
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  progressColor = 'text-enjoy-secondary',
  label = 'عائد لكل عملية',
  footer,
}) => {
  return (
    <div className="flex justify-center">
      <div className="relative w-60 h-60 shadow-xl rounded-full">
        {/* Outer gradient */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-200 via-blue-200 to-[var(--enjoy-primary-soft)]">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            {/* Blur */}
            <div className="absolute inset-0 backdrop-blur-[1px] rounded-full" />
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-full" />
            {/* Inner content */}
            <div className="absolute inset-1.5 bg-white rounded-full flex flex-col items-center justify-center z-10 font-bold">
              <div className={`text-[46px] mb-2 ${progressColor}`}>
                {progress}%
              </div>
              <p className="text-sm text-gray-800 mb-[7px]">{label}</p>
              {footer?.type === 'link' ? (
                <Link
                  href={footer.href}
                  className="text-sm text-enjoy-primary hover:text-enjoy-primary-soft transition-all duration-300"
                >
                  {footer.text}
                </Link>
              ) : footer?.type === 'text' ? (
                <p className="text-sm text-enjoy-primary">{footer.text}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;
