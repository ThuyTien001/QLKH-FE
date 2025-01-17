import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";

export const ModaleUpdateProfileBrand = () => {
    return(
        <Form
            layout="vertical"
        >
            <Form.Item label="Mã hồ sơ" name="record_code" className="w-full">
                <Input disabled/>
            </Form.Item>
                <Form.Item
                    className="w-full"
                    label="Đơn"
                    name="form"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        // Normalize the event to return the file list
                        return Array.isArray(e) ? e : e?.fileList;
                    }}
                    rules={[
                        { required: true, message: "Vui lòng cung cấp đơn" },
                    ]}
                >
                    <Upload
                    className="min-w-100%"

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
                    label="Hình ảnh/Logo"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        // Normalize the event to return the file list
                        return Array.isArray(e) ? e : e?.fileList;
                    }}
                    rules={[
                        { required: true, message: "Vui lòng cung hình ảnh/Logo" },
                    ]}
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
                    getValueFromEvent={(e) => {
                        // Normalize the event to return the file list
                        return Array.isArray(e) ? e : e?.fileList;
                    }}
                    rules={[
                        { required: true, message: "Vui lòng cung cấp giấy ủy quyền" },
                    ]}
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
                getValueFromEvent={(e) => {
                    // Normalize the event to return the file list
                    return Array.isArray(e) ? e : e?.fileList;
                }}
                rules={[
                    { required: true, message: "Vui lòng cung cấp giấy phép kinh doanh" },
                ]}
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
                getValueFromEvent={(e) => {
                    // Normalize the event to return the file list
                    return Array.isArray(e) ? e : e?.fileList;
                }}
                rules={[
                    { required: true, message: "Vui lòng cung cấp đơn" },
                ]}
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
            <Form.Item >
                <Button type="primary" htmlType="submit" className="w-full" style={{ color: "white" }}>
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
    )
}