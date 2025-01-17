import { apiParticipant, apiStudents, } from "@/api";
import { Button, DatePicker, Form, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import { dataStudent } from '../../type/student-type';
import moment from "moment";

// interface ModalAddStudentProps {
//     courseId: number | null; // Nhận Course ID từ props
//   } 

export const ModalUpdateStudent = (dataStudent: dataStudent)=>{
    const [form] = Form.useForm();
    const [participant, setParticipant] = useState<any[]>([]);
          useEffect(() =>{
            const fetchParticipant = async ()=> {
                try{
                    const response = await apiParticipant.getPaticipant();
                    if(response && response.data){
                        setParticipant(response.data);
                    }else{
                        console.error('No data found in response');
                    }
                }catch(error){
                console.error("Error fetching Participant: ", error);

                }
            };
            fetchParticipant();
            if(dataStudent){
                form.setFieldsValue({
                    student_code: dataStudent.student_code,
                    student_name: dataStudent.student_name,
                    participant_id: dataStudent.participant_id,
                    participant_name: dataStudent.participant_name,
                    birthday: dataStudent.birthday? moment(dataStudent.birthday, "DD-MM-YYYY") : null,
                    department: dataStudent.department,
                    phone: dataStudent.phone,
                    email: dataStudent.email,
                    address: dataStudent.address,
                    course_id: dataStudent.course_id,
                    fullAddress: dataStudent.fullAddress,
                    student_id: dataStudent.student_id

                })
            }
          }, [dataStudent, form])
          const onFinish = async (values: dataStudent) => {
            try{
                const formartBirthday = values.birthday ? new Date(values.birthday).toISOString().split('T')[0] : undefined;
                console.log("formartBirthday: ", formartBirthday);
                
                // console.log("data submit", values);
                // console.log("student Id: ", dataStudent.student_id);
                // console.log("participant Id: ", dataStudent.participant_id);
                const response = await apiStudents.updateStudent({
                    student_id: dataStudent.student_id,
                    student_code: values.student_code,
                    participant_id: values.participant_id,
                    participant_name: values.participant_name,
                    student_name: values.student_name,
                    birthday: formartBirthday,
                    department: values.department,
                    phone: values.phone,
                    email: values.email,
                    address: values.address
                })
                console.log("response: ", response);
                if(response && response.success){
                    message.success('Cập nhật thông tin học viên thành công');
                    form.resetFields();
                    window.location.reload();
                }else{
                    message.error(response.data.message || "Cập nhật thông tin học viên thất bại");
                }
            }catch(error){
                if(error){
                    console.error("Lỗi cập nhật thông tin học viên thất bại");
                }else{
                    console.error("Lỗi không xác định", error);
                    message.error("Cập nhật thông tin học viên thất bại");
                }
            }
          }
    return(
        <Form 
            layout="vertical"
            form={form}
            onFinish={onFinish}

        >
            {/* <Form.Item label="Mã khóa học" name="course_id">
                <Input value={courseId || "Không xác định"} disabled />
            </Form.Item> */}
            <Form.Item 
                label="Mã học viên"
                name="student_code"
            >
                <Input disabled />
            </Form.Item>
            <Form.Item 
                label="Họ tên học viên"
                name="student_name"
            >
                <Input />
            </Form.Item>
            <Form.Item 
                label="Ngày tháng năm sinh"
                name="birthday"
            >
                {/* <Input/> */}
                <DatePicker className="w-full"/>
            </Form.Item>
            <Form.Item 
                label="Đơn vị công tác"
                name="department"
            >
                <Input />
            </Form.Item>
            <Form.Item 
                label="SĐT"
                name="phone"
            >
                <Input />
            </Form.Item>
            <Form.Item 
                label="Email"
                name="email"
            >
                <Input />
            </Form.Item>
            <Form.Item 
                label="Địa chỉ"
                name="address"
            >
                <Input />
            </Form.Item>
            <Form.Item 
                label="Đối tượng"
                name="participant_id"
            >
                <Select
                placeholder="Chọn đối tượng"
                >
                    {participant.map((participantItem) => (
                        <Select.Option value={participantItem.participant_id} key={participantItem.participant_id} >{participantItem.participant_name}</Select.Option>
                    ))}
                    
                </Select>
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit" className="w-full" style={{ color: "white" }}>
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
    )
}