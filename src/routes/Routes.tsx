import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Login, Sidebar, Chat, NotFound } from '../components';
import Cookies from 'universal-cookie';
import {
  ACCESS_TOKEN,
  ADMINISTRATION_DATA_SOURCES_PATH,
  ADMINISTRATION_PATH,
  ADMINISTRATION_SETTINGS_PATH,
  ADMINISTRATION_SUPPORT_PATH,
  ADMINISTRATION_USERS_PATH,
  LOGIN_PATH,
} from '../const';
import { Layout } from 'antd';
import { Administration } from '../components/Administration';
import { DataSources } from '../components/Administration/DataSources';
import { Users } from '../components/Administration/Users';
import { Support } from '../components/Administration/Support';
import { Settings } from '../components/Administration/Settings';
import { useChat } from '../context/chat';

const PrivateRoutes = () => {
  const cookies = new Cookies();

  const { currentChat } = useChat();

  return cookies.get(ACCESS_TOKEN) ? (
    <Layout className={`w-full h-full bg-babyPowder ${!currentChat && ''}`}>
      <Sidebar />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  ) : (
    <Navigate to="login" state={{ noAccessToken: true }} replace={true} />
  );
};

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route index element={<Chat />} />
        <Route path={ADMINISTRATION_PATH} element={<Administration />}>
          <Route
            index
            path={ADMINISTRATION_DATA_SOURCES_PATH}
            element={<DataSources />}
          />
          <Route path={ADMINISTRATION_USERS_PATH} element={<Users />} />
          <Route path={ADMINISTRATION_SETTINGS_PATH} element={<Settings />} />
          <Route path={ADMINISTRATION_SUPPORT_PATH} element={<Support />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path={LOGIN_PATH} element={<Login />} />
    </Routes>
  );
};
