import { Button, ConfigProvider, Flex } from 'antd';

type AnswerOptionsProps = {
  options: string[];
  selectedOptions: string[];
  isLastAnswer: boolean;
  selectOption?: (option: string) => void;
};

export const AnswerOptions = ({
  options,
  selectedOptions,
  isLastAnswer,
  selectOption,
}: AnswerOptionsProps) => {
  return (
    <Flex wrap gap="small" className="mb-8">
      {options.map((option) => (
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
            type={selectedOptions.includes(option) ? 'primary' : 'default'}
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
  );
};
