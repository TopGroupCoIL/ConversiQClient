import { ConfigProvider } from 'antd';
import { Chart, CategoryScale } from 'chart.js/auto';

import { MainContent } from './components/MainContent/MainContent';
import { AuthProvider } from './context/auth';
import { ModalsProvider } from './context/modals';
import { Modals } from './components/Modals';
import { ChatProvider } from './context/chat';

Chart.register(CategoryScale);

export const App = () => {
  return (
    <AuthProvider>
      <ModalsProvider>
        <ChatProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#00b96b',
              },
              components: {
                Table: {
                  headerBg: '#E6FCE1',
                  lineWidth: 1,
                  borderColor: '#DBDBDB',
                },
              },
            }}
          >
            <MainContent />
            <Modals />
          </ConfigProvider>
        </ChatProvider>
      </ModalsProvider>
    </AuthProvider>
  );
};
