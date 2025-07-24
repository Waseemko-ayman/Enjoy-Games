import {
  gamingPlatforms,
  digitalStores,
  servicesAndSubscriptions,
  shoppingCarts,
} from '@/data';
import { CardItem } from '@/interfaces';

export const getCategoryData = (category: string) => {
  const dataMap: Record<string, CardItem[]> = {
    'digital-stores': digitalStores,
    'games-platforms': gamingPlatforms,
    services: servicesAndSubscriptions,
    'shop-cards': shoppingCarts,
  };

  return dataMap[category] || [];
};

export const getItemData = (
  category: string,
  itemId: string,
  accountId?: string
): CardItem | undefined => {
  const items = getCategoryData(category);
  const item = items.find((item) => item.id === itemId);

  if (!item) return undefined;

  if (accountId && 'accounts' in item && Array.isArray(item.accounts)) {
    const account = item.accounts.find((acc) => acc.id === accountId);
    if (account) {
      return {
        ...item,
        ...account,
        accountId,
      };
    }
  }

  return item;
};

