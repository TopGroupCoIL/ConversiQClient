import { useState } from 'react';
import { Modal, Typography } from 'antd';
import { useModals } from '../context/modals';

const { Text } = Typography;

export const DeleteCustomerUserModal = () => {
  const { showDeleteCustomerUserModal, closeModal, activeItem } = useModals();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onDelete = async () => {
    setConfirmLoading(true);

    activeItem?.deleteCustomerUser && (await activeItem.deleteCustomerUser());

    setConfirmLoading(false);

    closeModal();
  };

  return (
    <Modal
      open={showDeleteCustomerUserModal}
      key={
        showDeleteCustomerUserModal
          ? 'openDeleteCustomerUserModal'
          : 'closedDeleteCustomerUserModal'
      }
      onCancel={() => closeModal()}
      onOk={onDelete}
      title="Are you sure you want to delete this customer administrator?"
      confirmLoading={confirmLoading}
    >
      <Text strong>{activeItem?.customerUser?.name}</Text>
    </Modal>
  );
};
