import { useEffect, useState } from 'react';
import { SavedChat } from '../../../types';
import { fetchData } from '../../../api';
import { ChatButton } from './ChatButton';
import { useModals } from '../../../context/modals';
import { useChat } from '../../../context/chat';
import { Flex } from 'antd';

export const SavedChats = () => {
  const { openModal, setActiveItem } = useModals();
  const { currentChat, savedChats, setSavedChats, deleteSavedChat } = useChat();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSavedChats = async () => {
      setIsLoading(true);

      const res = await fetchData('/customers/chats');
      const savedChats = (await res.json()) as SavedChat[];

      setSavedChats(savedChats);

      setIsLoading(false);
    };

    fetchSavedChats();
  }, []);

  if (isLoading) {
    return null;
  }

  const onChatClick = (chatId: string) => {
    console.log(chatId);
  };

  const onDeleteChat = (chatId: string) => {
    const deleteChat = async () => {
      const res = await fetchData(`/customers/chats/${chatId}`, 'DELETE');

      if (res.ok) {
        deleteSavedChat(chatId);
      }
    };

    setActiveItem({ deleteChat });

    openModal('DeleteChatModal');
  };

  return null;

  return (
    <Flex className="w-full [&>*:not(:last-child)]:mb-4" vertical>
      {savedChats.map((chat) => (
        <ChatButton
          key={chat.name}
          chatName={chat.name}
          isSelected={chat.name == currentChat?.name}
          onChatButtonClick={() => {
            onChatClick(chat.id);
          }}
          onDeleteButtonClick={() => {
            onDeleteChat(chat.id);
          }}
        />
      ))}
    </Flex>
  );
};
