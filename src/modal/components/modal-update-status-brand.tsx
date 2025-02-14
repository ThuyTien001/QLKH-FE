import { apiStatusRecord } from "@/api";
import { FormStatus, StatusData } from "@/type";
import { UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, message, Upload, UploadFile } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect } from "react";

export const ModalUpdateStatusBrand = (data: StatusData) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if(data){
            form.setFieldsValue({
                status_name: data.status_name,
                status_id: data.status_id,
                form_code: data.form_code,
                application_date: data.application_date?moment(data.application_date, "DD-MM-YYYY"):null,
                patent_code: data.patent_code,
                date_of_issuance: data.date_of_issuance?moment(data.date_of_issuance, "DD-MM-YYYY"):null,
                expiration_date: data.expiration_date?moment(data.expiration_date, "DD-MM-YYYY"):null,
                patent: data.patent
                ?[
                    {
                        uid: '-1',
                        name: data.patent.split('/').pop(),
                        status: 'done',
                        url: data.patent,
                    }
                ]: []
            });
        }
        
    }, [data, form]);

    const handleFileChange = (info: any) => {
        const fileList = info.fileList.map((file: any) => ({
            ...file,
            status: 'done',
        }));
        form.setFieldsValue({
            patent: fileList,
        })
    };
    //Helper function to append files to FormData
    const appendFilesToFormData = (formData: FormData, fileName: string, file?: UploadFile[]) =>{
        file?.forEach((file) => {
            if(file.originFileObj){
                formData.append(fileName, file.originFileObj, file.name);
            }
        })
    };
    const onFinish = async(values: FormStatus) => {
        try{
            const formattedValues = {
                ...values,
                status_id: data.status_id,
                // application_date: values.application_date
                //     ? new Date(values.application_date).toISOString().split('T')[0]
                //     :null,
                // date_of_issuance: values.date_of_issuance
                //     ? new Date(values.date_of_issuance).toISOString().split('T')[0]
                //     :null ,
                // expiration_date: values.expiration_date
                //     ? new Date(values.expiration_date).toISOString().split('T')[0]
                //     :null,
                application_date: values.application_date ? dayjs(values.application_date).format("YYYY-MM-DD") : null,
                date_of_issuance: values.date_of_issuance ? dayjs(values.date_of_issuance).format("YYYY-MM-DD") : null,
                expiration_date: values.expiration_date ? dayjs(values.expiration_date).format("YYYY-MM-DD") : null,
            }
            const formData = new FormData();
            formData.append("status_name", formattedValues.status_name ||"");
            formData.append("form_code", formattedValues.form_code || "");
            formData.append("application_date", formattedValues.application_date || "");
            formData.append("patent_code", formattedValues.patent_code || "");
            formData.append("date_of_issuance", formattedValues.date_of_issuance || "");
            formData.append("expiration_date", formattedValues.expiration_date || "");
            if(formattedValues.status_id){
                formData.append("status_id", formattedValues.status_id.toString());
            }
            appendFilesToFormData(formData, "patent", formattedValues.patent);
            const response = await apiStatusRecord.updateStatusRecord(formData);
            if(!response){
                message.error("Không thể kết nối đến server hoặc lỗi không xác định");
                return;
            }
            if(response){
                message.error("Cập nhật trạng thái hồ sơ thành công");
                form.resetFields();
                window.location.reload()
            }else{
                message.error("Cập nhật trạng thái thất bại");
            }
        }catch(error){
            if(error){
                console.error("Lỗi cập nhật trạng thái", error);
                message.error("Cập nhật trạng thái thất bại");
            }else{
                console.error("Lỗi không xác định", error);
                message.error("Cập nhật trạng thái thất bại");
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
                label="Tên trạng thái"
                name="status_name"
            >
                <Input />
            </Form.Item>

            <Form.Item 
                label="Số đơn"
                name="form_code"
            >
                <Input />
            </Form.Item>
            <Form.Item 
                label="Ngày nộp đơn"
                name="application_date"
            >
                <DatePicker className="w-full" showTime={false} />
            </Form.Item>
            <Form.Item 
                label="Số văn bằng"
                name="patent_code"
            >
                <Input />
            </Form.Item>
            <Form.Item 
                label="Ngày cấp văn bằng"
                name="date_of_issuance"
            >
                <DatePicker className="w-full" showTime={false}/>
            </Form.Item>
            <Form.Item
                    className="w-full"
                    label="Văn bằng"
                    name="patent"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        // Normalize the event to return the file list
                        return Array.isArray(e) ? e : e?.fileList || [];
                    }}
                >
                    <Upload
                    className="min-w-100%"
                        beforeUpload={() => false} // Prevents automatic upload
                        maxCount={1} // Allows only one file
                        onChange={handleFileChange}
                        fileList={form.getFieldValue('patent')}
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
                label="Ngày hết hiệu lực văn bằng"
                name="expiration_date"
            >
                <DatePicker className="w-full" showTime={false} />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit" className="w-full" style={{ color: "white" }}>
                    Cập nhật
                </Button>
            </Form.Item> 
        </Form> 
    )
}