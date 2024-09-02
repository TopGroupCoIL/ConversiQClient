import { ConfigProvider } from 'antd';
import {
  CorrectExpressionModal,
  LogoutModal,
  SaveChatModal,
  UpdateChatNameModal,
  CreateNewChatModal,
} from '../modals';

export const Modals = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
        colorBgContainer: '#f6ffed',
      },
    }}
  >
    <SaveChatModal />
    <UpdateChatNameModal />
    <CreateNewChatModal />
    <CorrectExpressionModal />
    <LogoutModal />
  </ConfigProvider>
);
