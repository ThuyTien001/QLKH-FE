import { apiStaff } from "@/api/api-staff";
import { StaffData } from "@/type";
import { Button, Form, Input, message } from "antd"
import { useEffect } from "react";

export const ModalAccount =  ()=> {
    const [form] = Form.useForm();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            alert("Vui lòng đăng nhập lại");
            return;
        }
        try{
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const decodedToken = JSON.parse(atob(base64));
            const staff_id = decodedToken.staff_id;
            if(!staff_id){
                alert("Không xác định được nhân viên, vui lòng đăng nhập lại!");
                return;
            }
            apiStaff.getAll()
                .then((response) =>{
                    //Tìm nhân viên theo staff_id
                    const user = response.data.find((emp: any) => emp.staff_id === staff_id)
                    if(!user){
                        alert("Không tìm thấy nhân viên, vui lòng đăng nhập lại!");
                        return
                    }
                    form.setFieldsValue(user);
                })
        }catch(error){
            console.error("Lỗi khi giải mã token:", error);
            alert("Token không hợp lệ, vui lòng đăng nhập lại!");
        }
    }, [form]);
    const onFinish = async (values: StaffData)=>{
        

        try{
            const token = localStorage.getItem('token');
                if(!token){
                    alert("Vui lòng đăng nhập lại");
                    return;
                }
                // console.log("data update: ", values);
                const base64Url = token.split(".")[1];
                const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
                const decodedToken = JSON.parse(atob(base64));
                const staff_id = decodedToken.staff_id;
                const data = {
                    ...values,
                    staff_id
                }
            const response = await apiStaff.updateStaff(data);
            if(response){
                message.success("Cập nhật thông tin nhân viên thành công!");
                form.resetFields();
                window.location.reload();
            }else{
                message.error(response.message || "Cập nhật thông tin nhân viên thất bại!")
            }
        }catch(error: unknown){
            if(error instanceof Error){
                console.error("Lỗi khi cập nhật thông tin nhân viên", error.message);
                message.error("Cập nhật thông tin nhân viên thất bại");
            }else{
                console.error("Lỗi không xác định", error);
                message.error("Cập nhật thông tin nhân viên thất bại!");
            }
        }
    }
    return(
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
        >
            <Form.Item
                label = "Mã nhân viên"
                name="staff_code"
            >
                <Input disabled/>
            </Form.Item>
            <Form.Item
                label= "Họ tên nhân viên"
                name= "staff_name"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label= "Chức vụ"
                name= "staff_position"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label= "Số điện thoại"
                name= "staff_phone"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label= "Email"
                name= "staff_email"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label= "Địa chỉ"
                name= "staff_address"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label= "Username"
                name= "staff_username"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label= "Password"
                name= "staff_password"
            >
                <Input.Password
                    // prefix={<LockOutlined className="site-form-item-icon" />}
                />
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" style={{color: "white"}}>
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
    )
}