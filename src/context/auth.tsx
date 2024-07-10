import {
  useState,
  useContext,
  useCallback,
  useMemo,
  createContext,
  useEffect,
} from 'react';
import { getCurrentUser } from '../api/getCurrentUser';
import { User } from '../types';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN } from '../const';

interface IAuthContext {
  user: User | null;
  checkUser: (accessToken: string) => void;
  getUser: (accessToken: string) => Promise<User | null>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserData] = useState<User | null>(null);

  const cookies = new Cookies();
  const accessToken = cookies.get(ACCESS_TOKEN);

  const checkUser = async (accessToken: string) => {
    const user = await getUser(accessToken);

    if (user) {
      const decodedToken = jwtDecode(accessToken);
      const expirationDate = new Date(decodedToken.exp! * 1000);

      cookies.set(ACCESS_TOKEN, accessToken, {
        expires: expirationDate,
      });

      setUser(user);
    }
  };

  const getUser = useCallback(async (access_token: string) => {
    try {
      const user = await getCurrentUser(access_token);

      setUser(user);

      return user;
    } catch (error) {
      setUser(null);
    }
  }, []);

  const setUser = useCallback((user: User | null) => {
    setUserData(user);
  }, []);

  useEffect(() => {
    const setUserWithToken = async (accessToken: string) => {
      const user = await getUser(accessToken);

      setUser(user);
    };

    if (!user && accessToken) {
      setUserWithToken(accessToken);
    }
  }, [accessToken]);

  const appState = useMemo(
    () => ({
      user,
      checkUser,
      getUser,
      setUser,
    }),
    [user, getUser, setUser],
  );

  return (
    <AuthContext.Provider value={appState}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('There is no context provided');
  }

  return context;
};
