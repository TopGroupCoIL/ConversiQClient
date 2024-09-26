import { Button, Dropdown, Flex, MenuProps } from 'antd';
import {
  BarChartOutlined,
  LineChartOutlined,
  MoreOutlined,
  PieChartOutlined,
  TableOutlined,
  // ShareAltOutlined,
  // UploadOutlined,
} from '@ant-design/icons';
import { /* ActionType, */ PresentationType } from '../../../../../../types';

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
      label: 'Table',
      key: PresentationType.grid,
      icon: <TableOutlined />,
    },
    {
      label: 'Bar',
      icon: <BarChartOutlined />,
      key: 'bar',
      children: [
        {
          key: PresentationType.bar_chart,
          label: 'Horizontal',
        },
        {
          key: PresentationType.column_chart,
          label: 'Vertical',
        },
      ],
    },
    {
      label: 'Line chart',
      key: PresentationType.line_chart,
      icon: <LineChartOutlined />,
    },
    {
      label: 'Pie',
      key: PresentationType.pie_chart,
      icon: <PieChartOutlined />,
    },
    // {
    //   type: 'divider',
    // },
    // {
    //   label: (
    //     <Flex justify="space-between" className="w-16">
    //       Share <ShareAltOutlined />
    //     </Flex>
    //   ),
    //   key: ActionType.share,
    //   disabled: true,
    // },
    // {
    //   label: (
    //     <Flex justify="space-between" className="w-16">
    //       Export <UploadOutlined />
    //     </Flex>
    //   ),
    //   key: ActionType.export,
    //   disabled: true,
    // },
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
