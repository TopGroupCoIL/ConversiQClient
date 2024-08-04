import { Button, Flex } from 'antd';

type ChatToolbarProps = {
  isAsking: boolean;
  showAll?: boolean;
  showBack?: boolean;
  showCancel?: boolean;
  showCorrectExpression?: boolean;
  showExpressionFound?: boolean;
  showNext?: boolean;
  disableExpressionFound?: boolean;
  onShowAllClick: () => void;
  onBackClick: () => void;
  onCancelClick: () => void;
  onCorrectionClick: () => void;
  onFoundClick: () => void;
  onNextClick: () => void;
};

export const ChatToolbar = ({
  showAll,
  showBack,
  showCancel,
  showCorrectExpression,
  showExpressionFound,
  showNext,
  disableExpressionFound,
  onShowAllClick,
  onBackClick,
  onCancelClick,
  onCorrectionClick,
  onFoundClick,
  onNextClick,
}: ChatToolbarProps) => {
  return (
    <Flex
      className="w-full [&>*:not(:last-child)]:mr-4"
      justify="center"
      align="center"
    >
      {showAll && <Button onClick={onShowAllClick}>All</Button>}
      {showBack && <Button onClick={onBackClick}>Back</Button>}
      {showCancel && <Button onClick={onCancelClick}>Cancel</Button>}
      {showCorrectExpression && (
        <Button onClick={onCorrectionClick}>Correct expression</Button>
      )}
      {showExpressionFound && (
        <Button disabled={disableExpressionFound} onClick={onFoundClick}>
          Expression found
        </Button>
      )}
      {showNext && (
        <Button disabled={disableExpressionFound} onClick={onNextClick}>
          Next
        </Button>
      )}
    </Flex>
  );
};
