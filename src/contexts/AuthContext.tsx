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
  updateProfile: (data: User) => Promise<void>;
}

export type AuthContextValueType = Partial<AuthContextType>;

interface AuthContextProviderProps {
  children: ReactNode;
  value?: AuthContextValueType;
}

export const AuthContext = createContext<
  AuthContextType | Partial<AuthContextType> | null
>(null);

export function AuthContextProvider({
  children,
  value,
}: AuthContextProviderProps) {
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>();
  const { users, setUsers } = useUsers();
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

  const updateProfile = async (data: User) => {
    const userIndex = users.findIndex(
      (item) => item.username === currentUser?.username
    );

    const updatedUser = {
      ...currentUser,
      ...data,
      avatar: !data.avatar?.includes('ui-avatars')
        ? data.avatar
        : `https://ui-avatars.com/api/?name=${`${data.name}+${data.surname}`}`,
    };

    const newUsers: User[] = [
      ...users.slice(0, userIndex),
      updatedUser,
      ...users.slice(userIndex + 1),
    ];

    await updateUsers(newUsers);
    await setUserSession(updatedUser);
    setUsers(newUsers);
    setCurrentUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={
        value ?? {
          currentUser,
          isLoggedIn: !!currentUser?.username,
          isLoadingUser,
          register,
          login,
          logout,
          setupCurrentUser,
          updateProfile,
        }
      }
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
