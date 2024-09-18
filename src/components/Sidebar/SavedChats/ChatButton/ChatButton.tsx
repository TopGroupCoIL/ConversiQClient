import { Button, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

type ChatButtonProps = {
  chatName: string;
  isSelected: boolean;
  onChatButtonClick: () => void;
  onDeleteButtonClick: () => void;
};

export const ChatButton = ({
  chatName,
  isSelected,
  onChatButtonClick,
  onDeleteButtonClick,
}: ChatButtonProps) => {
  return (
    <Space>
      <Button
        type={isSelected ? 'primary' : 'default'}
        onClick={onChatButtonClick}
      >
        {chatName}
      </Button>
      <Button icon={<DeleteOutlined />} onClick={onDeleteButtonClick} />
    </Space>
  );
};
