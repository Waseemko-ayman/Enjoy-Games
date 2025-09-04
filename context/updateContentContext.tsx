'use client';
import { createContext, useContext, useState } from 'react';

interface UpdateContentContextType {
  refreshFlags: { [key: string]: boolean };
  triggerRefresh: (key: string) => void;
}

const UpdateContentContext = createContext<UpdateContentContextType>({
  refreshFlags: {},
  triggerRefresh: () => {},
});

export const UpdateContentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [refreshFlags, setRefreshFlags] = useState<{ [key: string]: boolean }>(
    {}
  );

  const triggerRefresh = (key: string) => {
    setRefreshFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <UpdateContentContext.Provider value={{ refreshFlags, triggerRefresh }}>
      {children}
    </UpdateContentContext.Provider>
  );
};

export const useUpdateContent = () => useContext(UpdateContentContext);
