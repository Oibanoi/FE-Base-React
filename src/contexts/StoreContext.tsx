import { IUser } from 'interfaces/user';
import { createContext } from 'react';

interface StoreContextType {
  loading?: boolean;
  user?: IUser;
  refresh?: () => Promise<void>;
  clear?: () => void;
}

export const StoreContext = createContext<StoreContextType>({
  loading: true,
  user: undefined,
} as StoreContextType);

export interface StoreProviderProps {
  children: React.ReactNode;
}
