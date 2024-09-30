import { Button, Flex } from 'antd';
import {
  AnswerToolbar as AnswerToolbarProps,
  QuestionType,
} from '../../../../../../types';

export const AnswerToolbar = ({
  isDisabled,
  selectedQuestionType,
  showAll,
  showBack,
  // showCancel,
  // showCorrectExpression,
  showUseThis,
  showGoLower,
  disableExpressionFound,
  onShowAllClick,
  onBackClick,
  // onCancelClick,
  // onCorrectionClick,
  onUseThisClick,
  onGoLowerClick,
}: AnswerToolbarProps) => {
  return (
    <Flex
      className="w-full [&>*:not(:last-child)]:mr-2 [&>button]:m-2"
      wrap
      justify="center"
      align="center"
    >
      {showUseThis && (
        <Button
          className="w-44"
          disabled={
            (!isDisabled && disableExpressionFound) ||
            QuestionType.found === selectedQuestionType
          }
          onClick={!isDisabled ? onUseThisClick : undefined}
        >
          Use the selected items
        </Button>
      )}
      {showGoLower && (
        <Button
          className="w-44"
          disabled={
            (!isDisabled && disableExpressionFound) ||
            QuestionType.next === selectedQuestionType
          }
          onClick={!isDisabled ? onGoLowerClick : undefined}
        >
          Go to lower level
        </Button>
      )}
      {showBack && (
        <Button
          className="w-44"
          disabled={QuestionType.back === selectedQuestionType}
          onClick={!isDisabled ? onBackClick : undefined}
        >
          Go to higher level
        </Button>
      )}
      {showAll && (
        <Button
          type="default"
          className="w-44"
          onClick={!isDisabled ? onShowAllClick : undefined}
          disabled={QuestionType.get_all === selectedQuestionType}
        >
          Show all options
        </Button>
      )}
      {/* {showCancel && <Button onClick={onCancelClick}>Cancel</Button>} */}
      {/* {showCorrectExpression && (
        <Button onClick={onCorrectionClick}>Correct expression</Button>
      )} */}
    </Flex>
  );
};
