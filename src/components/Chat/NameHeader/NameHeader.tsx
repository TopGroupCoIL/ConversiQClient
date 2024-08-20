import { MoreOutlined } from '@ant-design/icons';
import { ConfigProvider, Dropdown, Flex, MenuProps } from 'antd';

type NameHeaderProps = {
  initialChatName: string;
  onUpdateName: () => void;
  onSaveChat: () => void;
};

export const NameHeader = ({
  initialChatName,
  onUpdateName,
  onSaveChat,
}: NameHeaderProps) => {
  const onMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'save') {
      onSaveChat();
    } else {
      onUpdateName();
    }
  };

  const items = [
    {
      key: 'save',
      label: 'Save',
    },
    {
      key: 'editName',
      label: 'Edit name',
    },
  ];

  return (
    <Flex
      justify="flex-start"
      align="center"
      className="absolute w-full px-16 h-16 top-0"
    >
      <ConfigProvider
        theme={{
          components: {
            Button: {
              contentFontSize: 24,
              fontWeight: 700,
            },
          },
        }}
      >
        <Dropdown.Button
          type="text"
          menu={{ items, onClick: onMenuClick }}
          icon={<MoreOutlined />}
          className="text-lg w-auto font-bold"
        >
          {initialChatName}
        </Dropdown.Button>
      </ConfigProvider>
    </Flex>
  );
};
