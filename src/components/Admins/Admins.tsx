import { useEffect, useState } from 'react';
import { Admin } from '../../types';
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
import { fetchData } from '../../api';
import { useModals } from '../../context/modals';

const { Text } = Typography;

export type FieldType = {
  name?: string;
  email?: string;
  alias?: string;
};

export const Admins = () => {
  const { openModal, setActiveItem } = useModals();

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const fetchAdminsData = async () => {
    try {
      setLoading(true);

      const res = await fetchData('/sysadmins');
      const adminsData = (await res.json()) as Admin[];

      setAdmins(adminsData);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminsData();
  }, []);

  const addAdmin: FormProps<FieldType>['onFinish'] = async (values) => {
    const { name, email, alias } = values;

    const res = await fetchData(
      '/sysadmin',
      'POST',
      JSON.stringify({ id: email, name, alias }),
    );

    if (res.ok) {
      const newAdmin = (await res.json()) as Admin;

      setAdmins([...admins, newAdmin]);

      return newAdmin;
    }

    return false;
  };

  const deleteAdmin = async (adminId: string) => {
    const res = await fetchData(`/sysadmins/${adminId}`, 'DELETE');

    if (res.ok) {
      setAdmins(admins.filter(({ id }) => id !== adminId));

      return true;
    }

    return false;
  };

  const editAdmin = async (values: FieldType) => {
    const { email, name, alias } = values;

    const deleteRes = await fetchData(`/sysadmins/${email}`, 'DELETE');

    if (!deleteRes.ok) {
      return admins.find(({ id }) => id === values.email)!;
    }

    const addRes = await fetchData(
      '/sysadmin',
      'POST',
      JSON.stringify({ id: email, name, alias }),
    );

    if (addRes.ok) {
      const updatedAdmins = admins.map((admin) => {
        if (admin.id === email) {
          return {
            ...admin,
            name: name!,
            alias: alias!,
          };
        }

        return admin;
      });

      setAdmins(updatedAdmins);
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
        extra={
          <Button key="fetch admins data" onClick={fetchAdminsData}>
            Try again
          </Button>
        }
      />
    );
  }

  const columns: TableProps<Admin>['columns'] = [
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
              setActiveItem({ admin: record, editAdmin });
              openModal('EditAdminModal');
            }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              setActiveItem({
                admin: record,
                deleteAdmin: async () => {
                  await deleteAdmin(record.id);
                },
              });
              openModal('DeleteAdminModal');
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
        dataSource={admins}
        pagination={
          admins.length > 5
            ? { pageSize: 5, position: ['bottomCenter'] }
            : false
        }
      />
      <Button
        onClick={() => {
          setActiveItem({ addAdmin });
          openModal('AddAdminModal');
        }}
        className={admins.length > 5 ? `` : 'mt-12'}
      >
        Add new administrator
      </Button>
    </div>
  );
};
