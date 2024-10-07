import { UserOutlined } from '@ant-design/icons';
import { Flex, Image } from 'antd';
import {
  Question as QuestionObjectType,
  QuestionType,
  User,
} from '../../../../types';

type QuestionProps = {
  question: QuestionObjectType;
  user: User | null;
};

export const Question = ({ question, user }: QuestionProps) => {
  const questionValue =
    question.type === QuestionType.get_all
      ? 'Show all options'
      : question.type === QuestionType.back
      ? 'Back'
      : question.value?.replace('|', ' | ') || question.type;

  const userInitials = user?.name
    .split(' ')
    .map((name) => name[0])
    .join('');

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
              className="w-[30px] h-[30px] border-[1.5px] border-solid border-[#353535] rounded-full text-center font-bold bg-[#f6ffed]"
            >
              {userInitials}
            </Flex>
          )
        ) : (
          <UserOutlined />
        )}
      </span>
      <div className="mt-[15px] ml-[15px] p-2.5 border border-solid border-[#737785] rounded-md bg-[#E6FCE1] shadow-message font-inter font-normal text-base">
        {questionValue}
      </div>
    </Flex>
  );
};
