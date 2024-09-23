import { useEffect, useRef, useState } from 'react';
import { Button, Popover, Space, Typography } from 'antd';
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
  const [isEllipsis, setIsEllipsis] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef && buttonRef.current) {
      const span = buttonRef.current?.firstChild as HTMLSpanElement;

      setIsEllipsis(span.scrollWidth > span.offsetWidth);
    }
  }, [chatName]);

  const popoverContent = !isEllipsis ? (
    <Button danger icon={<DeleteOutlined />} onClick={onDeleteButtonClick} />
  ) : (
    <Space>
      {chatName}
      <Button danger icon={<DeleteOutlined />} onClick={onDeleteButtonClick} />
    </Space>
  );

  return (
    <Popover placement="right" content={popoverContent}>
      <Button
        type={isSelected ? 'default' : 'text'}
        className="w-full"
        onClick={onChatButtonClick}
        ref={buttonRef}
      >
        <Typography.Text className="w-full" ellipsis>
          {chatName}
        </Typography.Text>
      </Button>
    </Popover>
  );
};
