import { Flex } from 'antd';
import { Customer } from '../../../../types';
import { Name } from './Name';
import { NumberOfUsers } from './NumberOfUsers';

type DescriptionProps = {
  customer: Customer;
};

export const Description = ({ customer }: DescriptionProps) => (
  <Flex justify="space-evenly" className="w-full mb-12">
    <Name customer={customer} />
    <NumberOfUsers customer={customer} />
  </Flex>
);
