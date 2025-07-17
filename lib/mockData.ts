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

export const getItemData = async (
  category: string,
  itemId: string
): Promise<CardItem | undefined> => {
  const items = await getCategoryData(category);
  return items.find((item) => item.id === itemId);
};
