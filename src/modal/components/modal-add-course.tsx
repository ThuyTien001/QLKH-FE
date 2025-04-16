import { apiClass } from "@/api";
import { apiCourse } from "@/api/api-course";
import { DataCourse } from "@/type";
import { Button, DatePicker, Form, Input, message, Select } from "antd"
import dayjs from "dayjs";
import { useEffect, useState } from "react";
interface ModalAddCourseProp{
    // isVisible: boolean;
    onClose: () =>void;
    addCourseToList: (newCourse: DataCourse) => void;
    fetchCourses: () => void;
}

export const ModalAddCourse = ({ onClose, fetchCourses}: ModalAddCourseProp) => {
    const [form]=Form.useForm();
    const [loading, setLoading] = useState(false);
    const [classes, setClasses] = useState<any[]>([]);
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

    //   useEffect(() => {
    //     const now = new Date();
    //     const month = String(now.getMonth() + 1).padStart(2, "0");
    //     const year = String(now.getFullYear()).slice(-2);
    //     form.setFieldsValue({ course_code: `KH${month}${year}` });
    // }, [form]);

      const onFinish= async (values: DataCourse) => {
        try{

            setLoading(true);

            //lấy token

            const token = localStorage.getItem('token');
            if(!token){
                alert('Vui lòng đăng nhập lại');
                return;
            }
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g,'+').replace(/_/g,'/');
            const decodedToken = JSON.parse(atob(base64));
            const staff_id = decodedToken.staff_id;
            if(!staff_id){
                alert('Không xác định được mã nhân viên vui lòng đăng nhập lại!');
                return;
            }
            // console.log("mã nhân viên: ", staff_id);
            const formattedValues = {
                ...values,
                staff_id,
                // start_time: values.start_time
                //     ? new Date(values.start_time).toISOString().split('T')[0]
                //     : null,
                // // end_time: values.end_time
                // //     ? new Date(values.end_time).toISOString().split('T')[0]
                // //     : null,
                // end_time: values.end_time
                //     ? new Date(values.end_time).toISOString().split('T')[0]
                //     : null,
                start_time: values.start_time ? dayjs(values.start_time).format("YYYY-MM-DD") : null,
                end_time: values.end_time ? dayjs(values.end_time).format("YYYY-MM-DD") : null,
            };
            // console.log('Data form', formattedValues);
            const response = await apiCourse.addCourse({
                course_code: formattedValues.course_code,
                id_class: formattedValues.id_class,
                start_time: formattedValues.start_time || "",
                end_time: formattedValues.end_time || "",
                staff_id: formattedValues.staff_id

            });
            console.log('API Response: ', response);
            if(response && response.success){
                message.success('Thêm khóa học thành công');
                form.resetFields();
                fetchCourses();
                // window.location.reload();
                // addCourseToList(response);
                // onClose();
                // Gọi lại API để lấy danh sách mới
                    // const updatedCourses = await apiCourse.getAllCourse();
                    // if (updatedCourses && updatedCourses.data) {
                    //     addCourseToList(updatedCourses.data);
                    // }

                    onClose();
            }else{
                message.error(response.data.message || "Thêm khóa học thất bại");
            }
    
            console.log("Formatted form values:", formattedValues);
            console.log("Raw form values: ", values);
            console.log("Mã lớp học", values.class_name);
        }catch(error){
            if(error){
                console.error("Lỗi khi thêm khóa học", error);
                message.error("Thêm khóa học thất bại");
            }else{
                console.error("Lỗi không xác định", error);
                message.error("Thêm khóa học thất bại");
            }
        }finally{
            setLoading(false);
        }
        
      }
    return (
            <Form 
                form={form}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="Mã khóa học"
                    name="course_code"
                >
                    <Input  />
                </Form.Item>
                <Form.Item name="id_class" label="Tên lớp học">
                    <Select>
                        {classes.map((classItem) => (
                            <Select.Option key={classItem.id_class} value={classItem.id_class}>
                                {classItem.class_name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <div className="flex justify-between">
                    <Form.Item name="start_time" label="Ngày bắt đầu"
                        rules={[{required: true, message: "Vui lòng chọn ngày bắt đầu"}]}
                    >
                    <DatePicker />
                    </Form.Item>
                    <Form.Item name="end_time" label="Ngày kết thúc"
                        rules={[{required: true, message: "Vui lòng chọn ngày kết thúc"}]}
                    >
                        <DatePicker />
                    </Form.Item>                
                </div>
                <Form.Item >
                    <Button type="primary" htmlType="submit" loading={loading} className="w-full" style={{ color: "white" }}>
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
    )
}