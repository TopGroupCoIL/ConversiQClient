import { Flex } from 'antd';
import { HowToUse } from './HowToUse';

export const Template = () => {
  return (
    <Flex
      vertical
      justify="flex-start"
      align="center"
      className="w-full h-full"
    >
      <Flex
        vertical
        justify="center"
        align="center"
        className="h-[482px] w-[482px] bg-ellipse bg-no-repeat bg-contain"
      >
        <span className="font-sans font-bold text-[60px]">ConversiQ</span>
        <span className="text-[30px] tracking-[10px]">By Panorama</span>
      </Flex>
      <HowToUse />
      <div className="absolute bottom-40 font-bold">
        Copyright © 2024 Panorama Software. All rights reserved.
      </div>
    </Flex>
  );
};
