import { Flex } from 'antd';
import {
  Answer as AnswerObject,
  AnswerType,
  Question,
  QuestionType,
} from '../../../../types';
import { LoadingOutlined } from '@ant-design/icons';
import { AnswerToolbar } from './AnswerToolbar';
import { AnswerOptions } from './AnswerOptions';
import { GridRepresentation } from './GridRepresentation';

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
  const isToolbarDisplayed =
    answer &&
    isLastAnswer &&
    answer.type !== AnswerType.end &&
    answer.type !== AnswerType.continue;

  const isAnswerOptionsDisplayed = answer && answer.type !== AnswerType.result;

  const onShowAllClick = () => {
    askQuestion({ type: QuestionType.get_all, value: null, parts: null });
  };

  const onUseThisClick = (option?: string) => {
    const value =
      typeof option === 'string' ? option : answer!.selected.join('|') || null;

    askQuestion({
      type: QuestionType.found,
      value,
      parts: null,
    });
  };

  const onGoLowerClick = (option?: string) => {
    const value =
      typeof option === 'string' ? option : answer!.selected.join('|') || null;

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
    <Flex
      className={`${answer && 'w-full'} ${
        answer && answer.grid ? 'max-w-full' : 'max-w-5xl'
      }`}
    >
      <Flex
        vertical
        justify="center"
        align="center"
        className="w-[30px] h-[30px] border-2 border-solid border-black rounded-full text-center font-bold"
      >
        C
      </Flex>
      <div className="w-[calc(100%-50px)] mt-[15px] ml-[15px] p-2.5 border border-solid border-[#737785] rounded-md bg-white">
        {!answer ? (
          <LoadingOutlined className="mx-auto" />
        ) : answer.type === AnswerType.select_option ||
          (answer.type === AnswerType.result && answer.options) ? (
          <>
            {answer.grid && <GridRepresentation grid={answer.grid} />}
            {isAnswerOptionsDisplayed && (
              <div className="mb-2.5">{answer.question}</div>
            )}
            <Flex vertical>
              {isAnswerOptionsDisplayed && (
                <AnswerOptions
                  options={answer.options}
                  selectedOptions={answer.selected}
                  isLastAnswer={isLastAnswer}
                  selectOption={onOptionSelect}
                />
              )}
              {isToolbarDisplayed && (
                <AnswerToolbar
                  isAsking={!answer}
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
                    answer.type !== AnswerType.result &&
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
              )}
            </Flex>
          </>
        ) : AnswerType.error ? (
          <span>Sorry, unable to process your request</span>
        ) : (
          <span>End of conversation</span>
        )}
      </div>
    </Flex>
  );
};
