import { UploadOutlined } from "@ant-design/icons"
import { Button, Form, Input, message, Upload } from "antd"
import { useState } from "react";
import * as XLSX from "xlsx"


export const ModalAddCusstomerFile = () => {
        const [fileName, setFileName] = useState<string>("");
        const [products, setProducts] = useState<any[]>([]);
        //Xử lý khi chọn file
        const handleFileUpload = (file: File) =>{
                setFileName(file.name);
        
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = new Uint8Array(e.target?.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: "array" });
                    const sheetName = workbook.SheetNames[0]; // Lấy sheet đầu tiên
                    const sheet = workbook.Sheets[sheetName];
                    const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);
        
                    console.log("Danh sách khách hàng:", jsonData);
                    setProducts(jsonData);
                };
                reader.readAsArrayBuffer(file);
        
                return false; // Ngăn upload tự động của Ant Design
            };
            const fetchPartner = async () => {
                try{
                    const response = await fetch("http://localhost:5000/api/partner");
                    const data = await response.json();
                    console.log("Dữ liệu Partner từ API: ", data);
                    return data;
                }catch(error){
                    console.error("Lỗi fetch Partner", error);
                    return [];
                }
            }
            const fetchLeadProvider  = async() => {
                try{
                    const response = await fetch("http://localhost:5000/api/leadprovider")
                    const data = await response.json();
                    console.log("Dữ liệu Partner từ API: ", data);

                    return data;
                }catch(error){
                    console.error("Lỗi fetch Lead Provider");
                    return [];
                }
            }

            const processProduct = async (product: any[]) => {
                const partners = await fetchPartner();
                const partnerMap = new Map(partners.data.map((p:any) => [p.partner_name, p.partner_id]));
                const leadProviders = await fetchLeadProvider();
                const lpMap = new Map(leadProviders.data.map((lp:any) => [lp.lp_name, lp.lp_id]));
                if(products.length === 0){
                    message.error("Vui lòng nhập tệp danh sách khách hàng!");
                    return;
                }
                const processedData = products.map(product => ({
                    customer_code: product["Mã khách hàng"],
                    customer_name: product["Tên người liên hệ"] || "",
                    business_name: product["Tên cá nhân/Đơn vị"] || "",
                    object_name: product["Tên đối tượng"] || "",
                    phone: product["Số điện thoại"] || "",
                    email: product["Email"] || "",
                    address: product["Địa chỉ"] || "",
                    lp_id: lpMap.get(product["Tên đầu mối"]) || "",
                    partner_id: partnerMap.get(product["Tên đối tác"]) || "",
                }))
        console.log("Dữ liệu sau khi xử lý:", processedData);
                submitProduct(processedData);
            }
            const submitProduct = async (product: any[]) => {
                try{
                    // const response = await fetch("http://localhost:5000/api/customer/add/file", {
                    const response = await fetch("http://dichvukhcn.id.vn/api/student/add/file", {

                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(product),
                    });
                    const result = await response.json();
                    if(response.ok){
                        message.success("Thêm khách hàng thành công!");
                        window.location.reload()
                    }else{
                        console.error("Lỗi khi thêm khách hàng: ", result);
                    }
                }catch(error){
                    console.error("Lỗi khi kết nối đến API:", error);
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
                    <Button type="primary" className="w-full"  onClick={() => processProduct(products)}>
                        Tải tệp & Thêm khách hàng
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}