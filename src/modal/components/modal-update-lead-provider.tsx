import { apiLeadProvider } from "@/api";
import { dataLeadProvider } from "@/type";
import { Button, Form, Input, message } from "antd"
import { useEffect } from "react";


export const ModalUpdateLeadProvider = (dataLeadProvider: dataLeadProvider) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if(dataLeadProvider){
            form.setFieldsValue({
                lp_id: dataLeadProvider.lp_id,
                lp_code: dataLeadProvider.lp_code,
                lp_name: dataLeadProvider.lp_name,
                lp_workplace: dataLeadProvider.lp_workplace,
                lp_phone: dataLeadProvider.lp_phone,
            })
        }
    }, [dataLeadProvider, form]);
    const onFinish = async(values: dataLeadProvider) => {
        try{
            const dataSubmit = {
                ...values,
                lp_id: dataLeadProvider.lp_id,
            }
            const response = await apiLeadProvider.updateLeadProvider({
                lp_id: dataSubmit.lp_id,
                lp_code: dataSubmit.lp_code,
                lp_name: dataSubmit.lp_name,
                lp_workplace: dataSubmit.lp_workplace,
                lp_phone: dataSubmit.lp_phone,
            })
            if(response){
                message.success("Cập nhật thông tin đầu mối thành công!");
                form.resetFields();
                window.location.reload();
            }else{
                message.error("Cập nhật thông tin đầu mối thất bại")
            }
        }catch(error){
            if(error){
                console.error("Lỗi khi cập nhật thông tin đầu mối", error);
                message.error("Cập nhật thông tin đầu mối thất bại");
            }else{
                console.error("Lỗi không xác định khi cập nhật thông tin đầu mối", error);
                message.error("Cập nhật thông tin đầu mối thất bại");
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
                label="Mã đầu mối"
                name="lp_code"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Tên đầu mối"
                name="lp_name"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Đơn vị"
                name="lp_workplace"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Số điện thoại"
                name="lp_phone"
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