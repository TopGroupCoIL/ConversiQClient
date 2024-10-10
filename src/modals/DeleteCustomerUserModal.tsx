import { useState } from 'react';
import { Button, Modal } from 'antd';
import { useModals } from '../context/modals';

export const DeleteCustomerUserModal = () => {
  const { showDeleteCustomerUserModal, closeModal, activeItem } = useModals();

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);

    if (activeItem?.userIdToDelete) {
      await activeItem.deleteUser?.(activeItem.userIdToDelete);
    }

    setIsLoading(false);

    closeModal();
  };

  const onCancel = () => {
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
      title="Delete a user"
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="link"
          type="primary"
          danger
          loading={isLoading}
          onClick={onDelete}
        >
          Delete
        </Button>,
      ]}
    >
      <p>Do you want to delete the user?</p>
    </Modal>
  );
};
