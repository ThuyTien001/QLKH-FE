import { apiRecord, apiStyleProduct } from "@/api"; 
import { FormValues } from "@/type/record-type";
import { UploadOutlined } from "@ant-design/icons"; 
import { Button, Form, Input, message, Select, Upload, UploadFile } from "antd"; 
import { useEffect, useState } from "react";

interface ModalAddProfile {
  customer_id: number | null;
  onAddRecord: (dataRecord: any)=> void;
  fetchRecord: ()=> void;
  onClose: () => void;
}

// interface FormValues {
//   record_code: string;
//   form?: UploadFile[];
//   image?: UploadFile[];
//   authorization?: UploadFile[];
//   business_license?: UploadFile[];
//   orther?: UploadFile[];
//   commission_id?: number;
// }

// interface ModalAddRecordStyleProps {
//   data?: { customer_id?: number }; 
// }
// export const ModalAddProfile = ({
//   customer_id,
// }: {
//   // onAddCustomer: () => void;
//   customer_id: number;
// }) 
export const ModalAddProfile: React.FC<ModalAddProfile> = ({customer_id, onAddRecord, fetchRecord, onClose})=> {
  const [form] = Form.useForm();
  const [commission, setCommission] = useState<any[]>([]);
  // const {customer_id} = data
// console.log("Customer_id: ", customer_id);
  // Fetch commission data when customerId is available
  useEffect(() => {
    // if (customer_id) {
    //   form.setFieldsValue({ customer_id: customer_id });
    // }

    // // const now = new Date();
    // // const month = String(now.getMonth() + 1).padStart(2, "0");
    // // const year = String(now.getFullYear()).slice(-2);
    // form.setFieldsValue({ record_code: `KD` });

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
  }, [customer_id, form]);

  // Helper function to append files to FormData
  const appendFilesToFormData = (formData: FormData, fieldName: string, files?: UploadFile[]) => {
    files?.forEach((file) => {
      if (file.originFileObj) {
        formData.append(fieldName, file.originFileObj, file.name);
      }
    });
  };

  // Handle form submission

  const onFinish = async (values: FormValues) => {
    // console.log("Values: ", values);
    try {
      const formData = new FormData();
      formData.append("record_code", values.record_code);
      if (customer_id) formData.append("customer_id", customer_id.toString());
      if (values.commission_id) formData.append("commission_id", values.commission_id.toString());
  
      // Append files
      appendFilesToFormData(formData, "form", values.form);
      appendFilesToFormData(formData, "image", values.image );
      appendFilesToFormData(formData, "authorization", values.authorization);
      appendFilesToFormData(formData, "business_license", values.business_license);
      appendFilesToFormData(formData, "orther", values.orther);
  
      // // Log FormData
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
        // window.location.reload();
        onAddRecord(response.data);
        fetchRecord();
        onClose();
      } else {
        message.error( "Thêm hồ sơ thất bại");
      }
    } catch (error: any) {
      console.error("Error in onFinish:", error);
      message.error("Lỗi không xác định");
    }
  };
  
  
  return (
    <Form onFinish={onFinish} layout="vertical" form={form}>
      <Form.Item label="Mã hồ sơ" name="record_code">
        <Input />
      </Form.Item>

      <Form.Item
        label="Đơn"
        name="form"
        valuePropName="fileList"
        getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
        // getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList.map((file: { originFileObj: any; }) => file.originFileObj))}
        // rules={[{ required: true, message: "Vui lòng cung cấp đơn" }]}
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
        label="Hình ảnh/Logo"
        name="image"
        valuePropName="fileList"
        getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
        // getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList.map((file: { originFileObj: any; }) => file.originFileObj))}
        // rules={[{ required: true, message: "Vui lòng cung cấp hình ảnh/Logo" }]}
      >
        <Upload beforeUpload={() => false} maxCount={1}>
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
        getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
        // getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList.map((file: { originFileObj: any; }) => file.originFileObj))}
        // rules={[{ required: true, message: "Vui lòng cung cấp giấy ủy quyền" }]}
      >
        <Upload beforeUpload={() => false} maxCount={1}>
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
        getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
        // getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList.map((file: { originFileObj: any; }) => file.originFileObj))}
        // rules={[{ required: true, message: "Vui lòng cung cấp giấy phép kinh doanh" }]}
      >
        <Upload beforeUpload={() => false} maxCount={1}>
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
        getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
        // getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList.map((file: { originFileObj: any; }) => file.originFileObj))}

      >
        <Upload beforeUpload={() => false} maxCount={1}>
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
          Thêm
        </Button>
      </Form.Item>
    </Form>
  );
};
