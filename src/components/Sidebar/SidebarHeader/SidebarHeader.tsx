import { Flex } from 'antd';

type SideBarHeaderProps = {
  isSidebarCollapsed: boolean;
};

export const SideBarHeader = ({ isSidebarCollapsed }: SideBarHeaderProps) => {
  return (
    <Flex>
      <span className="text-4xl text-center mt-4 mb-8">
        {isSidebarCollapsed ? 'CQ' : 'ConversiQ'}
      </span>
    </Flex>
  );
};
