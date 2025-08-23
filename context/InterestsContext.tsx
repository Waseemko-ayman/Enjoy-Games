/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import useAPI from '@/hook/useAPI';
import { ProductCardProps } from '@/interfaces';
import { useToast } from '@/lib/toast';
import { createContext, useContext, useEffect, useState } from 'react';

type InterestsContextType = {
  addInterest: (productId: number) => Promise<void>;
  removeInterest: (productId: number) => Promise<void>;
  interests: ProductCardProps[];
  isLoading: {
    get: boolean;
    add: boolean;
    remove: boolean;
  };
  error: {
    get?: string;
    add?: string;
    remove?: string;
  };
};

const InterestsContext = createContext<InterestsContextType | undefined>(
  undefined
);

export const InterestsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    get,
    data: interestsData,
    isLoading: isLoadingGet,
    error: errorGet,
  } = useAPI('get/interests');
  const {
    add,
    isLoading: isLoadingAdd,
    error: errorAdd,
  } = useAPI('create/interest');
  const {
    remove,
    isLoading: isLoadingRemove,
    error: errorRemove,
  } = useAPI('delete/interest');
  const { showToast } = useToast();

  const [interests, setInterests] = useState<ProductCardProps[]>([]);

  const addInterest = async (id: number) => {
    setInterests((prev) => [...prev, { id } as ProductCardProps]);

    try {
      const response = await add({ product_id: id });
      showToast(response?.message);
    } catch (error: any) {
      setInterests((prev) => prev.filter((item) => item.id !== id));
      showToast(error?.response?.message, 'error');
    }
  };

  const removeInterest = async (id: number) => {
    const prevInterests = [...interests];
    setInterests((prev) => prev.filter((item) => item.id !== id));

    try {
      const response = await remove(id);
      showToast(response?.message || 'Deleted successfully');
    } catch (error: any) {
      setInterests(prevInterests);
      showToast(error?.response?.message, 'error');
    }
  };

  useEffect(() => {
    get();
  }, [get]);

  // **تحديث الحالة المحلية بعد الجلب**
  useEffect(() => {
    if (interestsData) {
      setInterests(interestsData);
    }
  }, [interestsData]);

  return (
    <InterestsContext.Provider
      value={{
        interests,
        addInterest,
        removeInterest,
        isLoading: {
          get: isLoadingGet,
          add: isLoadingAdd,
          remove: isLoadingRemove,
        },
        error: { get: errorGet, add: errorAdd, remove: errorRemove },
      }}
    >
      {children}
    </InterestsContext.Provider>
  );
};

export const useInterests = () => {
  const context = useContext(InterestsContext);
  if (!context) {
    throw new Error('useInterests must be used inside InterestsProvider');
  }
  return context;
};
