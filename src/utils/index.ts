import Cookies from 'universal-cookie';
import { history } from '../helpers';
import { ACCESS_TOKEN } from '../const';

export const removeAccessTokenFromCookie = () => {
  const cookies = new Cookies();

  cookies.remove(ACCESS_TOKEN);
};

export const logout = () => {
  const cookies = new Cookies();

  cookies.remove(ACCESS_TOKEN);

  history.navigate?.('/login');
};
