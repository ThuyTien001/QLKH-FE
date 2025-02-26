import { apiRecord, apiStyleProduct } from "@/api";
import { FormValues } from "@/type/record-type";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Upload, UploadFile } from "antd";
import { useEffect, useState } from "react";

export const ModalAddProfileBrand =({
            customer_id,
        }: {
            customer_id: number;
        }) =>{

            const [form] = Form.useForm();
            const [commission, setCommission] = useState<any[]>([]);
            // console.log("Customer Id: ", customer_id);

            useEffect(() => {
                // if(customer_id){
                //     form.setFieldsValue({customer_id: customer_id});
                // }
                // // const now = new Date();
                // // const month = String(now.getMonth() + 1).padStart(2, "0");
                // // const year = String(now.getFullYear()).slice(-2);
                // form.setFieldsValue({record_code: `NH`});

                const fetchCommission = async () =>{
                    try{
                        const response = await apiStyleProduct.getCommission();
                        if(response && response.data){
                            setCommission(response.data);
                        } else{
                            console.error("No data found in response");
                        }
                    }catch(error){
                        console.error("Error fetching Commission", error);
                    }
                };
                fetchCommission();
            }, [customer_id, form]);

            //Helper function to append file to FormData

            const appendFilesToFormData = (formData: FormData, fileName: string, files?: UploadFile[]) => {
                files?.forEach((file) => {
                    if(file.originFileObj){
                        formData.append(fileName, file.originFileObj, file.name);
                    }
                });
            }
            const onFinish = async (values: FormValues) => {
                try{
                    const formData = new FormData();
                    formData.append("record_code", values.record_code);
                    if(customer_id)formData.append("customer_id", customer_id.toString());
                    if(values.commission_id)formData.append("commission_id", values.commission_id.toString());

                    //Append files
                    appendFilesToFormData(formData, "form", values.form);
                    appendFilesToFormData(formData, "image", values.image );
                    appendFilesToFormData(formData, "authorization", values.authorization);
                    appendFilesToFormData(formData, "business_license", values.business_license);
                    appendFilesToFormData(formData, "orther", values.orther);
                
                    // Log FormData
                    // for (let pair of formData.entries()) {
                    //   console.log(`${pair[0]}:`, pair[1]);
                    // }
                
                    // console.log("Submitting formData:", formData);
                
                    // Gọi API
                    const response = await apiRecord.addRecord(formData);
                
                    console.log("API response in onFinish:", response);
                
                    if (!response) {
                      message.error("Không thể kết nối tới server hoặc lỗi không xác định");
                      return;
                    }
                
                    if (response) {
                      message.success( "Thêm hồ sơ thành công");
                      form.resetFields();
                      window.location.reload();
                    } else {
                      message.error( "Thêm hồ sơ thất bại");
                    }
                  } catch (error: any) {
                    console.error("Error in onFinish:", error);
                    message.error("Lỗi không xác định");
                  }
            }
    return(
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
        >
            <Form.Item label="Mã hồ sơ" name="record_code">
                <Input/>
            </Form.Item>
                <Form.Item
                    label="Đơn"
                    name="form"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                    rules={[
                        { required: true, message: "Vui lòng cung cấp đơn" },
                    ]}
                >
                    <Upload 
                        beforeUpload={() => false} // Prevents automatic upload
                        listType="text" maxCount={1}
                    >
                        
                            <Input
                            placeholder="Nhấn để chọn tệp"
                            readOnly 
                            addonAfter={<UploadOutlined />}
                            onClick={(e) => {
                                // Kích hoạt hành động chọn file của Upload
                                e.preventDefault();
                                const input = e.currentTarget.parentElement?.querySelector("input[type=file]");
                                if (input instanceof HTMLInputElement) {
                                    input.click();
                                }
                            }}
                        />
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Hình ảnh/Logo"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                >
                    <Upload 
                        beforeUpload={() => false} // Prevents automatic upload
                        maxCount={1} // Allows only one file
                    >
                        <Input
                        placeholder="Nhấn để chọn tệp"
                        readOnly // Không cho nhập thủ công
                        addonAfter={<UploadOutlined />}
                        onClick={(e) => {
                            // Kích hoạt hành động chọn file của Upload
                            e.preventDefault();
                            const input = e.currentTarget.parentElement?.querySelector("input[type=file]");
                            if (input instanceof HTMLInputElement) {
                                input.click();
                            }
                        }}
                    />
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Giấy ủy quyền"
                    name="authorization"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                    
                >
                    <Upload 
                        beforeUpload={() => false} // Prevents automatic upload
                        maxCount={1} // Allows only one file
                    >
                        <Input
                        placeholder="Nhấn để chọn tệp"
                        readOnly // Không cho nhập thủ công
                        addonAfter={<UploadOutlined />}
                        onClick={(e) => {
                            // Kích hoạt hành động chọn file của Upload
                            e.preventDefault();
                            const input = e.currentTarget.parentElement?.querySelector("input[type=file]");
                            if (input instanceof HTMLInputElement) {
                                input.click();
                            }
                        }}
                    />
                    </Upload>
                </Form.Item>
            <Form.Item
                label="Giấy phép kinh doanh"
                name="business_license"
                valuePropName="fileList"
                getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                // rules={[
                //     { required: true, message: "Vui lòng cung cấp giấy phép kinh doanh" },
                // ]}
            >
                <Upload 
                    beforeUpload={() => false} // Prevents automatic upload
                    maxCount={1} // Allows only one file
                >
                    <Input
                        placeholder="Nhấn để chọn tệp"
                        readOnly // Không cho nhập thủ công
                        addonAfter={<UploadOutlined />}
                        onClick={(e) => {
                            // Kích hoạt hành động chọn file của Upload
                            e.preventDefault();
                            const input = e.currentTarget.parentElement?.querySelector("input[type=file]");
                            if (input instanceof HTMLInputElement) {
                                input.click();
                            }
                        }}
                    />
                </Upload>
            </Form.Item>
            <Form.Item
                label="Khác"
                name="file"
                valuePropName="fileList"
                getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
            >
                <Upload 
                    beforeUpload={() => false} // Prevents automatic upload
                    maxCount={1} // Allows only one file
                >
                    <Input
                        placeholder="Nhấn để chọn tệp"
                        readOnly // Không cho nhập thủ công
                        addonAfter={<UploadOutlined />}
                        onClick={(e) => {
                            // Kích hoạt hành động chọn file của Upload
                            e.preventDefault();
                            const input = e.currentTarget.parentElement?.querySelector("input[type=file]");
                            if (input instanceof HTMLInputElement) {
                                input.click();
                            }
                        }}
                    />
                </Upload>
            </Form.Item>
            <Form.Item label="Trạng thái hoa hồng" name="commission_id">
                <Select placeholder="Tình trạng hoa hồng">
                {commission.map((commissionItem) => (
                    <Select.Option key={commissionItem.commission_id} value={commissionItem.commission_id}>
                    {commissionItem.commission_name}
                    </Select.Option>
                ))}
                </Select>
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit" className="w-full" style={{ color: "white" }}>
                    Thêm
                </Button>
            </Form.Item>
        </Form>
    )
}