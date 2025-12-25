import { Modal, Form, Input, DatePicker, Select } from "antd";
import api from "../../api/axios";

const CreateProjectModal = ({ open, onClose, onCreated }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("token");

    const payload = {
      name: values.name,
      description: values.description,
      startDate: values.dates[0].format("YYYY-MM-DD"),
      endDate: values.dates[1].format("YYYY-MM-DD"),
      status: values.status,
    };

    try {
      const res = await api.post("/projects", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

    
      onCreated(res.data);

      form.resetFields();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Proje eklenemedi");
    }
  };

  return (
    <Modal
      title="Yeni Proje Ekle"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Kaydet"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
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
