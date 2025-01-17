import { Button, DatePicker, Form, Input, message, Select } from "antd"
import { useEffect, useState } from "react";
import { DataCourse } from '../../type/course-type';
import moment from "moment";
import { apiClass } from "@/api";
import { apiCourse } from "@/api/api-course";

export const ModalUpdateCourse = (DataCourse:DataCourse) => {
    const [form]=Form.useForm();
    const [classes, setClasses] = useState<any[]>([]);
    
    useEffect(() =>{
        // console.log("Data course: ", DataCourse);
        // console.log("Class: ", classes);
        if(DataCourse){
            form.setFieldsValue({
                course_code: DataCourse.course_code,
                class_name: DataCourse.class_name,
                id_class: DataCourse.id_class,
                timelimit: DataCourse.timelimit,
                start_time: DataCourse.start_time ? moment(DataCourse.start_time, "DD-MM-YYYY") : null,
                end_time: DataCourse.end_time ? moment(DataCourse.end_time, "DD-MM-YYYY") : null,
                staff_id: DataCourse.staff_id,
            })
        }
        
    }, [DataCourse, form])
    useEffect(() => {
            const fetchData = async () => {
              try {
                const response = await apiClass.getAllClass();
                if (response && response.data) {
                    setClasses(response.data); // Lưu dữ liệu vào state
                } else {
                  console.error("No data found in response.");
                }
              } catch (error) {
                console.error("Error fetching students:", error);
              }
            };
          
            fetchData();
        }, []);
    const onFinish = async (value: DataCourse) =>{
        // console.log("Update course Data: ", value);
        try{
            //lấy token
            const token =localStorage.getItem('token');
            if(!token){
                alert('Vui lòng đăng nhập lại');
                return;
            }
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedToken = JSON.parse(atob(base64));
            const staff_id = decodedToken.staff_id;
            if(!staff_id){
                alert('Không xác định được mã nhân viên vui lòng đăng nhập lại');
                return;
            }
            console.log("Mã nhân viên: ", staff_id);
            const formattedValues = {
                ...value,
                staff_id,
                course_id: DataCourse.course_id,
                start_time: value.start_time
                    ? new Date(value.start_time).toISOString().split('T')[0]
                    :null,
                end_time: value.end_time
                    ? new Date(value.end_time).toISOString().split('T')[0]
                    :null,
            };
            // console.log('Data form: ', formattedValues);
            const response = await apiCourse.updateCourse({
                course_code: formattedValues.course_code,
                course_id: formattedValues.course_id,
                id_class: formattedValues.id_class,
                start_time: formattedValues.start_time || "",
                end_time: formattedValues.end_time || " ",
                staff_id: formattedValues.staff_id
            })
            if(response && response.success){
                message.success('Cập nhật khóa học thành công');
                form.resetFields();
                window.location.reload();
            }else{
                message.error(response.data.message || "Cập nhật khó học thất bại");
            }
        }catch(error){
            if(error){
                console.error("Lỗi khi cập nhật khóa học", error);
                message.error("Cập nhật khóa học thất bại");
            }else{
                console.error('Lỗi không xác định', error);
                message.error("Cập nhật khóa học thất bại");
            }
        }
    }
    return(
        <Form 
            form={form}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                label="Mã khóa học"
                name="course_code"
            >
                <Input disabled />
            </Form.Item>
            <Form.Item name="id_class" label="Tên lớp học">
                <Select placeholder="Chọn lớp học">
                    {classes.map((classItem) => (
                        <Select.Option key={classItem.id_class} value={classItem.id_class}>
                            {classItem.class_name}
                        </Select.Option>
                    ))}
                        {/* <Select.Option  value={id_class}>Lớp tập huấn </Select.Option> */}
                </Select>
            </Form.Item>
            <div className="flex justify-between">
                <Form.Item name="start_time" label="Ngày bắt đầu"
                    rules={[{required: true, message: "Vui lòng chọn ngày bắt đầu"}]}
                >
                <DatePicker/>
                </Form.Item>
                <Form.Item name="end_time" label="Ngày kết thúc"
                    rules={[{required: true, message: "Vui lòng chọn ngày kết thúc"}]}
                >
                    <DatePicker/>
                </Form.Item>                
            </div>
            <Form.Item >
                <Button type="primary" htmlType="submit" className="w-full" style={{ color: "white" }}>
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
    )
}