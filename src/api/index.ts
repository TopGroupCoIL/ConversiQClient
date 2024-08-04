import Cookies from 'universal-cookie';
import { ACCESS_TOKEN } from '../const';

const cookies = new Cookies();

export const fetchData = async (
  url: string,
  method: string = 'GET',
  body: BodyInit | null | undefined = null,
  accessToken?: string,
) => {
  const token = accessToken || cookies.get(ACCESS_TOKEN);

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api${url}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      body,
    });

    if (res.ok) {
      return res;
    }

    if (res.status === 401) {
      window.location.href = '/login?expiredSession=true';
    }

    throw new Error();
  } catch (error) {
    throw new Error('Something went wrong while getting the data.');
  }
};
