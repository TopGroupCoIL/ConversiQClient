import { Flex } from 'antd';
import { ChatHistory } from '../../../types';
import { useAuthContext } from '../../../context/auth';
import { Question } from './Question';
import { Answer } from './Answer/Answer';

type QuestionsAnswersProps = {
  isAsking: boolean;
  chatHistory: ChatHistory[];
  selectOption: (option: string) => void;
};

export const QuestionsAnswers = (props: QuestionsAnswersProps) => {
  const { isAsking, chatHistory, selectOption } = props;

  const { user } = useAuthContext();

  console.log(isAsking);

  return (
    <Flex
      vertical
      align="flex-start"
      justify="flex-start"
      className="h-full overflow-auto pr-16"
    >
      {chatHistory.map(({ question, answer }, index) => {
        const isLastAnswer = chatHistory.length - 1 === index;
        return (
          <>
            <Question question={question} user={user} />
            <Answer
              answer={answer}
              isLastAnswer={isLastAnswer}
              selectOption={selectOption}
            />
          </>
        );
      })}
    </Flex>
  );
};
