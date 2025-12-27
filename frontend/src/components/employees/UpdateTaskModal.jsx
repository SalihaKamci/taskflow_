import { Modal, Form, Select, message } from "antd";
import api from "../../api/axios";
import { useEffect } from "react";

const UpdateTaskModal = ({ open, onClose, task, onUpdated }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        status: task.status,
      });
    }
  }, [task, form]);

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.patch(
        `/tasks/${task.id}/status`,
        { status: values.status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("UPDATED TASK:", res.data);

      message.success("Task status güncellendi");
      onUpdated();
      onClose();
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Task güncellenemedi");
    }
  };

  return (
    <Modal
      title="Task Status Güncelle"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Kaydet"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Status seçiniz" }]}
        >
          <Select>
            <Select.Option value="Pending">Pending</Select.Option>
            <Select.Option value="In Progress">In Progress</Select.Option>
            <Select.Option value="Completed">Completed</Select.Option>
            <Select.Option value="Blocked">Blocked</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTaskModal;
