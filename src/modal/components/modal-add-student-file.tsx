import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Upload } from "antd";
import React, { useState } from "react";
import * as XLSX from "xlsx"

interface ModalAddStudentFileProps{
    courseId: number | null; //Nhận courseId từ props
}
export const ModalAddStudentFile: React.FC<ModalAddStudentFileProps> = ({courseId}) => {
    console.log("course Id: ", courseId);
    // const [fileName, setFileName] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [students, setStudents] = useState<any[]>([]);

    //xử lý khi chọjn file
    const handleFileUpload = (file: File) =>{
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0]; // Lấy sheet đầu tiên
            const sheet = workbook.Sheets[sheetName];
            const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

            console.log("Danh sách học viên:", jsonData);
            setStudents(jsonData);
        };
        reader.readAsArrayBuffer(file);

        return false; // Ngăn upload tự động của Ant Design
    };
    // const handleSubmit = async () => {
    //     if (students.length === 0) {
    //         message.error("Vui lòng chọn tệp danh sách học viên!");
    //         return;
    //     }
    //     // console.log("Submit")
    //     try{
    //         const response = await fetch("http://localhost:5000/api/students", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ courseId, students }),
    //         });
    //         if(response.ok){
    //             message.success("Thêm học viên thành công!");
    //         }
    //         else{
    //             message.error("Lỗi khi thêm học viên");
    //         }
    //     }catch(error){
    //         console.error("Lỗi gửi dữ liệu", error);
    //         message.error("Lỗi kết nối server");
    //     }
    // }
    // const fetchParticipants = async () =>{
    //     const response = await fetch("http://localhost:5000/api/participant");
    //     const data = await response.json();
    //     return data;
    // }
    // const fetchParticipants = async () => {
    //     try {
    //         const response = await fetch("http://localhost:5000/api/participant");
    //         const data = await response.json();
    //         // console.log("Dữ liệu participant từ API:", data); // Debug dữ liệu trả về
    //         return data;
    //     } catch (error) {
    //         console.error("Lỗi fetch participants:", error);
    //         return []; // Trả về mảng rỗng nếu có lỗi
    //     }
    // };
    // const convertExcelDate = (excelDate: number) => {
    //     const date = new Date((excelDate - 25569) * 86400000);
    //     return date.toISOString().split("T")[0]; // Trả về YYYY-MM-DD
    // };
    const convertExcelDate = (excelDate?: number) => {
        if (!excelDate || isNaN(excelDate)) {
            return ""; // Trả về chuỗi rỗng nếu không có giá trị hoặc không hợp lệ
        }
        
        const date = new Date((excelDate - 25569) * 86400000);
        
        if (isNaN(date.getTime())) {
            return ""; // Trả về rỗng nếu ngày tháng không hợp lệ
        }
    
        return date.toISOString().split("T")[0]; // Trả về YYYY-MM-DD
    };
    
    const processStudent = async (_student: any[])=> {
        // const participants = await fetchParticipants();
        // const participantMap = new Map(participants.data.map((p: any) => [p.participant_name, p.participant_id]))

        if (!courseId) {
            message.error("Course ID không hợp lệ!");
            return;
        }
        if (students.length === 0) {
            message.error("Vui lòng chọn tệp danh sách học viên!");
            return;
        }

        const processedData = students.map(student => ({
            student_code: student["Mã học viên"],
            student_name: student["Họ tên học viên"],
            birthday: student["Ngày sinh"]? convertExcelDate(student["Ngày sinh"]) : null,
            department: student["Đơn vị công tác"],
            phone: student["SĐT"] || "",
            email:student["Email"] || "",
            address: student["Địa chỉ"] || "",
            participant: student["Đối tượng"] || "",
            course_id: courseId
        }))
        console.log("Dữ liệu sau khi xử lý:", processedData);

    // Gửi dữ liệu lên API
    submitStudents(processedData);
    
    }

    // const submitStudents = async (students: any[]) => {
    //     console.log("Dữ liệu gửi lên API:", students);
    //     try {
    //         const response = await fetch("http://localhost:5000/api/student/add", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ students }),
    //         });
    
    //         if (response.ok) {
    //             console.log("Thêm học viên thành công!");
    //         } else {
    //             console.error("Lỗi khi thêm học viên");
    //         }
    //     } catch (error) {
    //         console.error("Lỗi kết nối API:", error);
    //     }
    // };

    const submitStudents = async (students: any[]) => {
        try {
            console.log("Gửi dữ liệu lên API:", JSON.stringify( {students}, null, 2));
    
            // const response = await fetch("http://localhost:5000/api/student/add/file", {
            const response = await fetch("https://qlkh-be.onrender.com/api/student/add/file", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( students ),
            });
    
            const result = await response.json();
            console.log("Kết quả từ API:", result);
    
            if (response.ok) {
                console.log("Thêm học viên thành công!");
                message.success("Thêm học viên mới thành công!")
                window.location.reload()
            } else {
                console.error("Lỗi khi thêm học viên:", result);
            }
        } catch (error) {
            console.error(" Lỗi kết nối API:", error);
        }
    };
    
    return(
        // <div className="items-center, justify-between">
        //     {/* <Form layout="vertical"> */}
        //         {/* <Form.Item className="w-full justify-center items-center"> */}
        //         <div className="mb-3">
        //             <Upload beforeUpload={() => false} listType="text" maxCount={1} className="w-full">
        //                 <Input
        //                 placeholder="Nhấn để chọn tệp"
        //                 readOnly
        //                 addonAfter={<UploadOutlined />}
        //                 onClick={(e) => {
        //                 e.preventDefault();
        //                 const input = e.currentTarget.parentElement?.querySelector("input[type=file]");
        //                 if (input instanceof HTMLInputElement) input.click();
        //                 }}
        //             />
        //         </Upload>
        //     </div>    
        //         {/* Ô chọn tệp có chiều rộng bằng nhau
        //         <Form.Item className="w-full">
        //             <Upload
        //                 beforeUpload={(file) => {
        //                     setFileName(file.name);
        //                     return false; // Không upload ngay
        //                 }}
        //                 showUploadList={false}
        //             >
        //                 <Button className="w-full flex justify-between items-center">
        //                     {fileName || "Nhấn để chọn tệp"}
        //                     <UploadOutlined />
        //                 </Button>
        //             </Upload> */}
        //         {/* </Form.Item> */}
        //         {/* </Form.Item> */}
        //         {/* <Form.Item> */}
        //         <div>
        //             <Button type="primary" htmlType="submit" style={{color: "while"}}>
        //                 Tải tệp
        //             </Button>
        //         </div>
        //         {/* </Form.Item>
        //     </Form> */}
        // </div>
        <div className="items-center justify-between mt-16">
            <h1 className="text-2xl justify-center mb-2 items-center font-bold">Thêm học viên</h1>
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
                    <Button type="primary" className="w-full"  onClick={() => processStudent(students)}>
                        Tải tệp & Thêm học viên
                    </Button>
                </Form.Item>
            </Form>
        </div>
        
    )
}