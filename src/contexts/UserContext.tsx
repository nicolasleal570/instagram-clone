import { useEffect, useState, createContext, ReactNode } from 'react';
import { useLocalStore } from '../hooks/useLocalStorage';
import { User } from '../types/models';
import { USERS_TABLE } from '../lib/db';

export interface UserContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export type UserContextValueType = Partial<UserContextType>;

interface UserContextProviderProps {
  children: ReactNode;
  value?: UserContextValueType; // For tests purpose
}

export const UserContext = createContext<
  UserContextType | Partial<UserContextType> | null
>(null);

export function UserContextProvider({
  children,
  value,
}: UserContextProviderProps) {
  const [users, setUsers] = useState<User[]>([]);
  const { getData } = useLocalStore<User[]>(USERS_TABLE);

  const getAllUsers = async () => {
    const data = await getData();
    setUsers(data ?? []);
  };

  useEffect(() => {
    void getAllUsers();
  }, []);

  return (
    <UserContext.Provider
      value={
        value ?? {
          users,
          setUsers,
        }
      }
    >
      {children}
    </UserContext.Provider>
  );
}
