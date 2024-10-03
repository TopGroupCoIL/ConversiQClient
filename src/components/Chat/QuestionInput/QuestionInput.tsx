import { SendOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Flex, Input } from 'antd';
import { ChangeEvent, useState } from 'react';
import { Question, QuestionType } from '../../../types';

type QuestionInputProps = {
  isAsking: boolean;
  isConversationGoingOn: boolean;
  ask: (question: Question) => Promise<boolean>;
};

export const QuestionInput = ({
  isAsking,
  isConversationGoingOn,
  ask,
}: QuestionInputProps) => {
  const [question, setQuestion] = useState('');

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const onEnterButtonClick = async () => {
    const type = isConversationGoingOn
      ? QuestionType.continue_conversation
      : QuestionType.main_question;

    const isSuccess = await ask({
      type,
      value: question,
      parts: null,
    });

    isSuccess && setQuestion('');
  };

  return (
    <Flex className="w-4/5 max-w-lg sm:mb-8 md:mb-16">
      <Input
        value={question}
        placeholder="Write here..."
        disabled={isAsking}
        className="w-full"
        onChange={onInputChange}
        onPressEnter={onEnterButtonClick}
      />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#459D4E',
            colorBgContainer: '#459D4E',
          },
        }}
      >
        <Button
          type="primary"
          loading={isAsking}
          disabled={isAsking}
          icon={<SendOutlined />}
          className="ml-2"
          onClick={onEnterButtonClick}
        />
      </ConfigProvider>
    </Flex>
  );
};
