'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const NotFound = () => {
  const t = useTranslations('notFound');
  const btnTxts = useTranslations('BtnTexts');
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Image
              src="/assets/logo.png"
              alt="Enjoy Games Logo"
              width={150}
              height={150}
              className="drop-shadow-lg"
            />
          </motion.div>
        </div>

        <h1 className="text-5xl font-bold text-red-500">404</h1>

        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800">
          {t('title')}
        </h2>

        <p className="mt-2 text-gray-500 text-base md:text-lg">
          {t('description')}
        </p>

        <Link
          href="/"
          className="mt-6 inline-block bg-enjoy-primary hover:bg-enjoy-primary/90 text-white px-6 py-3 rounded-full text-sm font-medium shadow-md transition-all duration-200"
        >
          {btnTxts('backToHome')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
