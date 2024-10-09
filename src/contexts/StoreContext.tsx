import { createContext } from 'react';
import { currentUser } from 'services/mocks/user';

interface StoreContextType {
  currentUser: any;
}

export const StoreContext = createContext<StoreContextType>({
  currentUser,
});
