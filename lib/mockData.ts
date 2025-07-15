import {
  gamingPlatforms,
  digitalStores,
  servicesAndSubscriptions,
  shoppingCarts,
} from '@/data';

export const getCategoryData = (category: string) => {
  const dataMap: Record<string, any> = {
    'digital-stores': digitalStores,
    'games-platforms': gamingPlatforms,
    services: servicesAndSubscriptions,
    'shop-cards': shoppingCarts,
  };

  return dataMap[category] || [];
};

export const getItemData = (categorySlug: string, itemId: string) => {
  const items = getCategoryData(categorySlug);
  return items.find((item: any) => item.id === itemId);
};
