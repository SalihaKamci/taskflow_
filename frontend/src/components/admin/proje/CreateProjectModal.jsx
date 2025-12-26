import { Modal, Form, Input, DatePicker, Select } from "antd";
 import api from "../../../api/axios"

const CreateProjectModal = ({ open, onClose, onCreated }) => {

const handleSubmit = async (values) => {

  try {
    

    const token = localStorage.getItem("token");

    const payload = {
      name: values.name,
      description: values.description,
      status: values.status,
      startDate: values.dates[0].format("YYYY-MM-DD"),
      endDate: values.dates[1].format("YYYY-MM-DD"),
    };

    await api.post("/projects", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    form.resetFields();
    onClose();
    onCreated();
  } catch (error) {
    console.log("Task dueDateformat error", error);
  }
};

  const [form] = Form.useForm();
  return (
<Modal
  title="Yeni Proje Ekle"
  open={open}
  onCancel={onClose}
  onOk={() => form.submit()}
  destroyOnClose
     
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
      
        <Form.Item
          label="Proje Adı"
          name="name"
          rules={[{ required: true, message: "Proje adı zorunlu" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Açıklama" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Tarih Aralığı"
          name="dates"
          rules={[{ required: true, message: "Tarih seçin" }]}
        >
          <DatePicker.RangePicker className="w-full" />
        </Form.Item>

        <Form.Item
          label="Durum"
          name="status"
          initialValue="Active"
        >
          <Select
            options={[
              { value: "Active", label: "Active" },
              { value: "Completed", label: "Completed" },
              { value: "On Hold", label: "On Hold" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProjectModal;
