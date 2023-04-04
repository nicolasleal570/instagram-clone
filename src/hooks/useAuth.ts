import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';

export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}
