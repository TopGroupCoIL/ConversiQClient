import { useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
  SelectProps,
} from 'antd';
import { useModals } from '../context/modals';
import { CustomerUser } from '../types';

type FieldType = {
  name: string;
  email: string;
  alias: string;
  dataSources: string[];
  isAdmin: number;
};

type SubmitButtonProps = {
  form: FormInstance;
  isLoading?: boolean;
};

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  form,
  isLoading,
  children,
}) => {
  const [submittable, setSubmittable] = useState(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        setSubmittable(true);
      })
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      loading={isLoading}
    >
      {children}
    </Button>
  );
};

export const EditCustomerUserModal = () => {
  const { showEditCustomerUserModal, closeModal, activeItem } = useModals();

  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values: FieldType) => {
    setIsLoading(true);

    const updatedUser: CustomerUser = {
      id: activeItem!.customerUser!.id,
      alias: values.alias,
      tenant: activeItem!.customerUser!.tenant,
      isAdmin: !!values.isAdmin,
      dbUserName: null,
      dbPassword: null,
      picture: null,
      dataSources: values.dataSources,
      name: values.name,
    };

    await activeItem?.editUser?.(updatedUser);

    setIsLoading(false);

    closeModal();
  };

  return (
    <Modal
      open={showEditCustomerUserModal}
      key={
        showEditCustomerUserModal
          ? 'openEditCustomerUserModal'
          : 'closedEditCustomerUserModal'
      }
      onCancel={() => closeModal()}
      title="Edit a user"
      footer={() => <></>}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{
          ...activeItem?.customerUser,
          email: activeItem?.customerUser?.id,
          isAdmin: activeItem?.customerUser?.isAdmin ? 1 : 0,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input user's name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input user's email!" }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item label="Email alias (optional)" name="alias">
          <Input />
        </Form.Item>
        {!!activeItem?.dataSources?.length && (
          <Form.Item name="dataSources" label="Data sources">
            <Select
              mode="multiple"
              placeholder="Select data sources"
              options={
                activeItem.dataSources.map((dataSource) => ({
                  value: dataSource,
                  label: dataSource,
                })) as SelectProps['options']
              }
              allowClear
            />
          </Form.Item>
        )}
        <Form.Item name="isAdmin" label="Admin">
          <Select
            options={
              [
                { value: 1, label: 'Yes' },
                { value: 0, label: 'No' },
              ] as SelectProps['options']
            }
          />
        </Form.Item>
        <Form.Item>
          <SubmitButton form={form} isLoading={isLoading}>
            Ok
          </SubmitButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};
