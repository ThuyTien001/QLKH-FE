import { apiStaff } from "@/api/api-staff";
import { Header } from "@/components"
import { Table } from "antd"
import { useEffect, useState } from "react"

export const Staff = () => {
    const [staff, setStaff] = useState<any[]>([]);
    useEffect(() =>{
        const fetchData = async () => {
            try{
                const response = await apiStaff.getAll();
                if(response && response.data){
                    setStaff(response.data);
                }else{
                    console.error("No data found in response");
                }
            } catch(error){
                console.error("Error fetching satff", error);
            }
        };
        fetchData();
    })
    return(
        <div>
            <Header/>
            <div className="mt-4 mr-4">
                <Table
                dataSource={staff}
                columns={[
                    {
                        title: "Mã nhân viên",
                        dataIndex: "staff_code",
                        key: "staff_code"
                    },
                    {
                        title: "Họ Tên",
                        dataIndex: "staff_name",
                        key: "staff_name"
                    },
                    {
                        title: "Chức vụ",
                        dataIndex: "staff_position",
                        key: "staff_position"
                    },
                    {
                        title: "Số điện thoại",
                        dataIndex: "staff_phone",
                        key: "staff_phone"
                    },
                    {
                        title: "Email",
                        dataIndex: "staff_email",
                        key: "staff_email"
                    },
                    {
                        title: "Địa chỉ",
                        dataIndex: "staff_address",
                        key: "staff_address"
                    },
                    {
                        title: "username",
                        dataIndex: "staff_username",
                        key: "staff_usermane"
                    },
                    {
                        title: "Trạng Thái",
                        dataIndex: "staff_status",
                        key: "staff_status"
                    }
                ]}
                />

            </div>
        </div>
    )
}