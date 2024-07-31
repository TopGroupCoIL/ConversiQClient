import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { useModals } from '../../../context/modals';
import { useAuthContext } from '../../../context/auth';

type UserDropdownProps = {
  isSidebarCollapsed: boolean;
};

export const UserDropdown = ({ isSidebarCollapsed }: UserDropdownProps) => {
  const { openModal } = useModals();
  const { user } = useAuthContext();

  const items: MenuProps['items'] = [
    {
      label: (
        <Button
          size="large"
          icon={<LogoutOutlined />}
          iconPosition="end"
          danger
          onClick={() => {
            openModal('LogoutModal');
          }}
        >
          {isSidebarCollapsed ? '' : 'Logout'}
        </Button>
      ),
      key: 'logout',
    },
  ];

  return (
    <Dropdown menu={{ items }} className="bg-white">
      <Space>
        <Button type="text" style={{ fontSize: 16 }} icon={<UserOutlined />}>
          {isSidebarCollapsed ? '' : user?.name}
        </Button>
      </Space>
    </Dropdown>
  );
};
