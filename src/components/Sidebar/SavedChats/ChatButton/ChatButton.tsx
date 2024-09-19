import { Button, Popover, Typography } from 'antd';
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
    <Popover
      placement="right"
      content={
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={onDeleteButtonClick}
        />
      }
    >
      <Button
        type={isSelected ? 'default' : 'text'}
        className="w-full"
        onClick={onChatButtonClick}
      >
        <Typography.Text className="w-full" ellipsis>
          {chatName}
        </Typography.Text>
      </Button>
    </Popover>
  );
};
