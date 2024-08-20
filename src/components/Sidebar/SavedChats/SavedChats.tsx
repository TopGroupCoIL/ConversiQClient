import { Button, Col, ConfigProvider, Row } from 'antd';
import { Chat } from '../../../types';
import { DeleteOutlined } from '@ant-design/icons';

type SavedChatsProps = {
  chats: Chat[];
  currentChatName: string | undefined;
  onChatClick: (chatName: string) => void;
  onDeleteChatClick: (chatName: string) => void;
};

export const SavedChats = ({
  chats,
  currentChatName,
  onChatClick,
}: SavedChatsProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            contentFontSize: 14,
            fontWeight: 400,
            colorText: '#353535',
            defaultHoverBg: '#E6FCE1',
          },
        },
      }}
    >
      {chats.map((chat) => (
        <Row gutter={[16, 16]}>
          <Col flex="auto">
            <Button
              type={chat.name === currentChatName ? 'dashed' : 'text'}
              iconPosition="end"
              onClick={() => {
                onChatClick(chat.name);
              }}
            >
              {chat.name}
            </Button>
          </Col>
          <Col flex="40px">
            <DeleteOutlined color="#D6D6D6" />
          </Col>
        </Row>
      ))}
    </ConfigProvider>
  );
};
