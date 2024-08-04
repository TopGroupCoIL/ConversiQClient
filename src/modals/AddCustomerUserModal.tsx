import { Modal, Form, Input, Button, FormInstance } from 'antd';
import { useModals } from '../context/modals';
import { useState, useEffect } from 'react';
import { FieldType } from '../components/Customers/CustomerUsers/CustomerUsers';

type SubmitButtonProps = {
  form: FormInstance;
  isLoading: boolean;
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
      .then((values: FieldType) => {
        if (!values.alias) {
          setSubmittable(true);
        }

        setSubmittable(values.alias?.trim() !== values.email);
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

export const AddCustomerUserModal = () => {
  const { showAddCustomerUserModal, closeModal, activeItem } = useModals();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values: FieldType) => {
    setConfirmLoading(true);

    activeItem?.addCustomerUser && (await activeItem.addCustomerUser(values));

    setConfirmLoading(false);

    closeModal();
  };

  return (
    <Modal
      open={showAddCustomerUserModal}
      key={
        showAddCustomerUserModal
          ? 'openAddCustomerUserModal'
          : 'closedAddCustomerUserModal'
      }
      onCancel={() => closeModal()}
      title="Add a new customer administrator"
      footer={() => <></>}
    >
      <Form form={form} onFinish={onFinish} preserve={false}>
        <Form.Item name={['name']} label="Name" rules={[{ required: true }]}>
          <Input placeholder="name" />
        </Form.Item>
        <Form.Item
          name={['email']}
          label="Email"
          rules={[{ type: 'email', required: true }]}
        >
          <Input placeholder="email" />
        </Form.Item>
        <Form.Item label="Alias" name={['alias']} rules={[{ type: 'email' }]}>
          <Input placeholder="alias" />
        </Form.Item>
        <Form.Item>
          <SubmitButton form={form} isLoading={confirmLoading}>
            Add
          </SubmitButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};
