import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';
import { Button, Typography, Layout } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { useCallback, useEffect } from 'react';
import {
  ACCESS_TOKEN,
  ADMINS_PATH,
  expiredSession,
  msLoginLink,
} from '../../const';
import { removeAccessTokenFromCookie } from '../../utils';
import Cookies from 'universal-cookie';

const { Title } = Typography;

export const Login = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getUser } = useAuthContext();

  const accessTokenInSearch = searchParams.get('access_token');
  const expiredSessionInSearch = searchParams.get(expiredSession);

  const cookies = new Cookies();

  const proceedWithTokenFromUrl = useCallback(async () => {
    // if (isValidTokenFromCookie()) {
    //   return navigate(ADMINS_PATH);
    // }

    if (accessTokenInSearch) {
      const user = await getUser(accessTokenInSearch);
      user && cookies.set(ACCESS_TOKEN, accessTokenInSearch);
      user && navigate(ADMINS_PATH);
    }
  }, []);

  useEffect(() => {
    if (expiredSessionInSearch) {
      removeAccessTokenFromCookie();
    }

    if (accessTokenInSearch) {
      proceedWithTokenFromUrl();
    } else {
      !state?.logout && cookies.get(ACCESS_TOKEN) && navigate(ADMINS_PATH);
    }
  }, []);

  return (
    <Layout className="w-full h-full flex justify-center items-center">
      <Title className="text-center">
        ConversiQ
        <br />
        By Panorama
      </Title>
      {/* {
        expiredSessionInSearch ? <h1>{expiredSessionText}</h1> : null
      } */}
      <Button
        size="large"
        icon={<LoginOutlined />}
        iconPosition="end"
        href={msLoginLink}
      >
        Login
      </Button>
    </Layout>
  );
};
