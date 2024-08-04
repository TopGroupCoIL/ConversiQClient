import { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useModals } from '../context/modals';
import { FieldType } from '../components/Customers/CustomerUsers/CustomerUsers';

export const EditCustomerUserModal = () => {
  const { showEditCustomerUserModal, closeModal, activeItem } = useModals();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = async (values: FieldType) => {
    setConfirmLoading(true);

    activeItem?.editCustomerUser && (await activeItem.editCustomerUser(values));

    setConfirmLoading(false);

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
      title={`Edit ${activeItem?.customerUser?.name}`}
      footer={null}
    >
      <Form
        onFinish={onFinish}
        preserve={false}
        initialValues={{
          email: activeItem?.customerUser?.id,
          name: activeItem?.customerUser?.name,
          alias: activeItem?.customerUser?.alias,
        }}
      >
        <Form.Item name={['name']} label="Name" rules={[{ required: true }]}>
          <Input placeholder="name" />
        </Form.Item>
        <Form.Item
          name={['email']}
          label="Email"
          rules={[{ type: 'email', required: true }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item label="Alias" name={['alias']} rules={[{ type: 'email' }]}>
          <Input placeholder="alias" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={confirmLoading}>
            Edit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
