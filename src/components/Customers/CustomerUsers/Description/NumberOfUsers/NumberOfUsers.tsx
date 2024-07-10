import { ChangeEvent, useEffect, useState } from 'react';
import { Input, Space } from 'antd';
import {
  CheckCircleTwoTone,
  EditOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Customer } from '../../../../../types';
import { fetchData } from '../../../../../api';

type NumberOfUsersProps = {
  customer: Customer;
};

export const NumberOfUsers = ({ customer }: NumberOfUsersProps) => {
  const { usersLimit: initialLimit } = customer;

  const [limit, setLimit] = useState(initialLimit);
  const [isLoading, setLoading] = useState(false);
  const [isCompleted, setCompleted] = useState(false);

  useEffect(() => {
    if (isCompleted) {
      setTimeout(() => {
        setCompleted(false);
      }, 1500);
    }
  }, [isCompleted]);

  const onLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e) {
      return;
    }

    setLimit(+e.target.value);
  };

  const onLimitChangeConfirm = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (!e) {
      return;
    }

    if (!limit) {
      setLimit(initialLimit);

      return;
    }

    if (initialLimit === limit) {
      return;
    }

    try {
      setLoading(true);

      const res = await fetchData(
        `/customer`,
        'PUT',
        JSON.stringify({
          ...customer,
          usersLimit: +limit,
        }),
      );

      if (!res.ok) {
        setLimit(initialLimit);
      }

      setCompleted(true);
      setLoading(false);
    } catch (e) {
      setLimit(initialLimit);
      setLoading(false);
    }
  };

  return (
    <Space>
      Number of users -{' '}
      <Input
        value={limit}
        disabled={isLoading}
        suffix={
          isLoading ? (
            <LoadingOutlined />
          ) : isCompleted ? (
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          ) : (
            <EditOutlined />
          )
        }
        onChange={onLimitChange}
        onPressEnter={onLimitChangeConfirm}
      />
    </Space>
  );
};
