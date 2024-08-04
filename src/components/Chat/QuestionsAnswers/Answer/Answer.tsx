import { Button, ConfigProvider, Flex } from 'antd';
import { Answer as AnswerObject, AnswerType } from '../../../../types';
import { LoadingOutlined } from '@ant-design/icons';

type AnswerProps = {
  answer: AnswerObject | undefined;
  isLastAnswer: boolean;
  selectOption?: (option: string) => void;
};

export const Answer = ({ answer, isLastAnswer, selectOption }: AnswerProps) => {
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
      <div className="w-full mt-[15px] ml-[15px] p-2.5 border border-solid border-[#737785] rounded-md bg-white">
        {!answer ? (
          <LoadingOutlined />
        ) : answer.type === AnswerType.select_option ||
          (answer.type === AnswerType.result && answer.options) ? (
          <>
            <div className="mb-[10px]">
              {answer.grid && JSON.stringify(answer.grid)}
            </div>
            <div className="mb-[10px]">{answer.question}</div>
            <Flex wrap gap="small">
              {answer.options.map((option) => (
                <ConfigProvider
                  key={option}
                  theme={{
                    token: {
                      colorPrimary: '#00b96b',
                      colorBgContainer: '#f6ffed',
                    },
                  }}
                >
                  <Button
                    type={
                      answer.selected.includes(option) ? 'primary' : 'default'
                    }
                    className="ml-2"
                    onClick={() => {
                      if (isLastAnswer) {
                        selectOption && selectOption(option);
                      }
                    }}
                    key={option.length}
                  >
                    {option}
                  </Button>
                </ConfigProvider>
              ))}
            </Flex>
          </>
        ) : (
          <span>End of conversation</span>
        )}
      </div>
    </Flex>
  );
};
