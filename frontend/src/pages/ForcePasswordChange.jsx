import { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import api from "../api/axios";

const ForcePasswordChange = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.post(
        "/auth/change-password",
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("token", res.data.token);

      message.success("Şifre başarıyla güncellendi");

      window.location.href = "/";
    } catch (err) {
      message.error(
        err.response?.data?.message || "Şifre değiştirilemedi"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={true}
      title="Şifre Değiştirme Zorunlu"
      closable={false}
      maskClosable={false}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Geçici Şifre"
          name="oldPassword"
          rules={[
            { required: true, message: "Geçici şifre zorunlu" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Yeni Şifre"
          name="newPassword"
          rules={[
            { required: true, message: "Yeni şifre zorunlu" },
            { min: 6, message: "En az 6 karakter" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Kaydediliyor..." : "Şifreyi Güncelle"}
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ForcePasswordChange;