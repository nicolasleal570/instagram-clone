import { useContext } from 'react';
import { UserContext, UserContextType } from '../contexts/UserContext';

export function useUsers() {
  return useContext(UserContext) as UserContextType;
}
