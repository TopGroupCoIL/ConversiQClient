import { Flex } from 'antd';
import { ChatHistory, Question as QuestionType } from '../../../types';
import { useAuthContext } from '../../../context/auth';
import { Question } from './Question';
import { Answer } from './Answer/Answer';
import { useEffect, useRef } from 'react';

type QuestionsAnswersProps = {
  chatHistory: ChatHistory[];
  askQuestion: (question: QuestionType) => void;
  selectOption: (option: string) => void;
  onCorrectionClick: () => void;
  clearChat: () => void;
};

export const QuestionsAnswers = (props: QuestionsAnswersProps) => {
  const {
    chatHistory,
    askQuestion,
    selectOption,
    onCorrectionClick,
    clearChat,
  } = props;

  const { user } = useAuthContext();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isAnswer =
    chatHistory[chatHistory.length - 1] &&
    Object.keys(chatHistory[chatHistory.length - 1]).length == 2;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [chatHistory.length, isAnswer]);

  return (
    <Flex
      vertical
      align="flex-start"
      justify="flex-start"
      className="w-full h-full overflow-auto pr-4 lg:pr-8"
      ref={messagesEndRef}
    >
      {chatHistory.map(({ question, answer }, index) => {
        const isLastAnswer = chatHistory.length - 1 === index;
        return (
          <>
            <Question question={question} user={user} key={question.value} />
            <Answer
              answer={answer}
              isLastAnswer={isLastAnswer}
              key={index}
              askQuestion={askQuestion}
              selectOption={selectOption}
              onCorrectionClick={onCorrectionClick}
              clearChat={clearChat}
            />
          </>
        );
      })}
      <div ref={messagesEndRef}></div>
    </Flex>
  );
};
