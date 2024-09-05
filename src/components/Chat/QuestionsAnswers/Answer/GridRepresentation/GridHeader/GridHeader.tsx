import { Button, Dropdown, Flex, MenuProps } from 'antd';
import {
  BarChartOutlined,
  MoreOutlined,
  ShareAltOutlined,
  TableOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { ActionType, DisplayType } from '../../../../../../types';

type GridHeaderProps = {
  dataDescription: string;
  onMenuItemClick: (key: string) => void;
};

export const GridHeader = ({
  dataDescription,
  onMenuItemClick,
}: GridHeaderProps) => {
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    onMenuItemClick(e.key);
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <Flex justify="space-between" className="w-16">
          Table <TableOutlined />
        </Flex>
      ),
      key: DisplayType.table,
    },
    {
      label: (
        <Flex justify="space-between" className="w-16">
          Bar <BarChartOutlined />
        </Flex>
      ),
      key: DisplayType.bar,
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Flex justify="space-between" className="w-16">
          Share <ShareAltOutlined />
        </Flex>
      ),
      key: ActionType.share,
    },
    {
      label: (
        <Flex justify="space-between" className="w-16">
          Export <UploadOutlined />
        </Flex>
      ),
      key: ActionType.export,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Flex align="center" justify="space-between" className="mb-4">
      <span className="w-3/4 font-bold text-base">{dataDescription}</span>
      <Dropdown menu={menuProps} className="block ml-full">
        <Button type="text" icon={<MoreOutlined />} />
      </Dropdown>
    </Flex>
  );
};
