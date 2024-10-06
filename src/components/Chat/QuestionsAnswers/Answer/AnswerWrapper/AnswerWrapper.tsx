import { Flex } from 'antd';

type AnswerWrapperProps = {
  children: string | JSX.Element | JSX.Element[];
  isLoading?: boolean;
  styledClasses?: string;
  notFullWidth?: boolean;
};

export const AnswerWrapper = ({
  children,
  isLoading,
  styledClasses,
  notFullWidth,
}: AnswerWrapperProps) => {
  return (
    <Flex
      className={`${!notFullWidth ? 'w-full' : ''} ${styledClasses || ''} mb-4`}
    >
      <Flex
        vertical
        justify="center"
        align="center"
        className="w-[30px] h-[30px] border-[1.5px] border-solid border-[#353535] rounded-full text-center font-arialRoundedMTBold text-xl font-bold"
        key={styledClasses ? 'mounted' : 'unmounted'}
      >
        C
      </Flex>
      <div
        className={`${
          !isLoading
            ? !notFullWidth
              ? 'w-[calc(100%-50px)]'
              : 'w-[calc(100%-50px)]'
            : ''
        } mt-[15px] ml-[15px] p-2.5 border-[0.5px] border-solid border-[#737785] rounded-md bg-white shadow-message`}
      >
        {children}
      </div>
    </Flex>
  );
};
