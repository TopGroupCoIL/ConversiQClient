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

export const Sidebar = () => {
  const { user } = useAuthContext();
  const { openModal, setActiveItem } = useModals();
  const { currentChat, /*isCurrentChatSaved*/ chats, startNewChat, saveChat } =
    useChat();

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
      onLeave: () => {
        startNewChat();
      },
      saveChat,
    });

    openModal('CreateNewChatModal');
  };

  const onSavedChatClick = (chatName: string) => {
    setActiveItem({
      onLeave: () => {
        startNewChat(chatName);
      },
      saveChat,
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
      <Flex
        justify={collapsed ? 'center' : 'flex-start'}
        align="center"
        vertical
        className="h-full"
      >
        <SideBarHeader isSidebarCollapsed={collapsed} />
        {/* <Button
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        /> */}
        <Flex
          vertical
          className="w-full h-20 mt-4 mb-4"
          justify="space-between"
          align={collapsed ? 'center' : 'flex-start'}
        >
          {isAdministrationPage ? renderAdminItems() : renderDefaultItems()}
        </Flex>
        <SavedChats
          chats={chats}
          currentChatName={currentChat?.name}
          onChatClick={onSavedChatClick}
          onDeleteChatClick={() => {}}
        />
        <Flex
          vertical
          className="w-full h-32 mt-auto mb-16"
          justify="space-between"
          align={collapsed ? 'center' : 'flex-start'}
        >
          {renderBottomItems()}
          <UserDropdown isSidebarCollapsed={collapsed} />
        </Flex>
      </Flex>
    </Layout.Sider>
  );
};
