import { UploadOutlined } from "@ant-design/icons"
import { Button, Form, Input, message, Upload } from "antd"
import { useState } from "react"
import * as XLSX from "xlsx"

export const ModalAddLeadProviderFile = () => {
    const [fileName, setFileName] = useState<string>("");
    const [leadProviders, setLeadProviders] = useState<any[]>([]);
    //Xử lý khi chọn file 
    const handleFileUpload = (file: File) => {
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, {type: "array"});
            const sheetName = workbook.SheetNames[0]; //Lay sheet dau tien
            const sheet = workbook.Sheets[sheetName];
            const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);
            console.log("Danh sách khách hàng:", jsonData);
            
            setLeadProviders(jsonData);
        };
        reader.readAsArrayBuffer(file);
        return false; // Ngăn upload tự động của ant design
    }
    const processLeadProvider = async (lp: any[]) => {
        if(leadProviders.length === 0){
            message.error("vui lòng nhập tệp danh sách đầu mối!");
            return;
        }
        const processData = leadProviders.map(lp => ({
            lp_code: lp["Mã đầu mối"],
            lp_name: lp["Tên đầu mối"],
            lp_workplace: lp["Đơn vị"] || "",
            lp_phone: lp["Số điện thoại"] || "",
        }))
        console.log("Dữ liệu sau khi xử lý:", processData)
        submitLeadProvider(processData);
    }

    const submitLeadProvider = async(lp: any[]) => {
        try{
            const response = await fetch("http://localhost:5000/api/leadprovider/add/file", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(lp),
            });
            const result = await response.json();
            if(response.ok){
                message.success("Thêm thông tin đầu mối thành công!");
                window.location.reload();
            }else{
                console.error("Lối khi thêm thông tin đầu mối: ", result);
                message.error("Thêm thông tin đầu mối thất bại")
            }
        }catch(error){
            console.error("Lỗi khi kết nối đến API: ", error);
        }
    }

    return(
        <div className="items-center justify-between mt-16">
            {/* <h1 className="text-2xl justify-center mb-2 items-center font-bold">Thêm học viên</h1> */}
            <Form layout="vertical">
                {/* Ô input hiển thị tên file */}
                <Form.Item className="w-full">
                    <Input value={fileName} placeholder="Nhấn để chọn tệp" readOnly />
                </Form.Item>

                {/* Upload file */}
                <Upload beforeUpload={handleFileUpload} showUploadList={false}>
                    <Button icon={<UploadOutlined />} className="w-full">
                        Chọn tệp
                    </Button>
                </Upload>

                {/* Nút gửi danh sách học viên */}
                <Form.Item className="w-full mt-3">
                    <Button type="primary" className="w-full"  onClick={() => processLeadProvider(leadProviders)}>
                        Tải tệp & Thêm đầu mối
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}