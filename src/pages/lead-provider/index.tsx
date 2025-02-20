import { apiStyleProduct } from "@/api"
import { Header } from "@/components"
import { Table } from "antd"
import { useEffect, useState } from "react"
import { BiEditAlt } from "react-icons/bi"
import { HeaderLeadProvider } from "./header-lead-provifer"
import { useModal } from "@/hooks"

export const LeadProvider = () => {
    const [leadProvider, setLeadProvider] = useState<any[]>([])
    const {ModalTypeEnum, toggleModal} = useModal()
    useEffect (() => {
        const fetchData = async () => {
            try{
                const response = await apiStyleProduct.getLeadProvider();
                if(response && response.data){
                    setLeadProvider(response.data);
                }else{
                    console.error("No data found in response");
                }
            }catch(error){
                console.error("Error fetvhing Lead Provider", error)
            }
        }
        fetchData();
    })
    return(
        <div>
            <Header/>
            <div className="mt-4 mr-4">
                <HeaderLeadProvider/>
                <Table
                    dataSource={leadProvider}
                    columns={[
                        {
                            title: "Mã đầu mối",
                            dataIndex: "lp_code",
                            key: "lp_code"
                        },
                        {
                            title: "Tên đầu mối",
                            dataIndex: "lp_name",
                            key: "lp_name",
                        },
                        {
                            title: "Đơn vị",
                            dataIndex: "lp_workplace",
                            key: "lp_workplace"
                        },
                        {
                            title:"Số điện thoại",
                            dataIndex: "lp_phone",
                            key: "lp_phone"
                        },
                        {
                            title: "Hành động",
                            dataIndex: "action",
                            key: "action",
                            render: (_, record) => (
                                <div className="flex justify-between items-center">
                                    <BiEditAlt
                                        onClick={() => {
                                            console.log("Edit clicked for record: ", record);
                                            toggleModal({
                                                title: "Cập nhật thông tin đầu mối",
                                                type: ModalTypeEnum.MODAL_UPDATE_LEAD_PROVIDER,
                                                data: record,
                                            })
                                        }}
                                    />
                                </div>
                            )
                        }
                    ]}
                />
            </div>
        </div>
    )
}