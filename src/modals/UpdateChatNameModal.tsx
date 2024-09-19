import { useEffect, useState } from 'react';
import { Modal, Form, FormInstance, Button, Input } from 'antd';
import { useModals } from '../context/modals';

type FieldType = {
  chatName: string;
};

type SubmitButtonProps = {
  form: FormInstance;
  isLoading?: boolean;
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

export const UpdateChatNameModal = () => {
  const { showUpdateChatNameModal, closeModal, activeItem } = useModals();

  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: FieldType) => {
    if (activeItem?.updateChatName) {
      setIsSubmitting(true);

      await activeItem.updateChatName(values.chatName);

      setIsSubmitting(false);
    }

    closeModal();
  };

  return (
    <Modal
      open={showUpdateChatNameModal}
      key={
        showUpdateChatNameModal
          ? 'openUpdateChatNameModal'
          : 'closedUpdateChatNameModal'
      }
      onCancel={() => closeModal()}
      title="Update the name"
      footer={() => <></>}
    >
      <Form
        form={form}
        onFinish={onFinish}
        preserve={false}
        initialValues={{
          chatName: activeItem?.chatName ? activeItem.chatName : '',
        }}
      >
        <Form.Item
          name="chatName"
          label="Chat name"
          rules={[
            {
              required: true,
              message: "The name can't be empty. Please, fill it.",
            },
          ]}
        >
          <Input placeholder="Chat name" />
        </Form.Item>
        <Form.Item>
          <SubmitButton form={form} isLoading={isSubmitting}>
            Update
          </SubmitButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};
