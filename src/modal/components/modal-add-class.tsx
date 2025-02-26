import { apiClass } from "@/api";
import { ClassData } from "@/type";
import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
interface ModalAddClassProps {
    isVisible: boolean;
    onClose: () => void;
    addClassToList: (newClass: ClassData) => void;
}
export const ModalAddClass = ({ isVisible, onClose, addClassToList }: ModalAddClassProps) => {
    const [form] = Form.useForm(); 
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: ClassData) => {
        try {
            setLoading(true);
            // Chuyển timelimit sang số và kiểm tra tính hợp lệ
            // const timelimit = parseFloat(values.timelimit as unknown as string);

            // if (isNaN(timelimit)) {
            //     message.error("Thời hạn phải là một số hợp lệ lớn hơn 0.");
            //     return;
            // }

            // Trước khi gửi request, kiểm tra dữ liệu
            console.log("Dữ liệu gửi lên:", {
                class_name: values.class_name,
                timelimit: values.timelimit,
            });

            const response = await apiClass.addClass({
                class_name: values.class_name,
                timelimit: values.timelimit,
            });
            console.log("API Response:", response);
            
            if (response && response.result.success) {
                message.success("Thêm lớp học thành công!");
                form.resetFields();
                // window.location.reload()
                addClassToList({ class_name: values.class_name, timelimit:values.timelimit }); // Cập nhật danh sách ngay lập tức
                onClose(); // Đóng modal
            }else{
                message.error(response.message || "Thêm lớp học thất bại");
            }
        } catch (error: unknown) {
            // Kiểm tra kiểu dữ liệu của lỗi
            if (error instanceof Error) {
                console.error("Lỗi khi thêm lớp học:", error.message);
                message.error("Thêm lớp học thất bại.");
            } else {
                // Nếu lỗi không phải là đối tượng Error, xử lý theo cách khác
                console.error("Lỗi không xác định:", error);
                message.error("Thêm lớp học thất bại.");
            }
        }finally {
            setLoading(false);
        }
    };
    return (
        <Modal title="Thêm lớp học" open={isVisible} onCancel={onClose} footer={null}>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item 
                    label="Tên lớp học"
                    name="class_name"
                    rules={[{ required: true, message: "Vui lòng nhập tên lớp học!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Thời hạn"
                    name="timelimit"
                >
                    <Input/>
                </Form.Item>
                <Form.Item 
                >
                    <Button type="primary" htmlType="submit" loading={loading} className="w-full" style={{ color: "white" }}>
                        Thêm
                    </Button>
                </Form.Item>

            </Form>
        </Modal>
    )
}