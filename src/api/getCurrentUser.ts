import { fetchData } from './';

export const getCurrentUser = async (token: string) => {
  const res = await fetchData('/current_user', undefined, undefined, token);

  const current_user = await res.json();

  return current_user;
};
