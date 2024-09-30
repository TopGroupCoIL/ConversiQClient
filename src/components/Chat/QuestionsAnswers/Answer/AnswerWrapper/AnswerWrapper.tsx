import { Flex } from 'antd';

type AnswerWrapperProps = {
  children: string | JSX.Element | JSX.Element[];
  isLoading?: boolean;
  styledClasses?: string;
};

export const AnswerWrapper = ({
  children,
  isLoading,
  styledClasses,
}: AnswerWrapperProps) => {
  return (
    <Flex className={`w-full ${styledClasses || ''}`}>
      <Flex
        vertical
        justify="center"
        align="center"
        className="w-[30px] h-[30px] border-2 border-solid border-black rounded-full text-center font-bold"
      >
        C
      </Flex>
      <div
        className={`${
          !isLoading && 'w-[calc(100%-50px)]'
        } mt-[15px] ml-[15px] p-2.5 border border-solid border-[#737785] rounded-md bg-white`}
      >
        {children}
      </div>
    </Flex>
  );
};
