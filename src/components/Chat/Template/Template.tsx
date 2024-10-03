import { Flex } from 'antd';
import { HowToUse } from './HowToUse';

export const Template = () => {
  return (
    <div className="w-full h-[calc(100%-64px)] md:h-[calc(100%-128px)] grid grid-cols-1 grid-rows-[1fr_200px_80px] justify-items-center items-center">
      <Flex
        vertical
        justify="center"
        align="center"
        className="w-full h-full" // bg-wave bg-no-repeat bg-[length:100%] bg-center
      >
        <Flex
          vertical
          justify="center"
          align="center"
          className="h-full self-center aspect-square bg-ellipse bg-no-repeat bg-contain"
        >
          <span className="font-sans font-bold text-[60px]">ConversiQ</span>
          <span className="text-[30px] tracking-[10px]">By Panorama</span>
        </Flex>
      </Flex>
      <HowToUse />
      <div className="w-4/5 font-bold text-center">
        Copyright © 2024 Panorama Software. All rights reserved.
      </div>
    </div>
  );
};
