import { useEffect, useState } from 'react';
import { Flex, Spin } from 'antd';
import { Template } from './Template';
import { QuestionInput } from './QuestionInput';
import { fetchData } from '../../api';
import { useChat } from '../../context/chat';
import {
  Answer,
  AnswerType,
  Question,
  QuestionPart,
  QuestionType,
} from '../../types';
import { NameHeader } from './NameHeader';
import { QuestionsAnswers } from './QuestionsAnswers';
import { useModals } from '../../context/modals';

export const Chat = () => {
  const { openModal, setActiveItem } = useModals();

  const {
    currentChat,
    isLoading,
    setQuestion,
    setAnswer,
    updateChatName,
    saveChat,
    selectOption,
    clearChat,
  } = useChat();

  const [isAsking, setAsking] = useState(false);

  const askQuestion = async (question: Question) => {
    setAsking(true);

    setQuestion(question);

    const res = await fetchData('/ask', 'POST', JSON.stringify(question));

    const answer = (await res.json()) as Answer;

    if (answer.options && answer.options.length) {
      answer.selected = [];
    }

    setAnswer(answer);

    setAsking(false);

    return true;
  };

  const checkLastConversation = async () => {
    const res = await fetchData(
      '/ask',
      'POST',
      JSON.stringify({ type: QuestionType.start, value: null, parts: null }),
    );

    const answer = (await res.json()) as Answer;

    if (answer.type == AnswerType.select_option) {
      return;
    }
  };

  useEffect(() => {
    if (!isAsking) {
      checkLastConversation();
    }
  }, []);

  const onCorrectionClick = () => {
    const correctExpression = (parts: QuestionPart[]) => {
      askQuestion({ type: QuestionType.correction, value: null, parts });
    };

    setActiveItem({ correctExpression });

    openModal('CorrectExpressionModal');
  };

  const onSaveChat = () => {
    currentChat &&
      setActiveItem({
        chatName: currentChat?.name,
        saveChat: async () => {
          const res = await fetchData(
            `/customers/chats/save/${currentChat.name}`,
            'PUT',
          );

          if (res.ok) {
            saveChat();
          }
        },
      });

    openModal('SaveChatModal');
  };

  const onUpdateChatName = () => {
    const updateName = async (updatedName: string) => {
      const res = await fetchData(
        `/customers/chats/${currentChat?.id}/caption/${updatedName}`,
        'PUT',
      );

      if (res.ok) {
        updateChatName(updatedName);
      }
    };

    currentChat &&
      setActiveItem({
        chatName: currentChat?.name,
        updateChatName: updateName,
      });

    openModal('UpdateChatNameModal');
  };

  const isResultAnswer = !!(
    currentChat &&
    currentChat.history &&
    currentChat.history[currentChat.history.length - 1] &&
    currentChat.history[currentChat.history.length - 1].answer &&
    currentChat.history[currentChat.history.length - 1].answer?.type ===
      AnswerType.result
  );

  if (isLoading) {
    return (
      <Flex justify="center" align="center" className="w-full h-full">
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <Flex
      vertical
      justify="space-between"
      align="center"
      className="relative w-full h-full"
    >
      {currentChat && (
        <NameHeader
          initialChatName={currentChat.name}
          onUpdateName={onUpdateChatName}
          onSaveChat={onSaveChat}
        />
      )}
      {currentChat ? (
        <div className="w-full h-full pt-16 pb-32 pl-16">
          <QuestionsAnswers
            chatHistory={currentChat.history}
            askQuestion={askQuestion}
            selectOption={selectOption}
            onCorrectionClick={onCorrectionClick}
            clearChat={clearChat}
          />
        </div>
      ) : (
        <Template />
      )}
      <Flex
        justify="center"
        align="center"
        className="absolute w-full h-32 bottom-0 bg-babyPowder"
      >
        <QuestionInput
          ask={askQuestion}
          isAsking={isAsking}
          isConversationGoingOn={isResultAnswer}
        />
      </Flex>
    </Flex>
  );
};
