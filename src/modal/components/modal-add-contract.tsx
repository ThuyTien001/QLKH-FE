import { apiContract } from "@/api/api-contract";
import { FormContract } from "@/type";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Upload, UploadFile } from "antd";
import { useEffect } from "react";

export const ModalAddContract = ({
    record_id,
}: {
    record_id: number;
}) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if(record_id){
            form.setFieldsValue({record_id: record_id})
        }
        // const now = new Date();
        // const month = String(now.getMonth() + 1).padStart(2, "0");
        // const year = String(now.getFullYear()).slice(-2);
        form.setFieldsValue({contract_code: `HD`})
    })

    const appendFilesToFormData = (formData: FormData, fileName:string, files?: UploadFile[])=>{
        files?.forEach((file) => {
            if(file.originFileObj){
                formData.append(fileName, file.originFileObj, file.name);
            }
        }) 
    }

    const onFinish = async (values: FormContract)=>{
        try{
            const formData = new FormData();
            formData.append("contract_code", values.contract_code || "");
            formData.append("contract_name", values.contract_name || "");
            if(record_id)formData.append("record_id", record_id.toString());
            appendFilesToFormData(formData, "acceptance", values.acceptance);
            appendFilesToFormData(formData, "settlement", values.settlement);
            appendFilesToFormData(formData, "bill", values.bill);

            const response = await apiContract.addContract(formData);
            if(!response){
                message.error("Không thể kết nối đến Server");
                return;
            }
            if(response){
                message.success("Thêm hợp đồng thành công");
                form.resetFields();
                window.location.reload();
            }else{
                message.error("Thêm hợp đồng thất bại");
            }
        }catch(error){
            console.error("Error in inFinish: ", error);
            message.error("Lỗi không xác định");
        }
    }
    return(
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
        >
            <Form.Item
                label="Mã hợp đồng"
                name="contract_code"
            >
                <Input disabled/>
            </Form.Item>
            <Form.Item
                label="Tên hợp đồng"
                name="contract_name"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Hợp đồng nghiệm thu"
                name="acceptance"
                valuePropName="fileList"
                getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
            >
                <Upload beforeUpload={() => false} listType="text" maxCount={1}>
                    <Input
                        placeholder="Nhấn để chọn tệp"
                        readOnly
                        addonAfter={<UploadOutlined />}
                        onClick={(e) => {
                        e.preventDefault();
                        const input = e.currentTarget.parentElement?.querySelector("input[type=file]");
                        if (input instanceof HTMLInputElement) input.click();
                        }}
                    />
                </Upload>
            </Form.Item>
            <Form.Item
                label="Hợp đồng thanh lý"
                name="settlement"
                valuePropName="fileList"
                getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
            >
                <Upload beforeUpload={() => false} listType="text" maxCount={1}>
                    <Input
                        placeholder="Nhấn để chọn tệp"
                        readOnly
                        addonAfter={<UploadOutlined />}
                        onClick={(e) => {
                        e.preventDefault();
                        const input = e.currentTarget.parentElement?.querySelector("input[type=file]");
                        if (input instanceof HTMLInputElement) input.click();
                        }}
                    />
                </Upload>
            </Form.Item>
            <Form.Item
                label="Hóa đơn"
                name="bill"
                valuePropName="fileList"
                getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
            >
                <Upload beforeUpload={() => false} listType="text" maxCount={1}>
                    <Input
                        placeholder="Nhấn để chọn tệp"
                        readOnly
                        addonAfter={<UploadOutlined />}
                        onClick={(e) => {
                        e.preventDefault();
                        const input = e.currentTarget.parentElement?.querySelector("input[type=file]");
                        if (input instanceof HTMLInputElement) input.click();
                        }}
                    />
                </Upload>
            </Form.Item>
            <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full" style={{ color: "white" }}>
                Thêm
        </Button>
      </Form.Item>
        </Form>
    )
}