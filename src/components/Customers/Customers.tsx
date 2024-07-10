import { useEffect, useState } from 'react';
import { Customer } from '../../types';
import {
  Typography,
  Spin,
  Result,
  Button,
  TableProps,
  Space,
  FormProps,
  Table,
} from 'antd';
import { fetchData } from '../../api';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useModals } from '../../context/modals';

const { Text } = Typography;

export type FieldType = {
  description?: string;
  url?: string;
  id?: string;
  usersLimit?: number;
};

export const Customers = () => {
  const navigate = useNavigate();
  const { openModal, setActiveItem } = useModals();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const res = await fetchData('/customers');
        const customersData = (await res.json()) as Customer[];

        setCustomers(customersData);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
        extra={<Button key="fetch customers data">Try again</Button>}
      />
    );
  }

  const addCustomer: FormProps<FieldType>['onFinish'] = async (values) => {
    const { description, usersLimit } = values;

    const res = await fetchData(
      '/customer',
      'POST',
      JSON.stringify({
        description: description!,
        usersLimit: +usersLimit!,
      }),
    );

    if (res.ok) {
      const newCustomer = (await res.json()) as Customer;

      setCustomers([...customers, newCustomer]);

      return newCustomer;
    }

    return false;
  };

  const deleteCustomer = async (customerId: string) => {
    const res = await fetchData(`/customers/${customerId}`, 'DELETE');

    if (res.ok) {
      setCustomers(customers.filter(({ id }) => id !== customerId));

      return true;
    }

    return false;
  };

  const columns: TableProps<Customer>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Number of users',
      dataIndex: 'usersLimit',
      key: 'usersLimit',
      render: (_, record) => <Text>{record.usersLimit}</Text>,
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
              navigate(`${record.id}`);
            }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              setActiveItem({
                customer: record,
                deleteCustomer: async () => {
                  await deleteCustomer(record.id);
                },
              });
              openModal('DeleteCustomerModal');
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-12">
      <Table
        size="small"
        columns={columns}
        dataSource={customers}
        pagination={
          customers.length > 5
            ? { pageSize: 5, position: ['bottomCenter'] }
            : false
        }
      />
      <Button
        onClick={() => {
          setActiveItem({ addCustomer });
          openModal('AddCustomerModal');
        }}
        className={customers.length > 5 ? `` : 'mt-12'}
      >
        Add new customer
      </Button>
    </div>
  );
};
