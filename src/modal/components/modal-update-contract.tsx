import { apiContract } from "@/api/api-contract";
import { FormContract, FormUpdateContract } from "@/type";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Upload, UploadFile } from "antd";
import { useEffect } from "react";

export const ModalUpdateContract = (data: FormUpdateContract) => {
    const [form] = Form.useForm();
    console.log("data", data)
    useEffect(() => {
        if(data){
            form.setFieldsValue({
                contract_code: data.contract_code,
                contract_name: data.contract_name,
                acceptance: data.acceptance
                    ? [
                        {
                            uid: '-1',
                            name: data.acceptance.split('/').pop(),
                            status: 'done',
                            url: data.acceptance,
                        }
                    ]:[],
                settlement: data.settlement 
                    ?[
                        {
                            uid:'-1',
                            name: data.settlement.split('/').pop(),
                            status: 'done',
                            url: data.settlement,
                        }
                    ]:[],
                bill: data.bill
                    ?[
                        {
                            uid: '-1',
                            name: data.bill.split('/').pop(),
                            status: 'done',
                            url: data.bill,
                        }
                    ]:[]
            })
        }
    }, [data, form])
    // const handleFileChange = (field: string, info: any) => {
    //     const fileList = info.fileList.map((file: any) => ({
    //         ...file,
    //         status: 'done',
    //     }));
    //     form.setFieldsValue({
    //         [field]: fileList, // Cập nhật giá trị của trường tương ứng
    //     });
    // };
    const handleFileChange = (field: string, info: any) => {
        const currentValues = form.getFieldsValue(); // Lấy toàn bộ giá trị hiện tại
        const fileList = info.fileList.map((file: any) => ({
            ...file,
            status: 'done',
        }));
    
        form.setFieldsValue({
            ...currentValues, // Giữ nguyên các trường khác
            [field]: fileList, // Chỉ cập nhật trường thay đổi
        });
    }
    
    const appendFilesToFormData = (
        formData: FormData,
        fieldName: string,
        files?: UploadFile[]
    ) => {
        files?.forEach((file) => {
            if (file.originFileObj) {
                formData.append(fieldName, file.originFileObj, file.name);
            }
        });
    };
    
    const onFinish = async (values: FormContract) => {
        try {
            const formattedValues = {
                ...values,
            };

            const formData = new FormData();
            formData.append('contract_code', formattedValues.contract_code || '');
            formData.append('contract_name', formattedValues.contract_name || '');
            if(data.contract_id) formData.append("contract_id", data.contract_id.toString());


            appendFilesToFormData(formData, 'acceptance', formattedValues.acceptance);
            appendFilesToFormData(formData, 'settlement', formattedValues.settlement);
            appendFilesToFormData(formData, 'bill', formattedValues.bill);

            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            const response = await apiContract.updateContract(formData);

            if (!response) {
                message.error('Không thể kết nối đến server hoặc lỗi không xác định');
                return;
            }
            if (response) {
                message.success('Cập nhật hợp đồng thành công');
                form.resetFields();
                window.location.reload();
            } else {
                message.error('Cập nhật hợp đồng thất bại');
            }
        } catch (error) {
            console.error('Lỗi cập nhật hợp đồng', error);
            message.error('Cập nhật hợp đồng thất bại');
        }
    };

    // const onFinish = async (values: FormContract) => {
    //     try {
    //         const formattedValues = {
    //             ...values,
    //         };
    
    //         const formData = new FormData();
    //         formData.append('contract_code', formattedValues.contract_code || '');
    //         formData.append('contract_name', formattedValues.contract_name || '');
    //         if (data.contract_id) formData.append("contract_id", data.contract_id.toString());
    
    //         // Kiểm tra và chỉ append nếu có sự thay đổi, nếu không giữ nguyên giá trị cũ
    //         if (formattedValues.acceptance && formattedValues.acceptance.length > 0) {
    //             appendFilesToFormData(formData, 'acceptance', formattedValues.acceptance);
    //         } else {
    //             // Giữ nguyên giá trị cũ của trường acceptance nếu không thay đổi
    //             formData.append('acceptance', data.acceptance || '');  // Giả sử data.acceptance là giá trị cũ
    //         }
    
    //         if (formattedValues.settlement && formattedValues.settlement.length > 0) {
    //             appendFilesToFormData(formData, 'settlement', formattedValues.settlement);
    //         } else {
    //             formData.append('settlement', data.settlement || '');  // Giữ nguyên giá trị cũ của settlement
    //         }
    
    //         if (formattedValues.bill && formattedValues.bill.length > 0) {
    //             appendFilesToFormData(formData, 'bill', formattedValues.bill);
    //         } else {
    //             formData.append('bill', data.bill || '');  // Giữ nguyên giá trị cũ của bill
    //         }
    
    //         // Log giá trị để kiểm tra
    //         for (let pair of formData.entries()) {
    //             console.log(pair[0], pair[1]); // Log tất cả các cặp key-value
    //         }
    
    //         const response = await apiContract.updateContract(formData);
    
    //         if (!response) {
    //             message.error('Không thể kết nối đến server hoặc lỗi không xác định');
    //             return;
    //         }
    //         if (response) {
    //             message.success('Cập nhật hợp đồng thành công');
    //             form.resetFields();
    //             window.location.reload();
    //         } else {
    //             message.error('Cập nhật hợp đồng thất bại');
    //         }
    //     } catch (error) {
    //         console.error('Lỗi cập nhật hợp đồng', error);
    //         message.error('Cập nhật hợp đồng thất bại');
    //     }
    // };
    
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
                <Upload 
                    beforeUpload={() => false} 
                    listType="text" maxCount={1}
                    onChange={(info) => handleFileChange('acceptance', info)}
                    >
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
                <Upload 
                    beforeUpload={() => false} 
                    listType="text" maxCount={1}
                    onChange={(info) => handleFileChange('settlement', info)}
                    >
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
                <Upload 
                    beforeUpload={() => false} 
                    listType="text" maxCount={1}
                    onChange={(info) => handleFileChange('bill', info)}
                    >
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
                        Cập nhật
        </Button>
      </Form.Item>
        </Form>
    )
}