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
};

export const QuestionsAnswers = (props: QuestionsAnswersProps) => {
  const { chatHistory, askQuestion, selectOption, onCorrectionClick } = props;

  const { user } = useAuthContext();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isAnswer = Object.keys(chatHistory[chatHistory.length - 1]).length == 2;

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
      className="h-full overflow-auto pr-16"
      ref={messagesEndRef}
    >
      {chatHistory.map(({ question, answer }, index) => {
        const isLastAnswer = chatHistory.length - 1 === index;
        return (
          <div key={question.value}>
            <Question question={question} user={user} />
            <Answer
              answer={answer}
              isLastAnswer={isLastAnswer}
              askQuestion={askQuestion}
              selectOption={selectOption}
              onCorrectionClick={onCorrectionClick}
            />
          </div>
        );
      })}
      <div ref={messagesEndRef}></div>
    </Flex>
  );
};
