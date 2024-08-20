import { useState } from 'react';
import { Flex } from 'antd';
import { Template } from './Template';
import { QuestionInput } from './QuestionInput';
import { fetchData } from '../../api';
import { useChat } from '../../context/chat';
import { Answer, Question, QuestionPart, QuestionType } from '../../types';
import { NameHeader } from './NameHeader';
import { QuestionsAnswers } from './QuestionsAnswers';
import { useModals } from '../../context/modals';

export const Chat = () => {
  const { openModal, setActiveItem } = useModals();

  const {
    currentChat,
    setQuestion,
    setAnswer,
    updateChatName,
    saveChat,
    selectOption,
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

  const onCorrectionClick = () => {
    const correctExpression = (parts: QuestionPart[]) => {
      askQuestion({ type: QuestionType.correction, value: null, parts });
    };

    setActiveItem({ correctExpression });

    openModal('CorrectExpressionModal');
  };

  const onSaveChat = () => {
    currentChat && setActiveItem({ chatName: currentChat?.name, saveChat });

    openModal('SaveChatModal');
  };

  const onUpdateChatName = () => {
    currentChat &&
      setActiveItem({ chatName: currentChat?.name, updateChatName });

    openModal('UpdateChatNameModal');
  };

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
        {<QuestionInput ask={askQuestion} isAsking={isAsking} />}
      </Flex>
    </Flex>
  );
};
