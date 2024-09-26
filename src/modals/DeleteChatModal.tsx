import { useState } from 'react';
import { Button, Modal } from 'antd';
import { useModals } from '../context/modals';

export const DeleteChatModal = () => {
  const { showDeleteChatModal, closeModal, activeItem } = useModals();

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);

    if (activeItem?.deleteChat) {
      await activeItem.deleteChat();
    }

    setIsLoading(false);

    closeModal();
  };

  const onCancel = () => {
    closeModal();
  };

  return (
    <Modal
      open={showDeleteChatModal}
      key={
        showDeleteChatModal ? 'openDeleteChatModal' : 'closedDeleteChatModal'
      }
      onCancel={() => closeModal()}
      title="Delete conversation"
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
      <p>Do you want to delete the conversation?</p>
    </Modal>
  );
};
