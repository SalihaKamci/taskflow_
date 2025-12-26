/* eslint-disable react-hooks/set-state-in-effect */
import { Modal, Form, Input } from "antd";
import api from "../../../api/axios";


const CreateEmployessModal = ({ open, onClose, onCreated }) => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            const token = localStorage.getItem("token");

            await api.post("/employees", values, { headers: { Authorization: `Bearer ${token}` } }
            );

            form.resetFields();
            onClose();
            onCreated();
        } catch (error) {
            console.log(" admin employeeAdd error", error);
        }
    };
    return (
        <Modal
            title="Yeni Çalışan Oluştur"
            open={open}
            onCancel={onClose}
            onOk={() => form.submit()}
            afterClose={() => form.resetFields()}
            destroyOnClose
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="fullName"
                    label="Ad Soyad"
                    rules={[{ required: true, message: "Ad Soyad zorunlu" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                   name="email"
                    label="Email"
                    rules={[
                        { required: true, message: "Email zorunlu" },
                        { type: "email", message: "Geçerli email gir" },
                    ]}
                >
                    <Input />
                </Form.Item>

            </Form>
        </Modal>
    );

};

export default CreateEmployessModal;