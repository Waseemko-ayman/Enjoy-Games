/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslations } from 'next-intl';
import useAPI from './useAPI';
import { useCallback, useState } from 'react';

export interface Message {
  id: string;
  text: string; // نص الرسالة
  sender: 'user' | 'assistant';
  timestamp: Date;
  unique_id?: string;
  links?: ChatLinkItem[];
}

interface Price {
  amount: number;
  currency: string;
  formatted: string;
}

interface CategoryOrSubCategory {
  name_ar: string;
  name_en: string;
  url: string;
}

interface Product {
  title_ar: string;
  title_en: string;
  price: Price;
  url: string;
}

export type ChatLinkItem = {
  url: string;
  title_ar?: string;
  title_en?: string;
  type: 'category' | 'sub_category' | 'product' | 'support' | 'order';
};

interface ChatLinks {
  orders: any[];
  categories: CategoryOrSubCategory[];
  sub_categories: CategoryOrSubCategory[];
  products: Product[];
  support: any[];
}

interface ChatAPIResponse {
  answer: string;
  from_cache: boolean;
  links: ChatLinks;
}

export function useChatLogic() {
  const { add } = useAPI('assistant/ask');
  const t = useTranslations('Messages');

  const uniqueId =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('unique_id') || ''
      : '';

  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = JSON.parse(localStorage.getItem('messages') || '[]').map(
        (m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })
      );
      return saved;
    }
    return [
      {
        id: '1',
        text: t('welcomeMessage'),
        sender: 'assistant',
        timestamp: new Date(),
        unique_id: uniqueId,
      },
    ];
  });

  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(
    async (text: string) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'user',
        timestamp: new Date(),
        unique_id: uniqueId,
      };
      setMessages((prev) => {
        const updated = [...prev, userMessage];
        localStorage.setItem('messages', JSON.stringify(updated));
        return updated;
      });

      setIsTyping(true);

      try {
        const response = await add({
          question: text,
          unique_id: uniqueId,
        });

        const data: ChatAPIResponse = response as unknown as ChatAPIResponse;

        const linksByType: ChatLinkItem[] = [
          ...(data.links?.categories ?? []).map((l) => ({
            url: l.url,
            title_ar: l.name_ar,
            title_en: l.name_en,
            type: 'category' as const, // Using as const here tells TypeScript that this type is not a generic string, but the exact value.
          })),
          ...(data.links?.sub_categories ?? []).map((l) => ({
            url: l.url,
            title_ar: l.name_ar,
            title_en: l.name_en,
            type: 'sub_category' as const, // Using as const....
          })),
          ...(data.links?.products ?? []).map((l) => ({
            url: l.url,
            title_ar: l.title_ar,
            title_en: l.title_en,
            type: 'product' as const, // Using as const....
          })),
          ...(data.links?.support ?? []).map((l: any) => ({
            url: l.url,
            title_ar: l.name_ar,
            title_en: l.name_en,
            type: 'support' as const, // Using as const....
          })),
          ...(data.links?.orders ?? []).map((l: any) => ({
            url: l.url,
            title_ar: l.name_ar,
            title_en: l.name_en,
            type: 'order' as const, // Using as const....
          })),
        ];

        const markdownLinksRegex =
          /\d*\.\s*\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
        const extractedLinks: ChatLinkItem[] = [];
        let match;
        let cleanText = data.answer;

        while ((match = markdownLinksRegex.exec(data.answer)) !== null) {
          extractedLinks.push({
            title_ar: match[1],
            url: match[2],
            type: 'category',
          });
          // إزالة الرابط من النص
          cleanText = cleanText.replace(match[0], match[1]);
        }

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: cleanText,
          links: [...linksByType, ...extractedLinks],
          sender: 'assistant',
          timestamp: new Date(),
          unique_id: uniqueId,
        };

        setMessages((prev) => {
          const updated = [...prev, aiMessage];
          localStorage.setItem('messages', JSON.stringify(updated));
          return updated;
        });
      } catch (error: any) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text:
            error?.response?.message ||
            'Something went wrong. Please try again later.',
          sender: 'assistant',
          timestamp: new Date(),
          unique_id: uniqueId,
        };
        setMessages((prev) => [...prev, aiMessage]);
        console.log(error);
      } finally {
        setIsTyping(false);
      }
    },
    [add, uniqueId]
  );

  return {
    messages,
    isTyping,
    sendMessage,
  };
}
