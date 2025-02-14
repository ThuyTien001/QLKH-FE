import { apiLeadProvider } from "@/api"
import { dataLeadProvider } from "@/type"
import { Button, Form, Input, message } from "antd"

export const ModalAddLeadProvider = () => {
    const [form] = Form.useForm()
    const onFinish = async (values: dataLeadProvider) => {
        try{
            const response = await apiLeadProvider.addLeadProvider(values);
            if(response){
                message.success("Thêm thông tin đầu mối thành công!");
                form.resetFields();
                window.location.reload();
            }else{
                message.error("Thêm thông tin đầu mối thất bại!");
            }
        }catch(error){
            if(error){
                console.error("Lỗi khi thêm thông tin đầu mối", error);
                message.error("Thêm thông tin đầu mối thất bại");
            }else{
                console.error("Lỗi không xác định khi thêm thông tin đầu mối", error);
                message.error("Thêm thông tin đầu mối thất bại");
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