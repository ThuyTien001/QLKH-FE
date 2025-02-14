import { apiPartner } from "@/api/api-partner";
import { dataPartner } from "@/type"
import { Button, Form, Input, message } from "antd"
import { useEffect } from "react"

export const ModalUpdatePartner = (dataPartner: dataPartner) => {
    // console.log("data partner", dataPartner);
    const [form] = Form.useForm();
    useEffect(() => {
        if(dataPartner){
            form.setFieldsValue({
                partner_code: dataPartner.partner_code,
                partner_name: dataPartner.partner_name,
                partner_phone: dataPartner.partner_phone,
                partner_email: dataPartner.partner_email
            })
        }
    }, [dataPartner, form]);
    const onFinish = async(values: dataPartner) => {
        // console.log('data submit', values);
        try{
            const dataSubmit = {
                ...values,
                partner_id: dataPartner.partner_id,
            }
            const response = await apiPartner.updatePartner({
                partner_id: dataSubmit.partner_id,
                partner_code: dataSubmit.partner_code,
                partner_name: dataSubmit.partner_name,
                partner_phone: dataSubmit.partner_phone,
                partner_email: dataSubmit.partner_email,
            })
            if(response){
                message.success("Cập nhật thông tin đối tác thành công!");
                form.resetFields();
                window.location.reload();
            }else{
                message.error("Cập nhật thông tin đối tác thất bại")
            }
        }catch(error){
            if(error){
                console.error("Lỗi khi cập nhật thông tin đối tác",error);
                message.error("Cập nhật thông tin đối tác thất bại");
            }else{
                console.error("Lỗi không xác định khi cập nhật thông tin đối tác", error);
                message.error("Cập nhật thông tin đối tác thất bại");
            }
        }
    }
    return (
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
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
    )
}