import { apiStyleProduct } from "@/api"
import { Header } from "@/components"
import { Table } from "antd"
import { useEffect, useState } from "react"

export const Cusstomer = () => {
    const [customerPotential, setCustomerPotential]= useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await apiStyleProduct.getCustomerPotential();
                if(response && response.data){
                    setCustomerPotential(response.data);
                }else{
                    console.error("No data found in response");
                }
            }catch(error){
                console.error("Error fetching Customer: ", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <Header />
            <div className="mt-4 mr-4">
                <Table
                dataSource={customerPotential}
                    columns={[
                        {
                            title: "Mã khách hàng",
                            dataIndex: "customer_code",
                            key: "customer_code"
                        },
                        {
                            title: "Tên người liên hệ",
                            dataIndex: "customer_name",
                            key: "customer_name",
                        },
                        {
                            title: "Tên cá nhân/Đơn vị",
                            dataIndex: "business_name",
                            key: "business_name"
                        },
                        {
                            title: "Tên đối tượng",
                            dataIndex: "object_name",
                            key: "object_name"
                        },
                        {
                            title: "Số điện thoại",
                            dataIndex: "phone",
                            key:"phone"
                        },
                        {
                            title: "Email",
                            dataIndex: "email",
                            key: "email"
                        },
                        {
                            title: "Địa chỉ",
                            dataIndex: "address",
                            key: "address"
                        },
                    ]}
                />
            </div>
        </div>
    )
}