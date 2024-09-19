import { Button, Flex } from 'antd';
import { AnswerToolbar as AnswerToolbarProps } from '../../../../../types';

export const AnswerToolbar = ({
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
          disabled={disableExpressionFound}
          onClick={onUseThisClick}
        >
          Use the selected items
        </Button>
      )}
      {showGoLower && (
        <Button
          className="w-44"
          disabled={disableExpressionFound}
          onClick={onGoLowerClick}
        >
          Go to lower level
        </Button>
      )}
      {showBack && (
        <Button className="w-44" onClick={onBackClick}>
          Go to higher level
        </Button>
      )}
      {showAll && (
        <Button className="w-44" onClick={onShowAllClick}>
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
