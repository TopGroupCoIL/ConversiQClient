import { useEffect, useState } from 'react';
import { Button, Flex, Space, Spin, Table } from 'antd';
import { fetchData } from '../../../api';
import { useAuthContext } from '../../../context/auth';
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { CustomerUser } from '../../../types';
import { useModals } from '../../../context/modals';

export const Users = () => {
  const { user } = useAuthContext();
  const { setActiveItem, openModal } = useModals();

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<CustomerUser[]>([]);

  useEffect(() => {
    const fetchCustomerUsers = async () => {
      setIsLoading(true);

      const res = await fetchData(`/customers/${user?.tenant}/users`);

      if (res.ok) {
        const users = (await res.json()) as CustomerUser[];

        setUsers(users);
      }

      setIsLoading(false);
    };

    if (user) {
      fetchCustomerUsers();
    }
  }, [user]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" className="w-full h-full">
        <Spin size="large" />
      </Flex>
    );
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Admin',
      dataIndex: 'admin',
      key: 'admin',
    },
    {
      title: 'Actions',
      key: 'action',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: { id: string; key: string; name: string }) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              onEditUser(record);
            }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => {
              onDeleteUser(record);
            }}
          />
        </Space>
      ),
    },
  ];

  const dataSource = users.map((user) => ({
    admin: user.isAdmin ? <CheckOutlined /> : '',
    id: user.id,
    name: user.name,
    key: user.id,
  }));

  const onAddUser = () => {
    const addNewUser = async (newUser: CustomerUser) => {
      const res = await fetchData(
        '/customers/user',
        'POST',
        JSON.stringify(newUser),
      );

      if (!res.ok) {
        return;
      }

      setUsers([...users, newUser]);
    };

    setActiveItem({
      dataSources: [...user!.dataSources],
      tenant: user?.tenant,
      addNewUser,
    });

    openModal('AddCustomerUserModal');
  };

  const onEditUser = ({
    id: userIdToEdit,
  }: {
    id: string;
    key: string;
    name: string;
  }) => {
    const userToEdit = users.find(({ id }) => id === userIdToEdit)!;

    const editUser = async (updatedUser: CustomerUser) => {
      const res = await fetchData(
        '/customers/user',
        'PUT',
        JSON.stringify(updatedUser),
      );

      if (!res.ok) {
        return;
      }

      setUsers(
        users.map((user) => {
          if (user.id !== userIdToEdit) {
            return user;
          }

          return updatedUser;
        }),
      );
    };

    setActiveItem({
      customerUser: userToEdit,
      dataSources: user?.dataSources,
      editUser,
    });

    openModal('EditCustomerUserModal');
  };

  const onDeleteUser = ({
    id: userIdToDelete,
  }: {
    id: string;
    key: string;
    name: string;
  }) => {
    const deleteUser = async () => {
      const res = await fetchData(
        `/customers/${user?.tenant}/users/${userIdToDelete}`,
        'DELETE',
      );

      if (!res.ok) {
        return;
      }

      setUsers(users.filter(({ id }) => id !== userIdToDelete));
    };

    setActiveItem({ userIdToDelete, deleteUser });

    openModal('DeleteCustomerUserModal');
  };

  return (
    <Flex vertical className="w-full h-full">
      <div className="w-full mb-8">
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: '100%', y: 55 * 6 }}
          pagination={false}
        />
      </div>
      <Button
        size="large"
        icon={<PlusCircleOutlined />}
        className="w-fit"
        onClick={onAddUser}
      >
        Add a new user
      </Button>
    </Flex>
  );
};
