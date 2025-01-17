import { apiStyleProduct } from "@/api";
import { dataCustomer } from "@/type";
import { Button, Form, Input, message, Select } from "antd"
import { useEffect, useState } from "react";

export const ModalUpdateCustomer = (dataCustomer: dataCustomer) => {
    const [form] = Form.useForm();
    const [leadProvider, setLeadProvider] = useState<any[]>([]);
    const [partner, setPartner] = useState<any[]>([]);
    useEffect(() => {
            // const now = new Date();
            // const month = String(now.getMonth()+1).padStart(2, "0");
            // const year = String(now.getFullYear()).slice(-2);
            // form.setFieldsValue({customer_code: `KH${month}${year}`});
            if(dataCustomer){
                form.setFieldsValue({
                    customer_code: dataCustomer.customer_code,
                    customer_name: dataCustomer.customer_name,
                    business_name: dataCustomer.business_name,
                    object_name: dataCustomer.object_name,
                    phone: dataCustomer.phone,
                    email: dataCustomer.email,
                    address: dataCustomer.address,
                    lp_id: dataCustomer.lp_id,
                    partner_id: dataCustomer.partner_id,
                    position: dataCustomer.position
                })
            }

            const fetchLeadProvider = async () => {
                try{
                    const response = await apiStyleProduct.getLeadProvider();
                    if(response && response.data){
                        setLeadProvider(response.data);
                    }else{
                        console.error("No data found in response");
                    }
                }catch(error){
                    console.error("Error fetching Lead Provider", error);
                }
            }
            fetchLeadProvider();
            const fetchPartner = async () => {
                try{
                    const response = await apiStyleProduct.getPartner();
                    if(response && response.data){
                        setPartner(response.data);
                    }else{
                        console.error('No data found in response');
                    }
                }catch(error){
                    console.error("Error fetching Partner: ", error);
                }
            }
            fetchPartner();
        }, [dataCustomer, form]);
        const onFinish = async (value: dataCustomer) =>{
            console.log("Value: ", value);
            console.log("Customer Id: ", dataCustomer.customer_id)
            try{
                const response = await apiStyleProduct.updateCustomer({
                    customer_code: value.customer_code,
                    customer_name: value.customer_name,
                    business_name: value.business_name,
                    object_name: value.object_name,
                    phone: value.phone,
                    email: value.email,
                    address: value.address,
                    lp_id: value.lp_id,
                    partner_id: value.partner_id,
                    position: value.position,
                    customer_id: dataCustomer.customer_id,
                })
                console.log("data response: ", response);
                if(response && response.success){
                    message.success("Cập nhật thông tin khách hàng thành công");
                    form.resetFields();
                    window.location.reload();
                }else{
                    message.error(response.data.message || "Cập nhật thông tin khách hàng thất bại");
                }
            }catch(error){
                if(error){
                    console.error("Lỗi khi cập nhật thông tin khách hàng", error);
                    message.error("Cập nhật thông tin khách hàng thất bại");
                }else{
                    console.error('Lỗi không xác định', error);
                    message.error('Cập nhật khóa học thất bại');
                }
            }
        }
    return(
        <Form 
            form={form}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item 
                label="Mã khách hàng"
                name="customer_code"
            >
                <Input disabled/>
            </Form.Item>
            <Form.Item 
                label="Tên người liên hệ"
                name="customer_name"
                rules={[{required: true, message: "Vui lòng nhập tên người liên hệ"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label="Tên đơn vị"
                name="business_name"
                // rules={[{required: true, message: "Vui lòng nhập tên đơn vị"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label="Chức vụ"
                name="position"
                // rules={[{required: true, message: "Vui lòng nhập tên đơn vị"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label="Kiểu dáng"
                name="object_name"
                rules={[{required: true, message: "Vui lòng nhập kiểu dáng"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label="Số điện thoại"
                name="phone"
                rules={[{
                    required: true, message: "Vui lòng nhập số điện thoại"},
                    { pattern: /^[0-9]{10}$/, message: "Số điện thoại phải là 10 chữ số" },
                ]}
                
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label="Email"
                name="email"
                rules={[{required: true, message: "Vui lòng nhập địa chỉ email"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label="Địa chỉ"
                name="address"
                rules={[{required: true, message: "Vui lòng nhập địa chỉ"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label="Tên đối tác"
                name="partner_id"
                rules={[{required: true, message: "Vui lòng nhập tên đối tác"}]}
            >
                <Select 
                    placeholder="Chọn đối tác"
                >
                    {partner.map((partnerItem) => (
                        <Select.Option key={partnerItem.partner_id} value={partnerItem.partner_id}>
                            {partnerItem.partner_name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Tên đầu mối"
                name="lp_id"
            >
                <Select
                    placeholder="Chọn đầu mối"
                >
                    {leadProvider.map((lpItem) => (
                        <Select.Option key={lpItem.lp_id} value={lpItem.lp_id}>
                            {lpItem.lp_name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            {/* <Form.Item 
                label="Trạng thái hoa hồng"
                name="commission_id"
                // rules={[{required: true, message: "Vui lòng chọn trạng thái hoa hồng"}]}
            >
                <Select
                placeholder="Tình trạng hoa hồng">
                    {commission.map((commissionItem) => (
                        <Select.Option key={commissionItem.commission_id} value={commissionItem.commission_id} >
                            {commissionItem.commission_name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item> */}
            <Form.Item >
                <Button type="primary" htmlType="submit" className="w-full" style={{ color: "white" }}>
                    cập nhật
                </Button>
            </Form.Item>
        </Form>
    )
}