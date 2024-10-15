import { Flex } from 'antd';
import { Link } from 'react-router-dom';

export const Support = () => (
  <Flex
    vertical
    align="center"
    justify="center"
    className="w-full h-full text-4xl"
  >
    To contact ConversiQ support send an email to:{' '}
    <Link
      to="#"
      onClick={(e) => {
        window.location.href = 'mailto:support@panorama.com';
        e.preventDefault();
      }}
    >
      support@panorama.com
    </Link>
  </Flex>
);
