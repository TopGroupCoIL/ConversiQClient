import { useState } from 'react';
import { Flex } from 'antd';
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
import { ChatToolbar } from './ChatToolbar';
import { useModals } from '../../context/modals';

export const Chat = () => {
  const { openModal, setActiveItem } = useModals();

  const { currentChat, setQuestion, setAnswer, updateChatName, selectOption } =
    useChat();

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

  const lastAnswer = currentChat
    ? currentChat.history[currentChat.history.length - 1].answer
    : null;

  const onShowAllClick = () => {
    askQuestion({ type: QuestionType.get_all, value: null, parts: null });
  };

  const onFoundClick = () => {
    askQuestion({
      type: QuestionType.found,
      value: lastAnswer?.selected.join('|') || null,
      parts: null,
    });
  };

  const onNextClick = () => {
    askQuestion({
      type: QuestionType.next,
      value: lastAnswer?.selected.join('|') || null,
      parts: null,
    });
  };

  const onBackClick = () => {
    askQuestion({ type: QuestionType.back, value: null, parts: null });
  };

  const onCancelClick = () => {
    askQuestion({ type: QuestionType.cancel, value: null, parts: null });
  };

  const onCorrectionClick = () => {
    const correctExpression = (parts: QuestionPart[]) => {
      askQuestion({ type: QuestionType.correction, value: null, parts });
    };

    setActiveItem({ correctExpression });

    openModal('CorrectExpressionModal');
  };
  lastAnswer && console.log(lastAnswer.type);
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
          updateName={updateChatName}
        />
      )}
      {currentChat ? (
        <div className="w-full h-full pt-16 pb-32 pl-16">
          <QuestionsAnswers
            isAsking={isAsking}
            chatHistory={currentChat.history}
            selectOption={selectOption}
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
        {lastAnswer &&
        lastAnswer.type !== AnswerType.end &&
        lastAnswer.type !== AnswerType.continue ? (
          <ChatToolbar
            isAsking={isAsking}
            showAll={lastAnswer.showAll}
            showBack={lastAnswer.showBack}
            showCancel={lastAnswer.showCancel}
            showCorrectExpression={lastAnswer.showCorrectExpression}
            showExpressionFound={lastAnswer.showExpressionFound}
            showNext={lastAnswer.showNext}
            disableExpressionFound={
              lastAnswer && lastAnswer.selected && !lastAnswer.selected.length
            }
            onShowAllClick={onShowAllClick}
            onFoundClick={onFoundClick}
            onNextClick={onNextClick}
            onBackClick={onBackClick}
            onCancelClick={onCancelClick}
            onCorrectionClick={onCorrectionClick}
          />
        ) : (
          <QuestionInput ask={askQuestion} isAsking={isAsking} />
        )}
      </Flex>
    </Flex>
  );
};
