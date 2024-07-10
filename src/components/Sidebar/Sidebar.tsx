import { Flex, Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';
import { UserDropdown } from './UserDropdown';
import { SideBarHeader } from './SidebarHeader';

export const Sidebar = () => {
  const { user } = useAuthContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const selectedItem = pathname.startsWith('/admins')
    ? '/admins'
    : '/customers';

  return (
    <Layout.Sider
      className="min-h-screen shadow-[4px_0_10px_rgba(115,119,133,0.2)] p-4"
      theme="light"
    >
      <Flex justify="flex-start" align="center" vertical className="h-full">
        <SideBarHeader />
        <Menu
          items={[
            {
              label: 'Administrators',
              type: 'item',
              key: '/admins',
            },
            { label: 'Customers', type: 'item', key: '/customers' },
          ]}
          selectedKeys={[selectedItem]}
          onClick={({ key }) => {
            navigate(key);
          }}
          className="mt-16"
        ></Menu>
        <UserDropdown />
      </Flex>
    </Layout.Sider>
  );
};
