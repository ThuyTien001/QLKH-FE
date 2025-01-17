import { apiClass } from "@/api";
import { ClassData } from "@/type";
import { Button, Form, Input, message } from "antd";
export const ModalAddClass = () => {
    const [form] = Form.useForm(); 


    const onFinish = async (values: ClassData) => {
        try {
            // Chuyển timelimit sang số và kiểm tra tính hợp lệ
            const timelimit = parseFloat(values.timelimit as unknown as string);

            if (isNaN(timelimit) || timelimit <= 0) {
                message.error("Thời hạn phải là một số hợp lệ lớn hơn 0.");
                return;
            }

            // Trước khi gửi request, kiểm tra dữ liệu
            console.log("Dữ liệu gửi lên:", {
                class_name: values.class_name,
                timelimit,
            });

            const response = await apiClass.addClass({
                class_name: values.class_name,
                timelimit,
            });
            console.log("API Response:", response);
            
            if (response && response.result.success) {
                message.success("Thêm lớp học thành công!");
                form.resetFields();
                window.location.reload()
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
        }
    };
    return (
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
                <Input type="float" min={1} />
            </Form.Item>
            <Form.Item 
            >
                <Button type="primary" htmlType="submit" className="w-full" style={{ color: "white" }}>
                    Thêm
                </Button>
            </Form.Item>

        </Form>
    )
}