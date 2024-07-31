import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Flex, MenuProps } from 'antd';

type NameHeaderProps = {
  initialChatName: string;
  updateName: (name: string) => void;
};

export const NameHeader = ({
  initialChatName,
}: // updateName,
NameHeaderProps) => {
  const onMenuClick: MenuProps['onClick'] = () => {};

  const items = [
    {
      key: 'save',
      label: 'Save',
    },
    {
      key: 'updateName',
      label: 'Update name',
    },
  ];

  return (
    <Flex
      justify="center"
      align="center"
      className="absolute w-full h-16 top-0"
    >
      <Dropdown.Button
        type="text"
        menu={{ items, onClick: onMenuClick }}
        icon={<MoreOutlined />}
        className="text-lg w-auto font-bold"
      >
        {initialChatName}
      </Dropdown.Button>
    </Flex>
  );
};
