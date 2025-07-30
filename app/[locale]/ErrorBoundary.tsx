/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Button from '@/components/atomic/Button';
import Image from 'next/image';
import React, { Component } from 'react';
import { FaArrowsRotate } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  handleClick = () => {
    location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <WithTranslations
          render={(errorTxts, btnTxts) => (
            <div className="relative z-[6500] text-center flex items-center justify-center bg-[#f8f9ff] w-full h-screen">
              <div>
                <Image
                  src="/assets/cloud.png"
                  alt={errorTxts('title')}
                  title={errorTxts('title')}
                  className="mx-auto animate-zoom"
                  width={128}
                  height={128}
                />
                <h2 className="text-center text-lg md:text-xl lg:text-2xl mt-5 mb-2">
                  {errorTxts('title')}
                </h2>
                <Button
                  handleClick={this.handleClick}
                  Icon={FaArrowsRotate}
                  otherClassName="py-2 px-8 mx-auto"
                >
                  {btnTxts('LetsTryAgain')}
                </Button>
              </div>
            </div>
          )}
        />
      );
    }
    return this.props.children;
  }
}

// Higher-Order Component to use translation in Class Component
const WithTranslations = ({
  render,
}: {
  render: (
    errorTxts: (key: string) => string,
    btnTxts: (key: string) => string
  ) => React.ReactNode;
}) => {
  const errorTxts = useTranslations('errorBoundary');
  const btnTxts = useTranslations('BtnTexts');
  return render(errorTxts, btnTxts);
};

export default ErrorBoundary;
