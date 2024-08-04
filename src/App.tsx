import { Layout } from 'antd';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent/MainContent';
import { AuthProvider } from './context/auth';
import { ModalsProvider } from './context/modals';
import { Modals } from './components/Modals';

export const App = () => {
  return (
    <AuthProvider>
      <ModalsProvider>
        <Layout className="w-full h-full bg-white">
          <Sidebar />
          <MainContent />
        </Layout>
        <Modals />
      </ModalsProvider>
    </AuthProvider>
  );
};
