import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/auth';
import { fetchData } from '../../../api';
import { CustomerUser } from '../../../types';
import { Flex, Spin } from 'antd';

export const Settings = () => {
  const { user } = useAuthContext();

  const [customerUsersLimit, setCustomerUsersLimit] = useState('-');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCustomerData = async () => {
      setIsLoading(true);

      try {
        const res = await fetchData(`/customers/${user?.tenant}/users`);
        const customerUsers = (await res?.json()) as CustomerUser[];

        setCustomerUsersLimit(customerUsers.length.toString());
      } catch (e) {
        setIsLoading(false);
      }

      setIsLoading(false);
    };

    if (user) {
      fetchCustomerData();
    }
  }, [user]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" className="w-full h-full">
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <Flex vertical className="text-4xl">
      <div className="mb-4">{user?.tenant}</div>
      <div>Number of users: {customerUsersLimit}</div>
    </Flex>
  );
};
