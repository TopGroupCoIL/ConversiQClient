import { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  FormInstance,
  Button,
  Input,
  Select,
  Row,
  Col,
} from 'antd';
import { useModals } from '../context/modals';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { QuestionPart } from '../types';

const { Option } = Select;

type FieldType = {
  [key: string]: {
    name?: string;
    isMeasure: boolean;
  };
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

export const CorrectExpressionModal = () => {
  const { showCorrectExpressionModal, closeModal, activeItem } = useModals();

  const [parts, setParts] = useState<number[]>([1, 2, 3]);

  const [form] = Form.useForm();

  const onFinish = async (values: FieldType) => {
    const parts = Object.entries(values)
      .filter((entry) => entry[1].name)
      .map((entry) => entry[1]) as QuestionPart[];

    if (!parts.length) {
      closeModal();

      return;
    }

    activeItem?.correctExpression && activeItem.correctExpression(parts);

    closeModal();
  };

  const onAddCorrectionPart = () => {
    setParts([...parts, parts.length + 1]);
  };

  const onDeletePartClick = (partNumberToDelete: number) => {
    setParts(parts.filter((partNumber) => partNumber !== partNumberToDelete));
  };

  return (
    <Modal
      open={showCorrectExpressionModal}
      key={
        showCorrectExpressionModal
          ? 'openCorrectExpressionModal'
          : 'closedCorrectExpressionModal'
      }
      onCancel={() => closeModal()}
      title="Please, correct the expression"
      footer={() => <></>}
    >
      <Form form={form} onFinish={onFinish} preserve={false}>
        {parts.map((partNumber, index) => (
          <Row gutter={24} key={`part_${partNumber}`}>
            <Col span={10}>
              <Form.Item name={[`part${partNumber}`, `name`]} label="Value">
                <Input placeholder="value" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name={[`part${partNumber}`, 'isMeasure']}
                label="Type"
                initialValue={false}
              >
                <Select placeholder="Select a type" defaultValue={false}>
                  <Option value={false}>Member</Option>
                  <Option value={true}>Measure</Option>
                </Select>
              </Form.Item>
            </Col>
            {index > 2 && (
              <Col span={4}>
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    onDeletePartClick(partNumber);
                  }}
                />
              </Col>
            )}
          </Row>
        ))}
        <Row gutter={24}>
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={onAddCorrectionPart}
          >
            Add correction part
          </Button>
        </Row>
        <Form.Item>
          <SubmitButton form={form}>Ok</SubmitButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};
