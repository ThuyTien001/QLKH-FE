import { apiStatusRecord } from "@/api";
import { FormStatus } from "@/type";
import { UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, message, Upload, UploadFile } from "antd"
import dayjs from "dayjs";

interface ModalAddStatus{
    record_id: number | null;
    onAddStatus: (dataStatus: any) => void;
    fetchStatus: ()=> void;
    onClose: () =>void;
}

export const ModalAddStatusRecordStyle: React.FC<ModalAddStatus> = ({record_id, onAddStatus, fetchStatus, onClose}) => {
    // const {record_id} = data;

    // console.log("modal add status record", record_id)
    const [form] = Form.useForm();

    //Helper function to append files to FormData
    const appendFilesToFormData = (formData: FormData, fileName: string, file?: UploadFile[]) => {
        file?.forEach((file) => {
            if(file.originFileObj){
                formData.append(fileName, file.originFileObj, file.name);
            }
        });
    };

    const onFinish = async (values: FormStatus) => {
        // console.log("values: ", values);
        try{
            const formattedValues = {
                ...values,
                record_id,
                // application_date: values.application_date
                //     ? new Date(values.application_date).toISOString().split('T')[0]
                //     :null,
                // date_of_issuance: values.date_of_issuance
                //     ? new Date(values.date_of_issuance).toISOString().split('T')[0]
                //     :null,
                // expiration_date: values.expiration_date
                //     ? new Date(values.expiration_date).toISOString().split('T')[0]
                //     :null,
                application_date: values.application_date ? dayjs(values.application_date).format("YYYY-MM-DD") :null,
                date_of_issuance: values.date_of_issuance ? dayjs(values.date_of_issuance).format("YYYY-MM-DD") :null,
                expiration_date: values.expiration_date ? dayjs(values.expiration_date).format("YYYY-MM-DD") :null,
            }
        const formData = new FormData();
            formData.append("status_name", formattedValues.status_name || "");
            formData.append("form_code", formattedValues.form_code || "");
            formData.append("application_date", formattedValues.application_date || "");
            formData.append("patent_code", formattedValues.patent_code || "");
            formData.append("date_of_issuance", formattedValues.date_of_issuance || "");
            formData.append("expiration_date", formattedValues.expiration_date || "")
            if(record_id) formData.append("record_id", record_id.toString());
            
            appendFilesToFormData(formData, "patent", formattedValues.patent);
            

            //Call API
            console.log("data submit: ", formData);
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            const response = await apiStatusRecord.addStatusRecord(formData);

            if(!response){
                message.error("Không thể kết nối tới server hoặc lỗi không xác định");
                return;
            }
            if(response){
                message.success("Thêm trạng thái thành công");
                form.resetFields();
                // window.location.reload()
                onAddStatus(response.data);
                fetchStatus();
                onClose();
            }else{
                message.error("Thêm trạng thái thất bại");
            }
        }catch(error){
            if(error){
                console.error("lỗi Khi thêm trạng thái", error);
                message.error("Thêm trạng thái thất bại");
            }else{
                console.error('Lỗi không xác định', error);
                message.error("Thêm trạng thái thất bại");
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
                <Input/>
            </Form.Item>
            <Form.Item
                label="Số đơn"
                name="form_code"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Ngày nộp đơn"
                name="application_date"
            >
                <DatePicker className="w-full"/>
            </Form.Item>
            <Form.Item
                label="Số văn bằng"
                name="patent_code"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Ngày cấp bằng"
                name="date_of_issuance"
            >
                <DatePicker className="w-full"/>

            </Form.Item>
            <Form.Item
                label="Văn bằng"
                name="patent"
                valuePropName="fileList"
                getValueFromEvent={(e) => Array.isArray(e) ? e:e?.fileList}
                // rules={[{required: true, message: ""}]}
            >
                <Upload beforeUpload={() => false} listType="text" maxCount={1}>
                    <Input 
                        placeholder="Nhấn để chọn tệp"
                        readOnly
                        addonAfter={<UploadOutlined/>}
                        onClick={(e) => {
                            e.preventDefault();
                            const input = e.currentTarget.parentElement?.querySelector("input[type=file]");
                            if(input instanceof HTMLInputElement) input. click();
                        }}
                    />
                </Upload>
            </Form.Item>
            <Form.Item
                label="Ngày hết hạn văn bằng"
                name="expiration_date"
            >
                <DatePicker className="w-full"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full" style={{ color: "white" }}>
                    Thêm
                </Button>
            </Form.Item>
        </Form>
    )
}