import { apiRecord, apiStyleProduct } from "@/api";
import { FormValues, FormValuesUpdate } from "@/type/record-type";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Upload, UploadFile } from 'antd';
import { useEffect, useState } from "react";

interface ModalUpdateProfileProps {
    formValues: FormValuesUpdate;
    onClose: () => void;
    onUpdate: (updatedRecord: any) => void;
    fetchRecord: () => void;
  }
export const ModalUpdateProfile = ({
    formValues,
    onClose,
    onUpdate,
    fetchRecord
}: ModalUpdateProfileProps) => {
    const [form] = Form.useForm();
    const [commission, setCommission] = useState<any[]>([]);
    // const [fileList, setFileList] = useState([]);
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);


    // console.log("form Values: ", formValues)
    useEffect(() => {
        // if(formValues){
        //     form.setFieldsValue({
        //         record_code: formValues.record_code,
        //         form: formValues.form
        //             ?[
        //                 {
        //                     uid: '-1',
        //                     name: formValues.form.split('/').pop(),
        //                     status: 'done',
        //                     url: formValues.form
        //                 }
        //             ]
        //             :[],
        //         image: formValues.image
        //             ?[
        //                 {
        //                     uid: '-1',
        //                     name: formValues.image.split('/').pop(),
        //                     status: 'done',
        //                     url: formValues.image
        //                 }
        //             ]
        //             :[],
        //             authorization: formValues.authorization
        //             ?[
        //                 {
        //                     uid: '-1',
        //                     name: formValues.authorization.split('/').pop(),
        //                     status: 'done',
        //                     url: formValues.authorization
        //                 }
        //             ]
        //             :[],
        //             business_license: formValues.business_license
        //             ?[
        //                 {
        //                     uid: '-1',
        //                     name: formValues.business_license.split('/').pop(),
        //                     status: 'done',
        //                     url: formValues.business_license
        //                 }
        //             ]
        //             :[],
        //             orther: formValues.orther
        //             ?[
        //                 {
        //                     uid: '-1',
        //                     name: formValues.orther.split('/').pop(),
        //                     status: 'done',
        //                     url: formValues.orther
        //                 }
        //             ]
        //             :[],
        //             // commission_id: formValues.commission_id,
        //             commission_id: formValues.commission_id,
        //             record_id: formValues.record_id
        //     })
        // }
        const fetchCommission = async () => {
            try {
                const response = await apiStyleProduct.getCommission();
                if (response && response.data) {
                    setCommission(response.data);
                } else {
                    console.error("No data found in response");
                }
            } catch (error) {
                console.error("Error fetching Commission: ", error);
            }
        };
        fetchCommission();
    }, [formValues, form]);
    const handleFilesChange = (field: string, info: any)=>{
        const currentValues = form.getFieldsValue();
        const fileList = info.fileList.map((file: any) => ({
            ...file,
            status: 'done',
        }));
        form.setFieldsValue({
            ...currentValues,
            [field]: fileList,
        })
    }
    const appendFilesToFormData = (
        formData:FormData,
        fieldName: string,
        files?: UploadFile[]
    ) =>{
        files?.forEach((file) => {
            if(file.originFileObj){
                formData.append(fieldName, file.originFileObj, file.name);
            }
        });
    };

    const onFinish = async(values: FormValues) => {
        try{
            const formattedValues = {
                ...values,
                record_id: formValues.record_id,
            }
            const formData = new FormData();
            formData.append("record_code", formattedValues.record_code);
            if(formattedValues.commission_id) formData.append("commission_id", formattedValues.commission_id.toString());
            if(formValues.record_id) formData.append('record_id', formValues.record_id.toString())
            // appendFilesToFormData(formData, 'form', formattedValues.form);
            // appendFilesToFormData(formData, 'image', formattedValues.image);
            // appendFilesToFormData(formData, 'authorization', formattedValues.authorization);
            // appendFilesToFormData(formData, 'business_license', formattedValues.business_license);
            // appendFilesToFormData(formData, 'orther', formattedValues.orther);

            // Trường "form"
                if (formattedValues.form && formattedValues.form.length > 0) {
                    appendFilesToFormData(formData, "form", formattedValues.form);
                } else {
                    formData.append("form", ""); // Gửi chuỗi rỗng nếu file đã bị xóa
                }
                // Trường "image"
                if (formattedValues.image && formattedValues.image.length > 0) {
                    appendFilesToFormData(formData, "image", formattedValues.image);
                } else {
                    formData.append("image", "");
                }
                // Trường "authorization"
                if (formattedValues.authorization && formattedValues.authorization.length > 0) {
                    appendFilesToFormData(formData, "authorization", formattedValues.authorization);
                } else {
                    formData.append("authorization", "");
                }
                // Trường "business_license"
                if (formattedValues.business_license && formattedValues.business_license.length > 0) {
                    appendFilesToFormData(formData, "business_license", formattedValues.business_license);
                } else {
                    formData.append("business_license", "");
                }
                // Trường "orther"
                if (formattedValues.orther && formattedValues.orther.length > 0) {
                    appendFilesToFormData(formData, "orther", formattedValues.orther);
                } else {
                    formData.append("orther", "");
                }
            

            // console.log("Data submit: ", formData);


            const response = await apiRecord.updateRecord(formData);
            if(!response){
                message.error('Không thể kết nối đến Server');
                return;
            }
            if(response){
                message.success("Cập nhật hồ sơ thành công");
                form.resetFields();
                // window.location.reload();
                onUpdate(response.data);
                fetchRecord();
                onClose();
            }else{
                message.error("Cập nhật hồ sơ thất bại");
            }
        }catch(error){
            console.error('Lỗi cập hật hồ sơ', error);
            message.error("Cập nhật hồ sơ thất bại");
        }

        
    }
    
    
    return (
        <Form
            layout="vertical"
            form={form}
            initialValues={{
                record_code: formValues.record_code,
                form: formValues.form
                  ? [
                      {
                        uid: '-1',
                        name: formValues.form.split('/').pop(),
                        status: 'done',
                        url: formValues.form,
                      },
                    ]
                  : [],
                image: formValues.image
                  ? [
                      {
                        uid: '-1',
                        name: formValues.image.split('/').pop(),
                        status: 'done',
                        url: formValues.image,
                      },
                    ]
                  : [],
                authorization: formValues.authorization
                  ? [
                      {
                        uid: '-1',
                        name: formValues.authorization.split('/').pop(),
                        status: 'done',
                        url: formValues.authorization,
                      },
                    ]
                  : [],
                business_license: formValues.business_license
                  ? [
                      {
                        uid: '-1',
                        name: formValues.business_license.split('/').pop(),
                        status: 'done',
                        url: formValues.business_license,
                      },
                    ]
                  : [],
                orther: formValues.orther
                  ? [
                      {
                        uid: '-1',
                        name: formValues.orther.split('/').pop(),
                        status: 'done',
                        url: formValues.orther,
                      },
                    ]
                  : [],
                commission_id: formValues.commission_id,
                record_id: formValues.record_id,
              }}
            onFinish={onFinish}
        >
            <Form.Item label="Mã hồ sơ" name="record_code">
                <Input disabled />
            </Form.Item>

            <Form.Item
                label="Đơn"
                name="form"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                    return Array.isArray(e) ? e: e?.fileList || [];
                }}
                // rules={[{ required: true, message: "Vui lòng cung cấp đơn" }]}
            >
                <Upload 
                    beforeUpload={() => false} 
                    maxCount={1}
                    // onRemove={() => {
                    //     // Khi xóa file, cập nhật lại giá trị của trường file thành mảng rỗng
                    //     form.setFieldsValue({ form: [] });
                    //   }}
                    // onRemove={(file) => {
                    //     const currentList = form.getFieldValue('form') || [];
                    //     const newList = currentList.filter((f: any) => f.uid !== file.uid);
                    //     console.log("New list for form:", newList);
                    //     form.setFieldsValue({ form: newList });
                    //     return true;
                    //   }}
                    // onRemove={(file) => {
                    //     const fieldName = "form"; // Thay bằng tên trường tương ứng
                    //     form.setFieldsValue({ [fieldName]: "" }); // Đặt giá trị về rỗng
                    //     return true;
                    // }}
                    onRemove={() => {
                        form.setFieldsValue({ form: [] }); // Đảm bảo luôn là mảng
                        setFileList([]); // Cập nhật state
                        return true;
                    }}
                    // onChange={(info) => handleFilesChange('form', info)} // Handle file change
                    // fileList={form.getFieldValue('form')} // Bind fileList to form value
                    fileList={fileList || []} // Đảm bảo không bị lỗi
                    onChange={({fileList }) => setFileList(fileList)}
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
                label="Hình ảnh/Logo"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                    return Array.isArray(e) ? e: e?.fileList || [];
                }}
                // rules={[{ required: true, message: "Vui lòng tải lên hình ảnh/Logo" }]}
            >
                <Upload 
                    beforeUpload={() => false} 
                    maxCount={1} 
                    onRemove={() => {
                        // Khi xóa file, cập nhật lại giá trị của trường file thành mảng rỗng
                        form.setFieldsValue({ image: [] });
                      }}
                    // accept="image/*"
                    onChange={(info) => handleFilesChange('image', info)} // Handle file change
                    fileList={form.getFieldValue('image')} // Bind fileList to form value
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
                label="Giấy ủy quyền"
                name="authorization"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                    return Array.isArray(e) ? e: e?.fileList || [];
                }}
                // rules={[{ required: true, message: "Vui lòng cung cấp giấy ủy quyền" }]}
            >
                <Upload 
                    beforeUpload={() => false} 
                    maxCount={1}
                    onRemove={() => {
                        // Khi xóa file, cập nhật lại giá trị của trường file thành mảng rỗng
                        form.setFieldsValue({ authorization: [] });
                      }}
                    onChange={(info) => handleFilesChange('authorization', info)} // Handle file change
                    fileList={form.getFieldValue('authorization')} // Bind fileList to form value
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
                label="Giấy phép kinh doanh"
                name="business_license"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                    return Array.isArray(e) ? e: e?.fileList || [];
                }}
                // rules={[{ required: true, message: "Vui lòng cung cấp giấy phép kinh doanh" }]}
            >
                <Upload 
                    beforeUpload={() => false} 
                    maxCount={1}
                    onRemove={() => {
                        // Khi xóa file, cập nhật lại giá trị của trường file thành mảng rỗng
                        form.setFieldsValue({ business_license: [] });
                      }}
                    onChange={(info) => handleFilesChange('business_license', info)} // Handle file change
                    fileList={form.getFieldValue('business_license')} // Bind fileList to form value
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
                label="Khác"
                name="orther"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                    return Array.isArray(e) ? e: e?.fileList || [];
                }}
            >
                <Upload 
                    beforeUpload={() => false} 
                    maxCount={1}
                    onRemove={() => {
                        // Khi xóa file, cập nhật lại giá trị của trường file thành mảng rỗng
                        form.setFieldsValue({ orther: [] });
                      }}
                    onChange={(info) => handleFilesChange('orther', info)} // Handle file change
                    fileList={form.getFieldValue('orther')} // Bind fileList to form value
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

            <Form.Item label="Trạng thái hoa hồng" name="commission_id">
                <Select placeholder="Tình trạng hoa hồng">
                    {commission.map((commissionItem) => (
                        <Select.Option key={commissionItem.commission_id} value={commissionItem.commission_id}>
                            {commissionItem.commission_name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full" style={{ color: "white" }}>
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
    );
};
