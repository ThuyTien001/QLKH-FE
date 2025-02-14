import { apiPartner } from "@/api/api-partner";
import { dataPartner } from "@/type";
import { Button, Form, Input, message } from "antd"
// import { useState } from "react";

export const ModalAddPartner = () => {
    const [form] = Form.useForm();
    // const [partner, setPartner] = useState<any[]>([]);
    const onFinish = async (values: dataPartner)=> {
        try{
            const response = await apiPartner.addPartner(values);
            if(response){
                message.success("Thêm đối tác thành công");
                form.resetFields();
                window.location.reload();
            }else{
                message.error("Thêm đối tác thất bại")
            }
        }catch(error){
            if(error){
                console.error("Lỗi khi thêm đối tác", error);
                message.error("thêm đối tác thất bại");
            }else{
                console.error("Lỗi không xác định khi thêm đối tác");
                message.error("Thêm đối tác thất bại")
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
                label="Mã đối tác"
                name="partner_code"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Tên đối tác"
                name="partner_name"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Số điện thoại"
                name="partner_phone"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Email"
                name="partner_email"
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
}