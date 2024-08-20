import { useState } from 'react';
import { Modal } from 'antd';
import { useModals } from '../context/modals';

export const SaveChatModal = () => {
  const { showSaveChatModal, closeModal, activeItem } = useModals();

  const [isLoading, setIsLoading] = useState(false);

  const onSave = async () => {
    setIsLoading(true);

    activeItem?.saveChat && (await activeItem.saveChat());

    setIsLoading(false);

    closeModal();
  };

  return (
    <Modal
      open={showSaveChatModal}
      key={showSaveChatModal ? 'openSaveChatModal' : 'closedSaveChatModal'}
      title="Save the conversation"
      okText="Save"
      onOk={onSave}
      onCancel={() => {
        closeModal();
      }}
      confirmLoading={isLoading}
    >
      <p>Do you want to save the conversation?</p>
    </Modal>
  );
};
