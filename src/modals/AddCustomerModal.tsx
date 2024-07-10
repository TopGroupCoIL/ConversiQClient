import { Modal, Form, FormInstance, Button, Input, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { FieldType } from '../components/Customers/Customers';
import { useModals } from '../context/modals';

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

export const AddCustomerModal = () => {
  const { showAddCustomerModal, closeModal, activeItem } = useModals();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values: FieldType) => {
    setConfirmLoading(true);

    activeItem?.addCustomer && (await activeItem.addCustomer(values));

    setConfirmLoading(false);

    closeModal();
  };

  return (
    <Modal
      open={showAddCustomerModal}
      key={
        showAddCustomerModal ? 'openAddCustomerModal' : 'closedAddCustomerModal'
      }
      onCancel={() => closeModal()}
      title="Add a new customer"
      footer={() => <></>}
    >
      <Form form={form} onFinish={onFinish} preserve={false}>
        <Form.Item
          name={['description']}
          label="Name"
          rules={[{ required: true, message: `'name' is required` }]}
        >
          <Input placeholder="name" />
        </Form.Item>
        <Form.Item
          name={['usersLimit']}
          label="Number of users"
          rules={[{ type: 'number', required: true, min: 1 }]}
        >
          <InputNumber placeholder="users limit" />
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
