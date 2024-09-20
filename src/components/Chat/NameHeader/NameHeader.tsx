import { MoreOutlined } from '@ant-design/icons';
import { ConfigProvider, Dropdown, Flex, MenuProps } from 'antd';

type NameHeaderProps = {
  initialChatName: string;
  isHistorySaved: boolean;
  onUpdateName: () => void;
  onSaveChat: () => void;
};

export const NameHeader = ({
  initialChatName,
  isHistorySaved,
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

  const items: MenuProps['items'] = [
    {
      key: 'save',
      label: 'Save',
      disabled: isHistorySaved,
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
