import { useEffect, useState } from 'react';
import { Customer, CustomerUser } from '../../../types';
import {
  Spin,
  Result,
  Button,
  Table,
  TableProps,
  Space,
  FormProps,
  Typography,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { fetchData } from '../../../api';
import { useModals } from '../../../context/modals';
import { useParams } from 'react-router-dom';
import { Description } from './Description';

const { Text } = Typography;

export type FieldType = {
  name?: string;
  email?: string;
  alias?: string;
};

export const CustomerUsers = () => {
  const { customerId } = useParams();
  const { openModal, setActiveItem } = useModals();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customerUsers, setCustomerUsers] = useState<CustomerUser[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const res = await fetchData(`/customers/${customerId}`);
        const customerData = (await res.json()) as Customer;

        setCustomer(customerData);

        return res.ok;
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    const getCustomerUsers = async () => {
      try {
        const res = await fetchData(`/customers/${customerId}/users`);
        const customerUsersData = (await res.json()) as CustomerUser[];

        setCustomerUsers(customerUsersData);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    const getPageData = async () => {
      try {
        const customerRes = await getCustomer();

        customerRes && (await getCustomerUsers());
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getPageData();
  }, []);

  const addCustomerUser: FormProps<FieldType>['onFinish'] = async (values) => {
    const { name, email, alias } = values;

    const res = await fetchData(
      '/customers/user',
      'POST',
      JSON.stringify({
        name,
        id: email,
        alias,
        tenant: customerId,
        isAdmin: true,
        dbUserName: null,
        dbPassword: null,
        picture: null,
        dataSources: null,
      }),
    );

    if (res.ok) {
      const newCustomerUser = (await res.json()) as CustomerUser;

      setCustomerUsers([...customerUsers, newCustomerUser]);

      return newCustomerUser;
    }

    return false;
  };

  const deleteCustomerUser = async (customerUserId: string) => {
    const res = await fetchData(
      `/customers/${customerId}/users/${customerUserId}`,
      'DELETE',
    );

    if (res.ok) {
      setCustomerUsers(customerUsers.filter(({ id }) => id !== customerUserId));

      return true;
    }

    return false;
  };

  const editCustomerUser = async (values: FieldType) => {
    const { email, name, alias } = values;

    const res = await fetchData(
      '/customers/user',
      'PUT',
      JSON.stringify({
        name,
        id: email,
        alias,
        tenant: customerId,
        isAdmin: true,
        dbUserName: null,
        dbPassword: null,
        picture: null,
        dataSources: null,
      }),
    );

    if (res.ok) {
      const updatedCustomerUsers = customerUsers.map((customerUser) => {
        if (customerUser.id === email) {
          return {
            ...customerUser,
            name: name!,
            alias: alias!,
          };
        }

        return customerUser;
      });

      setCustomerUsers(updatedCustomerUsers);
    }

    return false;
  };

  if (isLoading) {
    return (
      <Spin
        size="large"
        className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4"
      />
    );
  }

  if (isError) {
    return (
      <Result
        status="error"
        title="Something went wrong"
        subTitle="Please check your connection and try again"
        extra={<Button key="fetch admins data">Try again</Button>}
      />
    );
  }

  const columns: TableProps<CustomerUser>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_, record) => <Text copyable>{record.id}</Text>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              setActiveItem({ customerUser: record, editCustomerUser });
              openModal('EditCustomerUserModal');
            }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              setActiveItem({
                customerUser: record,
                deleteCustomerUser: async () => {
                  await deleteCustomerUser(record.id);
                },
              });
              openModal('DeleteCustomerUserModal');
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-12">
      {customer && <Description customer={customer} />}
      <Table
        size="small"
        columns={columns}
        dataSource={customerUsers}
        pagination={{ pageSize: 5, position: ['bottomCenter'] }}
      />
      <Button
        onClick={() => {
          setActiveItem({ addCustomerUser });
          openModal('AddCustomerUserModal');
        }}
        className={customerUsers.length ? `` : 'mt-12'}
      >
        Add a new customer administrator
      </Button>
    </div>
  );
};
