import { useState } from 'react';
import { Dropdown, Flex, MenuProps } from 'antd';
import { LoadingOutlined, MoreOutlined } from '@ant-design/icons';

type NameHeaderProps = {
  initialChatName: string;
  isHistorySaved: boolean;
  onUpdateName: () => void;
  onSaveChat: () => Promise<boolean>;
};

export const NameHeader = ({
  initialChatName,
  isHistorySaved,
  onUpdateName,
  onSaveChat,
}: NameHeaderProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const onMenuClick: MenuProps['onClick'] = async (e) => {
    if (e.key === 'save') {
      setIsSaving(true);

      await onSaveChat();

      setIsSaving(false);
    } else {
      onUpdateName();
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'save',
      label: 'Save',
      disabled: isHistorySaved,
      icon: isSaving ? <LoadingOutlined /> : null,
      className: 'font-inter',
    },
    {
      key: 'editName',
      label: 'Edit name',
      className: 'font-inter',
    },
  ];

  return (
    <Flex
      justify="flex-start"
      align="center"
      className="absolute w-full px-16 h-16 top-0"
    >
      <Dropdown.Button
        type="text"
        menu={{ items, onClick: onMenuClick }}
        icon={isSaving ? <LoadingOutlined /> : <MoreOutlined />}
        className="*:text-2xl *:font-inter *:font-bold"
      >
        {initialChatName}
      </Dropdown.Button>
    </Flex>
  );
};
