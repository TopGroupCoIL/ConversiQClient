import { Flex } from 'antd';
import {
  Answer as AnswerObject,
  AnswerType,
  Question,
  QuestionType,
} from '../../../../types';
import { LoadingOutlined } from '@ant-design/icons';
import { DataTable } from './DataTable';
import { AnswerToolbar } from './AnswerToolbar';
import { AnswerOptions } from './AnswerOptions';

type AnswerProps = {
  answer: AnswerObject | undefined;
  isLastAnswer: boolean;
  askQuestion: (question: Question) => void;
  onCorrectionClick: () => void;
  selectOption?: (option: string) => void;
};

export const Answer = ({
  answer,
  isLastAnswer,
  askQuestion,
  onCorrectionClick,
  selectOption,
}: AnswerProps) => {
  const isToolbarDisplayed =
    answer &&
    isLastAnswer &&
    answer.type !== AnswerType.end &&
    answer.type !== AnswerType.continue;

  const onShowAllClick = () => {
    askQuestion({ type: QuestionType.get_all, value: null, parts: null });
  };

  const onUseThisClick = () => {
    askQuestion({
      type: QuestionType.found,
      value: answer!.selected.join('|') || null,
      parts: null,
    });
  };

  const onGoLowerClick = () => {
    askQuestion({
      type: QuestionType.next,
      value: answer!.selected.join('|') || null,
      parts: null,
    });
  };

  const onBackClick = () => {
    askQuestion({ type: QuestionType.back, value: null, parts: null });
  };

  const onCancelClick = () => {
    askQuestion({ type: QuestionType.cancel, value: null, parts: null });
  };

  return (
    <Flex className="max-w-4/5">
      <Flex
        vertical
        justify="center"
        align="center"
        className="w-[30px] h-[30px] border-2 border-solid border-black rounded-full text-center"
      >
        C
      </Flex>
      <div className="w-[calc(100%-50px)] mt-[15px] ml-[15px] p-2.5 border border-solid border-[#737785] rounded-md bg-white">
        {!answer ? (
          <LoadingOutlined />
        ) : answer.type === AnswerType.select_option ||
          (answer.type === AnswerType.result && answer.options) ? (
          <>
            {answer.grid && (
              <div className="m-2.5">
                <DataTable grid={answer.grid} />
              </div>
            )}
            <div className="mb-2.5">{answer.question}</div>
            <Flex vertical>
              <AnswerOptions
                options={answer.options}
                selectedOptions={answer.selected}
                isLastAnswer={isLastAnswer}
                selectOption={selectOption}
              />
              {isToolbarDisplayed && (
                <AnswerToolbar
                  isAsking={!answer}
                  showAll={answer.showAll}
                  showBack={answer.showBack}
                  showCancel={answer.showCancel}
                  showCorrectExpression={answer.showCorrectExpression}
                  showExpressionFound={answer.showExpressionFound}
                  showNext={answer.showNext}
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
        ) : (
          <span>End of conversation</span>
        )}
      </div>
    </Flex>
  );
};
