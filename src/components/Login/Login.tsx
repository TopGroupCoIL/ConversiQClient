import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';
import { Button, Typography, Layout, Alert } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { ACCESS_TOKEN, expiredSession } from '../../const';
import { removeAccessTokenFromCookie } from '../../utils';
import Cookies from 'universal-cookie';

const { Title } = Typography;

const msLoginLink = `${import.meta.env.VITE_BASE_URL}/Auth/microsoft-login`;

export const Login = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getUser } = useAuthContext();

  const [isLogging, setLogging] = useState(false);

  const accessTokenInSearch = searchParams.get('access_token');
  const expiredSessionInSearch = searchParams.get(expiredSession);

  const cookies = new Cookies();

  const proceedWithTokenFromUrl = useCallback(async () => {
    setLogging(true);

    const user = await getUser(accessTokenInSearch!);

    user && cookies.set(ACCESS_TOKEN, accessTokenInSearch);

    setLogging(false);

    user && navigate('/');
  }, []);

  useEffect(() => {
    if (expiredSessionInSearch) {
      removeAccessTokenFromCookie();
    }

    if (accessTokenInSearch) {
      proceedWithTokenFromUrl();
    } else {
      !state?.logout && cookies.get(ACCESS_TOKEN) && navigate('/');
    }
  }, []);

  return (
    <Layout className="relative w-full h-full flex justify-center items-center">
      <Title className="text-center font-arialRoundedMTBold">
        ConversiQ
        <br />
        By Panorama
      </Title>
      <Button
        size="large"
        icon={<LoginOutlined />}
        iconPosition="end"
        href={msLoginLink}
        loading={isLogging}
        disabled={isLogging}
        className="font-inter"
      >
        Login
      </Button>
      {expiredSessionInSearch && (
        <Alert
          message="Session expired"
          description="You have been logged out."
          type="info"
          showIcon
          className="absolute	 left-16 bottom-16"
        />
      )}
    </Layout>
  );
};
