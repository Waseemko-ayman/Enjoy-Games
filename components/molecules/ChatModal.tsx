import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import { useChatLogic } from '@/hook/useChatLogic';
import Button from '../atomic/Button';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isTyping, sendMessage } = useChatLogic();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Chat Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col animate-slide-up">
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
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-sm text-blue-100">Online now</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
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
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
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
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button
              handleClick={handleSend}
              disabled={!inputMessage.trim()}
              otherClassName="p-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </Button>
            {/* <button className="bg-enjoy-primary hover:bg-enjoy-primary-light  text-white p-3 rounded-full transition-all duration-200 transform "></button> */}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
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
  );
}
