import { Admins } from '../components/Admins';
import { Customers } from '../components/Customers';
import { CustomerUsers } from '../components/Customers/CustomerUsers';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Login } from '../components/Login';
import Cookies from 'universal-cookie';
import {
  ACCESS_TOKEN,
  ADMINS_PATH,
  CUSTOMERS_PATH,
  LOGIN_PATH,
} from '../const';

const PrivateRoutes = () => {
  const cookies = new Cookies();

  return cookies.get(ACCESS_TOKEN) ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={{ noAccessToken: true }} replace={true} />
  );
};

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route index element={<Admins />} />
        <Route path={ADMINS_PATH} element={<Admins />} />
        <Route path={CUSTOMERS_PATH} element={<Customers />} />
        <Route
          path={`${CUSTOMERS_PATH}/:customerId`}
          element={<CustomerUsers />}
        />
      </Route>

      <Route path={LOGIN_PATH} element={<Login />} />
    </Routes>
  );
};
