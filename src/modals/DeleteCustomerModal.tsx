import { useState } from 'react';
import { Modal, Typography } from 'antd';
import { useModals } from '../context/modals';

const { Text } = Typography;

export const DeleteCustomerModal = () => {
  const { showDeleteCustomerModal, closeModal, activeItem } = useModals();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onDelete = async () => {
    setConfirmLoading(true);

    activeItem?.deleteCustomer && (await activeItem.deleteCustomer());

    setConfirmLoading(false);

    closeModal();
  };

  return (
    <Modal
      open={showDeleteCustomerModal}
      key={
        showDeleteCustomerModal
          ? 'openDeleteCustomerModal'
          : 'closedDeleteCustomerModal'
      }
      onCancel={() => closeModal()}
      onOk={onDelete}
      title="Are you sure you want to delete this customer?"
      confirmLoading={confirmLoading}
    >
      <Text strong>{activeItem?.customer?.description}</Text>
    </Modal>
  );
};
