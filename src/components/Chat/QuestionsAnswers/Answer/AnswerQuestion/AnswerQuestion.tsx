import {
  Answer,
  AnswerType,
  Question,
  QuestionType,
} from '../../../../../types';
import { AnswerOptions } from './AnswerOptions';
import { AnswerToolbar } from './AnswerToolbar';

type AnswerQuestionProps = {
  answer: Answer;
  isLastAnswer: boolean;
  selectOption: (option: string) => void;
  onCorrectionClick: () => void;
  clearChat: () => void;
  askQuestion: (question: Question) => void;
};

export const AnswerQuestion = ({
  answer,
  isLastAnswer,
  selectOption,
  onCorrectionClick,
  clearChat,
  askQuestion,
}: AnswerQuestionProps) => {
  const onShowAllClick = () => {
    askQuestion({ type: QuestionType.get_all, value: null, parts: null });
  };

  const onUseThisClick = (option?: string) => {
    const value =
      typeof option === 'string' ? option : answer.selected.join('|') || null;

    askQuestion({
      type: QuestionType.found,
      value,
      parts: null,
    });
  };

  const onGoLowerClick = (option?: string) => {
    const value =
      typeof option === 'string' ? option : answer.selected.join('|') || null;

    askQuestion({
      type: QuestionType.next,
      value,
      parts: null,
    });
  };

  const onBackClick = () => {
    askQuestion({ type: QuestionType.back, value: null, parts: null });
  };

  const onCancelClick = () => {
    askQuestion({ type: QuestionType.cancel, value: null, parts: null });
  };

  const onOptionSelect = (option: string) => {
    if (!answer) {
      return;
    }

    if (answer.type === AnswerType.result) {
      clearChat();
      return;
    }

    selectOption(option);

    if (
      answer.multiSelection ||
      (answer.showExpressionFound && answer.showNext)
    ) {
      return;
    }

    if (answer.showExpressionFound) {
      onUseThisClick(option);
      return;
    }

    if (answer.showNext) {
      onGoLowerClick(option);
      return;
    }
  };
  return (
    <>
      <div className="mb-2.5">{answer.question}</div>
      <AnswerOptions
        options={answer.options}
        selectedOptions={answer.selected}
        isLastAnswer={isLastAnswer}
        selectOption={onOptionSelect}
      />
      <AnswerToolbar
        isDisabled={!isLastAnswer}
        selectedQuestionType={answer.selectedQuestionType}
        showAll={answer.showAll}
        showBack={answer.showBack}
        showCancel={answer.showCancel}
        showCorrectExpression={answer.showCorrectExpression}
        showUseThis={
          answer.showExpressionFound &&
          (answer.multiSelection || answer.showNext)
        }
        showGoLower={
          answer.showNext &&
          (answer.multiSelection || answer.showExpressionFound)
        }
        disableExpressionFound={
          answer && answer.selected && !answer.selected.length
        }
        onShowAllClick={onShowAllClick}
        onBackClick={onBackClick}
        onUseThisClick={onUseThisClick}
        onCancelClick={onCancelClick}
        onGoLowerClick={onGoLowerClick}
        onCorrectionClick={onCorrectionClick}
      />
    </>
  );
};
