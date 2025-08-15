'use client';
import { createContext, useContext, useState } from 'react';

interface updateContentContextType {
  refreshFlag: boolean;
  triggerRefresh: () => void;
}

const updateContentContext = createContext<updateContentContextType>({
  refreshFlag: false,
  triggerRefresh: () => {},
});

export const UpdateContentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const triggerRefresh = () => setRefreshFlag((prev) => !prev);

  return (
    <updateContentContext.Provider value={{ refreshFlag, triggerRefresh }}>
      {children}
    </updateContentContext.Provider>
  );
};

export const useUpdateContent = () => useContext(updateContentContext);
