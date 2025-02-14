import { apiStaff } from "@/api/api-staff";
import { StaffData } from "@/type";
import { Button, Form, Input, message } from "antd";

export const ModalAddStaff = () => {
    const [form] = Form.useForm();
    const onFinish = async(values: StaffData) =>{
        // console.log("Data gửi lên: ", values);
        try{
            const response = await apiStaff.addStaff(values);
            // console.log("Response từ server:", response);
            if(response){
                message.success("Thêm nhân viên thành công!");
                form.resetFields();
                window.location.reload()
            }else{
                message.error(response.message || "Thêm nhân viên thất bại");
            }
        }catch(error: unknown){
            if(error instanceof Error){
                console.error("Lỗi khi thêm nhân viên", error.message);
                message.error("Thêm nhân viên thất bại");
            }else{
                console.error("Lỗi không xác định", error);
                message.error("Thêm nhân viên thất bại");
            }
        }
        

    }
    return(
        <Form
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label="Mã nhân viên"
                name="staff_code"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Họ tên nhân viên"
                name="staff_name"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Chức vụ"
                name="staff_position"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Số điện thoại"
                name="staff_phone"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Email"
                name="staff_email"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Địa chỉ"
                name="staff_address"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="username"
                name="staff_username"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="staff_password"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Trạng thái"
                name="staff_status"
            >
                <Input/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full" style={{color: "white"}}>
                    Thêm
                </Button>
            </Form.Item>
        </Form>
    )
};