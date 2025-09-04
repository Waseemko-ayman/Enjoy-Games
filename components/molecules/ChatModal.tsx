import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { X, Send, Sparkles, Bot } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useChatLogic } from '@/hook/useChatLogic';
import Button from '../atomic/Button';
import Input from '../atomic/Input';
import ResponsiveDialogDrawer from '../organism/ResponsiveDialogDrawer';
import Image from 'next/image';

type ChatModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  isMobile: boolean;
  trigger?: React.ReactNode;
};

export function ChatModal({
  open,
  setOpen,
  isMobile,
  trigger,
}: ChatModalProps) {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isTyping, sendMessage } = useChatLogic();
  const t = useTranslations('Layout.HelpSection');
  const inputTxts = useTranslations('Inputs.placeHolders');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (inputMessage.trim()) {
      setInputMessage('');
      await sendMessage(inputMessage);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const ChatContent = (
    <>
      {/* Header */}
      <div className="bg-enjoy-primary text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Image
                src="/assets/logo.png"
                width={35}
                height={35}
                alt="Enjoy Games logo"
              />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3 className="font-semibold">{t('helpCenter')}</h3>
            <p className="text-sm text-blue-100">{t('OnlineNow')}</p>
          </div>
        </div>
        <Button
          variant="circle"
          handleClick={() => setOpen(false)}
          otherClassName="p-2 hover:bg-white hover:bg-opacity-20"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-enjoy-primary text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.sender === 'assistant' && (
                <div className="flex items-center space-x-2 mb-1">
                  <Sparkles className="w-3 h-3 text-enjoy-primary" />
                  <span className="text-xs text-gray-500 font-medium">
                    {t('assistant')}
                  </span>
                </div>
              )}
              <p className="text-sm">{message.text}</p>

              {/* روابط مصنفة حسب النوع */}
              {message.links && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'category',
                    'sub_category',
                    'product',
                    'support',
                    'order',
                  ].map((type) => {
                    const filtered = message.links!.filter(
                      (l) => l.type === type
                    );
                    if (!filtered.length) return null;

                    const title =
                      type === 'category'
                        ? 'Categories'
                        : type === 'sub_category'
                        ? 'Subcategories'
                        : type === 'product'
                        ? 'Products'
                        : type === 'support'
                        ? 'Support'
                        : 'Orders';

                    return (
                      <div
                        key={type}
                        className="bg-gray-50 p-3 rounded-xl shadow-sm"
                      >
                        <h4 className="text-sm font-semibold mb-2">{title}</h4>
                        <div className="flex flex-wrap gap-2">
                          {filtered.map((l) => (
                            <Link
                              key={l.url}
                              href={l.url}
                              target="_blank"
                              className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
                            >
                              {l.title_ar || l.title_en || l.url}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <span className="text-xs opacity-70 mt-1 block">
                {message?.timestamp?.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-2xl">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-gray-500" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={inputTxts('describeIssue')}
            otherClassNameContainer="flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            inputName="message"
            otherClassName="placeholder:text-xs sm:placeholder:text-sm"
          />
          <Button
            variant="circle"
            handleClick={handleSend}
            disabled={!inputMessage.trim()}
            otherClassName="p-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
          >
            <Send />
          </Button>
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <ResponsiveDialogDrawer
        open={open}
        setOpen={setOpen}
        isMobile
        trigger={trigger}
        contentClassName="p-0 h-[600px] flex flex-col"
      >
        {ChatContent}
      </ResponsiveDialogDrawer>
    );
  }

  return open ? (
    <div className={`fixed inset-0 z-50 flex items-end justify-start p-6`}>
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setOpen(false)}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col animate-slide-up">
        {ChatContent}
      </div>
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  ) : null;
}
