import { Button, Flex } from 'antd';
import { AnswerToolbar as AnswerToolbarProps } from '../../../../../types';

export const AnswerToolbar = ({
  showAll,
  // showBack,
  // showCancel,
  // showCorrectExpression,
  showExpressionFound,
  showNext,
  disableExpressionFound,
  onShowAllClick,
  // onBackClick,
  // onCancelClick,
  // onCorrectionClick,
  onUseThisClick,
  onGoLowerClick,
}: AnswerToolbarProps) => {
  return (
    <Flex
      className="w-full [&>*:not(:last-child)]:mr-4"
      justify="center"
      align="center"
    >
      {showAll && <Button onClick={onShowAllClick}>All</Button>}
      {/* {showBack && <Button onClick={onBackClick}>Back</Button>} */}
      {/* {showCancel && <Button onClick={onCancelClick}>Cancel</Button>} */}
      {/* {showCorrectExpression && (
        <Button onClick={onCorrectionClick}>Correct expression</Button>
      )} */}
      {showExpressionFound && (
        <Button disabled={disableExpressionFound} onClick={onUseThisClick}>
          Use this
        </Button>
      )}
      {showNext && (
        <Button disabled={disableExpressionFound} onClick={onGoLowerClick}>
          Go lower here
        </Button>
      )}
    </Flex>
  );
};
