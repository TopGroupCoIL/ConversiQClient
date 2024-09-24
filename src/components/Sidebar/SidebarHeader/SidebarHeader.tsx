import { Flex } from 'antd';

type SideBarHeaderProps = {
  isSidebarCollapsed: boolean;
};

export const SideBarHeader = ({ isSidebarCollapsed }: SideBarHeaderProps) => {
  return (
    <Flex justify="center" align="center" className="mb-8">
      <span className="text-4xl text-center">
        {isSidebarCollapsed ? 'CQ' : 'ConversiQ'}
      </span>
    </Flex>
  );
};
