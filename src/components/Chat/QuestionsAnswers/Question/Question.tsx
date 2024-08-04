import { UserOutlined } from '@ant-design/icons';
import { Flex, Image } from 'antd';
import { Question as QuestionType, User } from '../../../../types';

type QuestionProps = {
  question: QuestionType;
  user: User | null;
};

export const Question = ({ question, user }: QuestionProps) => {
  return (
    <Flex className="mb-4">
      <span>
        {user ? (
          user.picture ? (
            <Image
              src={user.picture}
              width={30}
              height={30}
              className="border border-solid border-black rounded-full"
            />
          ) : (
            <Flex
              vertical
              justify="center"
              align="center"
              className="w-[30px] h-[30px] border-2 border-solid border-black rounded-full text-center"
            >
              {user.name[0]}
            </Flex>
          )
        ) : (
          <UserOutlined />
        )}
      </span>
      <div className="mt-[15px] ml-[15px] p-2.5 border border-solid border-[#737785] rounded-md bg-[#E6FCE1]">
        {question.value || question.type}
      </div>
    </Flex>
  );
};
