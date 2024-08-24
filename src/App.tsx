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
          <MainContent />
          <Modals />
        </ChatProvider>
      </ModalsProvider>
    </AuthProvider>
  );
};
