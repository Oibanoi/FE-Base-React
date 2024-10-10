import { userHooks } from 'hooks';
import { IUser } from 'interfaces/user';
import { createContext, useEffect } from 'react';

interface StoreContextType {
  loading?: boolean;
  user?: IUser;
  refresh?: () => Promise<void>;
  clear?: () => void;
}

export const StoreContext = createContext<StoreContextType>({
  loading: true,
} as StoreContextType);

export interface StoreProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const { user, actionLoading, getme } = userHooks.useUser();
  useEffect(() => {
    // getAll();
    getme();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        user,
        loading: actionLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
