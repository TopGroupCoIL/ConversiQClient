import { Button, Flex, Layout, Tooltip } from 'antd';
import { useAuthContext } from '../../context/auth';
import { UserDropdown } from './UserDropdown';
import { SideBarHeader } from './SidebarHeader';
import {
  CommentOutlined,
  DatabaseOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMINISTRATION_PATH } from '../../const';
import { useChat } from '../../context/chat';
import { useModals } from '../../context/modals';
import { SavedChats } from './SavedChats';
import { fetchData } from '../../api';
import { SavedChat } from '../../types';

export const Sidebar = () => {
  const { user } = useAuthContext();
  const { openModal, setActiveItem } = useModals();
  const { currentChat, startNewChat, saveChat } = useChat();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // const [collapsed, setCollapsed] = useState(false); // to change in future
  const collapsed = false;

  const isAdministrationPage = pathname.includes(ADMINISTRATION_PATH);

  if (!user) {
    return null;
  }

  const onNew = () => {
    setActiveItem({
      isHistorySaved: !!currentChat?.isHistorySaved,
      onLeave: () => {
        startNewChat();
      },
      saveChat: async () => {
        const res = await fetchData(
          `/customers/chats/save/${currentChat!.name}`,
          'PUT',
        );

        if (res.ok) {
          const savedChat = (await res.json()) as SavedChat;

          saveChat(savedChat);
        }
      },
    });

    openModal('CreateNewChatModal');
  };

  const renderDefaultItems = () => (
    <>
      {collapsed ? (
        <Tooltip placement="right" title="New">
          <Button
            type="text"
            style={{ fontSize: 16 }}
            icon={<PlusCircleOutlined />}
            disabled={!currentChat}
            onClick={onNew}
          >
            {collapsed ? '' : 'New'}
          </Button>
        </Tooltip>
      ) : (
        <Button
          type="text"
          style={{ fontSize: 16 }}
          icon={<PlusCircleOutlined />}
          onClick={onNew}
          disabled={!currentChat}
        >
          New
        </Button>
      )}
      <Button type="text" style={{ fontSize: 16 }} icon={<CommentOutlined />}>
        {collapsed ? '' : 'Saved'}
      </Button>
    </>
  );

  const renderAdminItems = () => (
    <>
      <Button
        type="text"
        style={{ fontSize: 16 }}
        icon={<DatabaseOutlined />}
        onClick={() => {
          navigate(`${ADMINISTRATION_PATH}/dataSources`);
        }}
      >
        {collapsed ? '' : 'Data sources'}
      </Button>
      <Button
        type="text"
        style={{ fontSize: 16 }}
        icon={<UserOutlined />}
        onClick={() => {
          navigate(`${ADMINISTRATION_PATH}/users`);
        }}
      >
        {collapsed ? '' : 'Users'}
      </Button>
    </>
  );

  const renderBottomItems = () =>
    isAdministrationPage ? (
      <>
        <Button
          type="text"
          style={{ fontSize: 16 }}
          icon={<SettingOutlined />}
          onClick={() => {
            navigate(`${ADMINISTRATION_PATH}/settings`);
          }}
        >
          {collapsed ? '' : 'Settings'}
        </Button>
        <Button
          type="text"
          style={{ fontSize: 16 }}
          icon={<CommentOutlined />}
          onClick={() => {
            navigate(`${ADMINISTRATION_PATH}/support`);
          }}
        >
          {collapsed ? '' : 'Support'}
        </Button>
      </>
    ) : (
      <>
        <Button
          type="text"
          style={{ fontSize: 16 }}
          icon={<QuestionCircleOutlined />}
        >
          {collapsed ? '' : 'Help'}
        </Button>
        {user.isAdmin && (
          <Button
            type="text"
            style={{ fontSize: 16 }}
            icon={<SettingOutlined />}
            onClick={() => {
              navigate('/administration');
            }}
          >
            {collapsed ? '' : 'Administration'}
          </Button>
        )}
      </>
    );

  return (
    <Layout.Sider
      className="min-h-screen shadow-[4px_0_10px_rgba(115,119,133,0.2)] p-8 z-10"
      theme="light"
      width={240}
      collapsed={collapsed}
    >
      <div className="w-full h-full grid grid-cols-1 grid-rows-[auto_auto_1fr_auto]">
        <SideBarHeader isSidebarCollapsed={collapsed} />
        {/* <Button
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        /> */}
        <Flex
          vertical
          className="w-full h-20 mb-4"
          justify="space-between"
          align={collapsed ? 'center' : 'flex-start'}
        >
          {isAdministrationPage ? renderAdminItems() : renderDefaultItems()}
        </Flex>
        <SavedChats />
        <Flex
          vertical
          className="w-full h-32 mt-8 mb-10"
          justify="space-between"
          align={collapsed ? 'center' : 'flex-start'}
        >
          {renderBottomItems()}
          <UserDropdown isSidebarCollapsed={collapsed} />
        </Flex>
      </div>
    </Layout.Sider>
  );
};
