import { useState } from 'react';
import { Button, Modal } from 'antd';
import { useModals } from '../context/modals';

export const CreateNewChatModal = () => {
  const { showCreateNewChatModal, closeModal, activeItem } = useModals();

  const [isLoading, setIsLoading] = useState(false);

  const onLeave = () => {
    activeItem?.onLeave && activeItem?.onLeave();

    closeModal();
  };

  const onSaveAndLeave = async () => {
    setIsLoading(true);

    if (activeItem?.onLeave && activeItem.saveChat) {
      await activeItem.saveChat();

      activeItem.onLeave();
    }

    setIsLoading(false);

    closeModal();
  };

  const onCancel = () => {
    closeModal();
  };

  const footer = !activeItem?.isHistorySaved
    ? [
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="saveAndStart"
          type="primary"
          loading={isLoading}
          onClick={onSaveAndLeave}
        >
          Save and leave
        </Button>,
        <Button key="link" type="primary" onClick={onLeave}>
          Leave
        </Button>,
      ]
    : [
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="link" type="primary" onClick={onLeave}>
          Leave
        </Button>,
      ];

  return (
    <Modal
      open={showCreateNewChatModal}
      key={
        showCreateNewChatModal
          ? 'openCreateNewChatModal'
          : 'closedCreateNewChatModal'
      }
      onCancel={() => closeModal()}
      title="New conversation"
      footer={footer}
    >
      <p>Do you want to leave current chat?</p>
    </Modal>
  );
};
