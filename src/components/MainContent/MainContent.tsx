import { Layout } from 'antd';
import { RoutesComponent } from '../../routes';

const { Content } = Layout;

export const MainContent = () => {
  return (
    <Content className="relative w-full h-full">
      <RoutesComponent />
    </Content>
  );
};
