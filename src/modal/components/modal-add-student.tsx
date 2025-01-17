import { apiParticipant, apiProvinces, apiStudents } from "@/api";
import { Button, DatePicker, Form, Input, message, Select } from "antd"
import { useEffect, useState } from "react";

interface ModalAddStudentProps {
    courseId: number | null; // Nhận Course ID từ props
  }     

export const ModalAddStudent: React.FC<ModalAddStudentProps> = ({ courseId }) =>{
    console.log("Course Id", courseId);
    const [form] = Form.useForm();
    const [cities, settCity] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [wards, setWards] = useState<any[]>([]);
    const [participant, setParticipant] = useState<any[]>([]);
    useEffect(() => {
        if (courseId) {
          form.setFieldsValue({ course_id: courseId });
        }
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const year = String (now.getFullYear()).slice(-2);
        form.setFieldsValue({student_code: `HV${month}${year}`});
        
      }, [courseId, form]);
      useEffect(() =>{
        const fetchCities = async() =>{
            try{
                const response = await apiProvinces.getCity();
                if(response){
                    settCity(response)
                }else{
                    console.error("No data found in response");
                }
            }catch(error){
                console.error("Error fetch city: ", error);
            }
        };
        fetchCities();
        const fetchParticipant = async () => {
            try{
                const response = await apiParticipant.getPaticipant();
                if(response && response.data){
                    setParticipant(response.data);
                }else{
                    console.error("No data found in response");
                }
            }catch(error){
                console.error("Error fetching Participant: ", error);
            }
        };
        fetchParticipant();
      }, []);

      const handleCityChange = async (cityCode: number) => {
        try{
            const response = await apiProvinces.getDistricts(cityCode);
            if(response && response.districts){
                setDistricts(response.districts);
                setWards([]);
                form.setFieldsValue({district: undefined, wards: undefined})
            }else{
                console.error("No data found in respone");
            }
        }catch(error){
            console.error("Error fetching district", error);
        }
      }
      const handleDistrictChange = async (districtcode: number)=> {
        try{
            const response = await apiProvinces.getWards(districtcode);
            if(response && response.wards){
                setWards(response.wards);
                form.setFieldsValue({wards: null});
            }else{
                console.error("No data found in response");
                setWards([]);
            }
        }catch(error){
            console.error("Error fetching Wards: ", error);
        }
      }
      const onFinish = async (value: any) => {
        const {city, district, wards: selectedWardCode, address, ...rest} = value
        const cityName = cities.find((item: {code: number, name: string}) => item.code === city )?.name || " ";
        const districtName = districts.find((item: {code: number, name: string}) => item.code === district)?.name || " ";
        const wardName = wards.find((item: {code: number, name: string}) => item.code === selectedWardCode)?.name || " ";

        //gộp lại thành chuỗi 
        const fullAddress = `${address}, ${wardName}, ${districtName}, ${cityName}`.trim();

        const dataSubmit = {
            ...rest,
            courseId,
            fullAddress,
            birthday: rest.birthday
                ? new Date(rest.birthday).toISOString().split('T')[0]
                : null
        }
        // console.log("full address", fullAddress);
        // console.log("Data submit", dataSubmit)
        // console.log("Wards: ", wardName);
        try{
const response = await apiStudents.addStudent({
            student_code: dataSubmit.student_code,
            student_name: dataSubmit.student_name,
            birthday: dataSubmit.birthday,
            department: dataSubmit.department,
            phone: dataSubmit.phone,
            email: dataSubmit.email,
            // fullAddress: dataSubmit.fullAddress,
            address: dataSubmit.fullAddress,
            course_id: dataSubmit.courseId,
            participant_id: dataSubmit.participant_name
        })
        if(response && response.success){
            message.success("Thêm học viên thành công");
            form.resetFields();
            window.location.reload();
        }else{
            message.error(response.data.message || "Thêm học viên thất bại");

        }
        }catch(error){
            if(error){
                console.error("Lỗi khi thêm học viên", error);
                message.error("Thêm học viên thất bại");
            }else{
                console.error("Lỗi không xác định", error);
                message.error("Thêm học viên thất bại");
            }
        }
        
      }
    return (
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
                label="Tỉnh/Thành phố"
                name="city"
            >
                <Select
                onChange={handleCityChange}
                >
                    {cities?.map((cityItem) => (
                        <Select.Option key={cityItem.code} value={cityItem.code} >
                            {cityItem.name}
                        </Select.Option>
                    ))}
                    
                </Select>
            </Form.Item>
            <Form.Item 
                label="Quận/Huyện"
                name="district"
            >
                <Select
                    onChange={handleDistrictChange}
                >
                    {districts?.map((districtsItems) => (
                        <Select.Option key={districtsItems.code} value={districtsItems.code} >
                            {districtsItems.name}
                        </Select.Option>
                    ))}
                    
                </Select>
            </Form.Item>
            <Form.Item 
                label="Phường/Xã"
                name="wards"
            >
                <Select>
                        {wards?.map((wardsItems) => (
                            <Select.Option key={wardsItems.code} value={wardsItems.code} >{wardsItems.name}</Select.Option>
                        ))}
                    
                </Select>
            </Form.Item>
            <Form.Item 
                label="Đối tượng"
                name="participant_name"
            >
                <Select>
                    {participant.map((participantItem) => (
                        <Select.Option value={participantItem.participant_id} >{participantItem.participant_name}</Select.Option>
                    ))}
                    
                </Select>
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit" className="w-full" style={{ color: "white" }}>
                    Thêm
                </Button>
            </Form.Item>
        </Form>
    )
}