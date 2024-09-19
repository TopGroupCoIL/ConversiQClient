import { useEffect, useState } from 'react';
import {
  Answer,
  AnswerType,
  ChatHistory,
  QuestionType,
  SavedChat,
} from '../../../types';
import { fetchData } from '../../../api';
import { ChatButton } from './ChatButton';
import { useModals } from '../../../context/modals';
import { useChat } from '../../../context/chat';
import { Flex } from 'antd';

export const SavedChats = () => {
  const { openModal, setActiveItem } = useModals();
  const {
    currentChat,
    savedChats,
    setChatLoading,
    setCurrentChat,
    setSavedChats,
    deleteSavedChat,
  } = useChat();

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

  const onChatClick = async (savedChat: SavedChat) => {
    if (savedChat.id == currentChat?.id) {
      return;
    }

    setChatLoading(true);

    const res = await fetchData(
      '/ask',
      'POST',
      JSON.stringify({
        type: QuestionType.restore_conversation,
        value: savedChat.id,
        parts: null,
      }),
    );

    const answer = (await res.json()) as Answer;

    setCurrentChat({
      id: savedChat.id,
      history: answer.history.map((val, index) => {
        const selected =
          val.answer?.type === AnswerType.select_option &&
          index !== answer.history.length - 1
            ? answer.history[index + 1].question.value?.split('|') || []
            : [];

        return {
          ...val,
          answer: {
            ...val.answer,
            selected,
          },
        };
      }) as ChatHistory[],
      name: savedChat.name,
    });

    setChatLoading(false);
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

  return (
    <Flex className="w-full [&>*:not(:last-child)]:mb-4" vertical>
      {savedChats.map((chat) => (
        <ChatButton
          key={chat.name}
          chatName={chat.name}
          isSelected={chat.id == currentChat?.id}
          onChatButtonClick={() => {
            onChatClick(chat);
          }}
          onDeleteButtonClick={() => {
            onDeleteChat(chat.id);
          }}
        />
      ))}
    </Flex>
  );
};
