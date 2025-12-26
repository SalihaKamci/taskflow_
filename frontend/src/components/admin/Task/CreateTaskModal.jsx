/* eslint-disable react-hooks/set-state-in-effect */
import { Modal, Form, Input, DatePicker, Select } from "antd";
import { useEffect, useState } from "react";
import api from "../../../api/axios"


const CreateTaskModal = ({ open, onClose, onCreated  }) => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [employeeLoading, setEmployeeLoading] = useState(false);
  
const handleSubmit = async (values) => {
  try {
    const token = localStorage.getItem("token");

    const payload = {
      ...values,
      dueDate: values.dueDate.format("YYYY-MM-DD"),
    };

    await api.post("/tasks", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    form.resetFields();
    onClose();
    onCreated();
  } catch (error) {
    console.log("Task dueDateformat error", error);
  }
};
    useEffect(() => {
        if (!open) return;

        const token = localStorage.getItem("token");
        setLoading(true);

        api.get("/projects", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => { setProjects(res.data) })
            .catch(() => { console.log("projeler gelmedi"); })
            .finally(() => setLoading(false));

        setEmployeeLoading(true);
        api.get("/users/employees", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => setEmployees(res.data))
            .catch(() => console.log("Employee fetch error"))
            .finally(() => setEmployeeLoading(false));

    }, [open]);


    const [form] = Form.useForm();

    return (
        <Modal
            title="Yeni Task Oluştur"
            open={open}
            onCancel={onClose}
            onOk={() => form.submit()}
            afterClose={() => form.resetFields()}
            destroyOnClose
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="title"
                    label="Task Başlığı"
                    rules={[{ required: true, message: "Başlık zorunlu" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="description" label="Açıklama">
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item
                    name="projectId"
                    label="Proje"
                    rules={[{ required: true, message: "Proje seçilmelidir" }]}
                >
                    <Select
                        loading={loading}
                        placeholder="Proje seçiniz"
                        options={projects.map((project) => ({
                            value: project.id,
                            label: project.name,
                        }))}
                    />
                </Form.Item>

                <Form.Item name="assignedUserId" label="Çalışan"  rules={[{ required: true, message: "atama yapılmalıdır" }]}>
                    <Select
                       
                        loading={employeeLoading}
                        placeholder="Çalışan"
                        
                        options={employees.map((emp) => ({
                            value: emp.id,
                            label: emp.fullName,
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    name="dueDate"
                    label="Bitiş Tarihi"
                    rules={[{ required: true, message: "Tarih zorunlu" }]}
                >
                    <DatePicker className="w-full" />
                </Form.Item>

                <Form.Item name="priority" label="Öncelik">
                    <Select
                        placeholder="Seçiniz"
                        options={[
                            { value: "Critical", label: "Critical" },
                            { value: "High", label: "High" },
                            { value: "Medium", label: "Medium" },
                            { value: "Low", label: "Low" },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateTaskModal;