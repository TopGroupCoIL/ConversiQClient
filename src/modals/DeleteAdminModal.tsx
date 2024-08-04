import { useState } from 'react';
import { Modal, Typography } from 'antd';
import { useModals } from '../context/modals';

const { Text } = Typography;

export const DeleteAdminModal = () => {
  const { showDeleteAdminModal, closeModal, activeItem } = useModals();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onDelete = async () => {
    setConfirmLoading(true);

    activeItem?.deleteAdmin && (await activeItem.deleteAdmin());

    setConfirmLoading(false);

    closeModal();
  };

  return (
    <Modal
      open={showDeleteAdminModal}
      key={
        showDeleteAdminModal ? 'openDeleteAdminModal' : 'closedDeleteAdminModal'
      }
      onCancel={() => closeModal()}
      onOk={onDelete}
      title="Are you sure you want to delete this admin?"
      confirmLoading={confirmLoading}
    >
      <Text strong>{activeItem?.admin?.name}</Text>
    </Modal>
  );
};
