import { UploadOutlined } from "@ant-design/icons"
import { Button, Form, Input, message, Upload } from "antd"
import { useState } from "react"
import * as XLSX from "xlsx"

export const ModalAddPartnerFile = () => {
    const [fileName, setFileName] = useState<string>("");
    const [partners, setPartner] = useState<any[]>([]);

    //Xử lý khi chọn file

    const handleFileUpload = (file: File) => {
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, {type: "array"});
            const sheetName = workbook.SheetNames[0]; // Lay sheet dau tien;
            const sheet = workbook.Sheets[sheetName];
            const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);
            console.log("Danh sách đối tác:", jsonData);
            setPartner(jsonData);
        };
        reader.readAsArrayBuffer(file);
        return false; //Ngăn upload tự động của ant design
    };

    const processPartner = async(partner: any[]) => {
        if(partners.length === 0){
            message.error("Vui lòng nhập tẹp danh sách đối tác");
            return;
        }
        const processedData = partners.map(partner => ({
            partner_code: partner["Mã đối tác"],
            partner_name: partner["Tên đối tác"],
            partner_phone: partner["Số điện thoại"] || "",
            partner_email: partner["Email"] || "",
        }))
        console.log("Dữ liệu sau khi xử lý: ", processedData);
        submitPartner(processedData);
    }

    const submitPartner = async (partner: any[]) => {
        try{
            const response = await fetch("http://localhost:5000/api/partner/add/file", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(partner),
            });
            const result = await response.json();
            if(response.ok){
                message.success("Thêm thông tin đối tác thành công!");
                window.location.reload();
            }else{
                console.error("Lỗi khi thêm thông tin đối tác: ", result);
                message.error("Thêm thông tin đối tác thất bại");
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
                    <Button type="primary" className="w-full"  onClick={() => processPartner(partners)}>
                        Tải tệp & Thêm đối tác
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}