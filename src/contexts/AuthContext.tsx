import {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useCallback,
} from 'react';
import { useLocalStore } from '../hooks/useLocalStorage';
import { User } from '../types/models';
import { AUTH_TABLE, USERS_TABLE } from '../lib/db';
import { USER_ALREADY_EXISTS, USER_NOT_FOUND } from '../lib/errors';
import { useUsers } from '../hooks/useUser';

export interface AuthContextType {
  currentUser?: User;
  register: (user: User) => Promise<User>;
  login: (username: string) => Promise<User>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<User>();
  const { users } = useUsers();
  const { setData: updateUsers } = useLocalStore<User[]>(USERS_TABLE);
  const { getData: getUserSession, setData: setUserSession } =
    useLocalStore<User>(AUTH_TABLE);

  const setupCurrentUser = async () => {
    const auth = await getUserSession();
    setCurrentUser(auth);
    return auth;
  };

  const findUserByUsername = useCallback(
    (username: string) => {
      const user = users.find((userData) => userData.username === username);
      return user;
    },
    [users]
  );

  const register = async (user: User): Promise<User> => {
    if (findUserByUsername(user.username)) {
      throw new Error(USER_ALREADY_EXISTS);
    }

    users.push(user);

    await updateUsers(users);
    await setUserSession(user);
    await setupCurrentUser();

    return user;
  };

  const login = async (username: string): Promise<User> => {
    const user = findUserByUsername(username);

    if (!user) {
      throw new Error(USER_NOT_FOUND);
    }

    await setUserSession(user);
    return user;
  };

  useEffect(() => {
    void setupCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
