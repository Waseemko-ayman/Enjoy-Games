import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const predefinedResponses = {
  greetings: [
    "Hello! I'm your AI assistant. How can I help you today?",
    "Hi there! I'm here to assist you with any questions you might have.",
    "Welcome! I'm ready to help. What would you like to know?",
  ],
  help: [
    'I can help you with various topics including general questions, product information, troubleshooting, and more. What specifically would you like assistance with?',
    "I'm here to provide support and answer your questions. Feel free to ask me anything!",
    'I can assist with a wide range of topics. What would you like to explore today?',
  ],
  features: [
    'I can help you with product information, answer questions, provide recommendations, and assist with troubleshooting. What interests you most?',
    'My capabilities include answering questions, providing information, helping with decisions, and offering support. How can I assist you today?',
  ],
  pricing: [
    "I'd be happy to help you with pricing information. Could you please specify which product or service you're interested in?",
    'For detailed pricing information, I can guide you to the right resources or answer specific questions about our offerings.',
  ],
  support: [
    "I'm here to provide support! Please describe the issue you're experiencing and I'll do my best to help you resolve it.",
    'I can help troubleshoot problems and provide solutions. What specific issue are you facing?',
  ],
  default: [
    "That's an interesting question! While I'd love to help with that, I might need a bit more context. Could you elaborate?",
    "I'm not quite sure about that specific topic, but I'm here to help however I can. Could you provide more details?",
    'I want to make sure I give you the best answer possible. Could you rephrase your question or provide more information?',
  ],
};

export function useChatLogic() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. I'm here to help you with questions about our products, services, and provide general support. How can I assist you today?",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const getResponse = useCallback((userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (
      message.includes('hello') ||
      message.includes('hi') ||
      message.includes('hey')
    ) {
      return predefinedResponses.greetings[
        Math.floor(Math.random() * predefinedResponses.greetings.length)
      ];
    }

    if (
      message.includes('help') ||
      message.includes('assist') ||
      message.includes('support')
    ) {
      return predefinedResponses.help[
        Math.floor(Math.random() * predefinedResponses.help.length)
      ];
    }

    if (
      message.includes('feature') ||
      message.includes('capability') ||
      message.includes('what can you do')
    ) {
      return predefinedResponses.features[
        Math.floor(Math.random() * predefinedResponses.features.length)
      ];
    }

    if (
      message.includes('price') ||
      message.includes('cost') ||
      message.includes('pricing')
    ) {
      return predefinedResponses.pricing[
        Math.floor(Math.random() * predefinedResponses.pricing.length)
      ];
    }

    if (
      message.includes('problem') ||
      message.includes('issue') ||
      message.includes('error')
    ) {
      return predefinedResponses.support[
        Math.floor(Math.random() * predefinedResponses.support.length)
      ];
    }

    return predefinedResponses.default[
      Math.floor(Math.random() * predefinedResponses.default.length)
    ];
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      // Simulate AI response delay
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 1000)
      );

      // Add AI response
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(text),
        sender: 'assistant',
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiResponse]);
    },
    [getResponse]
  );

  return {
    messages,
    isTyping,
    sendMessage,
  };
}
