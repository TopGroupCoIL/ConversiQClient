import { Button, ConfigProvider, Flex } from 'antd';

type AnswerOptionsProps = {
  options: string[];
  selectedOptions: string[];
  isLastAnswer: boolean;
  selectOption: (option: string) => void;
};

export const AnswerOptions = ({
  options,
  selectedOptions,
  isLastAnswer,
  selectOption,
}: AnswerOptionsProps) => {
  return (
    <Flex wrap justify="center" align="center" className="w-full">
      {options.map((option) => (
        <ConfigProvider
          key={option}
          theme={{
            token: {
              colorBgContainer: '#f6ffed',
            },
          }}
        >
          <Button
            type={selectedOptions.includes(option) ? 'primary' : 'default'}
            className="m-2"
            onClick={() => {
              if (isLastAnswer) {
                selectOption(option);
              }
            }}
            key={option.length}
          >
            {option}
          </Button>
        </ConfigProvider>
      ))}
    </Flex>
  );
};
