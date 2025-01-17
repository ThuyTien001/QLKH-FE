import { Form, Input, Select } from "antd"

export const ModalAddBrand = () => {
    return(
        <Form 
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
                name="bussiness_name"
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
                rules={[{required: true, message: "Vui lòng nhập số điện thoại"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label="Email"
                name="Email"
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
            <Form.Item name="position" label="Tỉnh/Thành Phố">
                <Select>
                    <Select.Option>Cần Thơ</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="position" label="Quận/Huyện">
                <Select>
                    <Select.Option>Ninh Kiều</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="position" label="Phường/Xã, Thị trấn">
                <Select>
                    <Select.Option>Xuân Khánh</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item 
                label="Tên đối tác"
                name="partner_name"
                rules={[{required: true, message: "Vui lòng nhập tên đối tác"}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Tên đầu mối"
                name="introducer"
            >
                <Input />
            </Form.Item>
            <Form.Item 
                label="Trạng thái hoa hồng"
                name="commission"
                rules={[{required: true, message: "Vui lòng chọn trạng thái hoa hồng"}]}
            >
                <Select>
                    <Select.Option>Đã chi hoa hồng</Select.Option>
                    <Select.Option>Chưa chi hoa hồng</Select.Option>
                </Select>
            </Form.Item>
            
        </Form>
    )
}