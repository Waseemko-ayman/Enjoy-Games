import React, { useState } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { ChatModal } from '../molecules/ChatModal';

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  const handleOpen = () => {
    setIsOpen(true);
    setHasNotification(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={handleOpen}
          className={`
            relative group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
            text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-105
            ${hasNotification ? 'animate-pulse' : ''}
          `}
          style={{
            animation: hasNotification
              ? 'float 2s ease-in-out infinite'
              : 'none',
          }}
        >
          {/* Notification Badge */}
          {hasNotification && (
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
          )}
          {hasNotification && (
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full"></div>
          )}

          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Icon */}
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
          </div>
        </button>
      </div>

      {/* Chat Modal */}
      <ChatModal isOpen={isOpen} onClose={handleClose} />

      {/* Custom Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-5px) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) rotate(-1deg);
          }
        }
      `}</style>
    </>
  );
}
