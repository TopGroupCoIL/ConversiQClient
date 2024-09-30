import { LoadingOutlined } from '@ant-design/icons';
import {
  Answer as AnswerObject,
  AnswerType,
  Question,
} from '../../../../types';
import { GridRepresentation } from './GridRepresentation';
import { AnswerWrapper } from './AnswerWrapper';
import { AnswerQuestion } from './AnswerQuestion';

type AnswerProps = {
  answer: AnswerObject | undefined;
  isLastAnswer: boolean;
  askQuestion: (question: Question) => void;
  onCorrectionClick: () => void;
  selectOption: (option: string) => void;
  clearChat: () => void;
};

export const Answer = ({
  answer,
  isLastAnswer,
  askQuestion,
  onCorrectionClick,
  selectOption,
  clearChat,
}: AnswerProps) => {
  if (!answer) {
    return (
      <AnswerWrapper isLoading>
        <LoadingOutlined className="mx-auto" style={{ fontSize: 16 }} />
      </AnswerWrapper>
    );
  }

  if (answer.type === AnswerType.error) {
    return (
      <AnswerWrapper>
        <span>{answer.error || 'Sorry, unable to process your request.'}</span>
      </AnswerWrapper>
    );
  }

  if (
    !(
      answer.type === AnswerType.select_option ||
      (answer.type === AnswerType.result && answer.options)
    )
  ) {
    <AnswerWrapper>
      <span>End of conversation.</span>
    </AnswerWrapper>;
  }

  if (answer.type !== AnswerType.result) {
    return (
      <AnswerWrapper>
        <AnswerQuestion
          answer={answer}
          isLastAnswer={isLastAnswer}
          selectOption={selectOption}
          onCorrectionClick={onCorrectionClick}
          clearChat={clearChat}
          askQuestion={askQuestion}
        />
      </AnswerWrapper>
    );
  }

  return <GridRepresentation grid={answer.grid} />;
};
