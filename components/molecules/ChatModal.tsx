'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import { useChatLogic } from '@/hook/useChatLogic';
import Button from '../atomic/Button';
import ResponsiveDialogDrawer from '../organism/ResponsiveDialogDrawer';
import Input from '../atomic/Input';
import { useTranslations } from 'next-intl';

interface ChatModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  isMobile: boolean;
  trigger?: React.ReactNode;
}

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
      await sendMessage(inputMessage);
      setInputMessage('');
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
              <Bot className="w-5 h-5" />
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
                    AI Assistant
                  </span>
                </div>
              )}
              <p className="text-sm">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString([], {
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
