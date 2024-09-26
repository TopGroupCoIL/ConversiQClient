import Cookies from 'universal-cookie';
import { history } from '../helpers';
import { ACCESS_TOKEN, chartColors } from '../const';

export const removeAccessTokenFromCookie = () => {
  const cookies = new Cookies();

  cookies.remove(ACCESS_TOKEN);
};

export const logout = () => {
  const cookies = new Cookies();

  cookies.remove(ACCESS_TOKEN);

  history.navigate?.('/login');
};

export const generateColors = (numberOfColors: number): string[] => {
  const colors: string[] = [...chartColors];

  for (let i = 0; i < numberOfColors - chartColors.length; i++) {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    if (colors.includes(randomColor)) {
      i--;
    } else {
      colors.push(randomColor);
    }
  }

  return colors;
};
