import { Typography } from 'antd';

export const HowToUse = () => {
  return (
    <div className="relative w-4/5 max-w-[482px] px-[30px] py-[20px] border border-solid border-[#353535] rounded text-center bg-ellipse bg-no-repeat bg-contain">
      <span className="w-[175px] font-bold absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3.5 bg-babyPowder">
        How to use ConversiQ
      </span>
      <Typography.Text>
        Write down which data are you looking for and you will receive a graphic
        output, you can save the conversation and send it to colleagues
      </Typography.Text>
    </div>
  );
};
