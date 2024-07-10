import { ChangeEvent, useEffect, useState } from 'react';
import { Input, Space } from 'antd';
import {
  CheckCircleTwoTone,
  EditOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Customer } from '../../../../../types';
import { fetchData } from '../../../../../api';

type NameProps = {
  customer: Customer;
};

export const Name = ({ customer }: NameProps) => {
  const { description: initialName } = customer;

  const [name, setName] = useState(initialName);
  const [isLoading, setLoading] = useState(false);
  const [isCompleted, setCompleted] = useState(false);

  useEffect(() => {
    if (isCompleted) {
      setTimeout(() => {
        setCompleted(false);
      }, 1500);
    }
  }, [isCompleted]);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e) {
      return;
    }

    setName(e.target.value);
  };

  const onNameChangeConfirm = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (!e) {
      return;
    }

    if (!name) {
      setName(initialName);

      return;
    }

    if (initialName === name.trim()) {
      return;
    }

    try {
      setLoading(true);

      const res = await fetchData(
        `/customer`,
        'PUT',
        JSON.stringify({
          ...customer,
          description: name,
        }),
      );

      if (!res.ok) {
        setName(initialName);
      }
      setCompleted(true);
      setLoading(false);
    } catch (e) {
      setName(initialName);
      setLoading(false);
    }
  };

  return (
    <Space>
      Name -{' '}
      <Input
        value={name}
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
        onChange={onNameChange}
        onPressEnter={onNameChangeConfirm}
      />
    </Space>
  );
};
