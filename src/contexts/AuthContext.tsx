import {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  memo,
} from 'react';
import { useLocalStore } from '../hooks/useLocalStorage';
import { User } from '../types/models';
import { AUTH_TABLE, USERS_TABLE } from '../lib/db';
import { USER_ALREADY_EXISTS, USER_NOT_FOUND } from '../lib/errors';
import { useUsers } from '../hooks/useUser';

export interface AuthContextType {
  currentUser?: User;
  isLoggedIn: boolean;
  isLoadingUser: boolean;
  register: (user: User) => Promise<User>;
  login: (username: string) => Promise<User>;
  logout: () => Promise<void>;
  setupCurrentUser: () => Promise<User | undefined>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>();
  const { users } = useUsers();
  const { setData: updateUsers } = useLocalStore<User[]>(USERS_TABLE);
  const { getData: getUserSession, setData: setUserSession } =
    useLocalStore<User>(AUTH_TABLE);

  const setupCurrentUser = async () => {
    setIsLoadingUser(true);
    const auth = await getUserSession();
    setCurrentUser(auth);
    setIsLoadingUser(false);
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
    setIsLoadingUser(true);
    if (findUserByUsername(user.username)) {
      throw new Error(USER_ALREADY_EXISTS);
    }

    users.push(user);

    await updateUsers(users);
    await setUserSession(user);
    await setupCurrentUser();

    setIsLoadingUser(false);

    return user;
  };

  const login = async (username: string): Promise<User> => {
    setIsLoadingUser(true);
    const user = findUserByUsername(username);

    if (!user) {
      setIsLoadingUser(false);
      throw new Error(USER_NOT_FOUND);
    }

    await setUserSession(user);
    await setupCurrentUser();
    setIsLoadingUser(false);
    return user;
  };

  const logout = async () => {
    setIsLoadingUser(true);

    await setUserSession();

    setCurrentUser(undefined);

    setIsLoadingUser(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn: !!currentUser?.username,
        isLoadingUser,
        register,
        login,
        logout,
        setupCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const SetupUser = memo(function () {
  const { setupCurrentUser } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    void setupCurrentUser();
  }, []);

  return <></>;
});

SetupUser.displayName = 'SetupUser';
