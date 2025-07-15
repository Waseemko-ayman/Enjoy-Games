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
  categorySlug: string,
  itemId: string
): CardItem | undefined => {
  const items = getCategoryData(categorySlug);
  return items.find((item) => item.id === itemId);
};
