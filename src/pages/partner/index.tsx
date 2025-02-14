import { apiStyleProduct } from "@/api"
import { Header } from "@/components"
import { Table } from "antd"
import { useEffect, useState } from "react"
import { BiEditAlt } from "react-icons/bi"
import { HeaderPartner } from "./header-partner"
import { useModal } from "@/hooks"

export const Partner = () =>{
    const [partner, setPartner] = useState<any[]>([]);
    const {ModalTypeEnum, toggleModal} = useModal();
    useEffect(() =>{
        const fetchData = async () => {
            try{
                const response = await apiStyleProduct.getPartner();
                if(response && response.data){
                    setPartner(response.data);
                }else{
                    console.error("No data found in response");
                }
            }catch(error){
                console.error("Error fetching Prtner", error);
            }
        };
        fetchData();
    })
    return(
        <div>
            <Header/>
            <div className="mt-4 mr-4">
                <HeaderPartner/>
                <Table 
                    dataSource={partner}
                    columns={[
                        {
                            title: "Mã đối tác",
                            dataIndex: "partner_code",
                            key: "partner_code"
                        },
                        {
                            title: "Tên đối tác",
                            dataIndex: "partner_name",
                            key: "partner_name"
                        },
                        {
                            title: "Số điện thoại",
                            dataIndex: "partner_phone",
                            key: "partner_phone"
                        },
                        {
                            title: "Email",
                            dataIndex: "partner_email",
                            key: "partner_email"
                        },
                        {
                            title: "Hành động",
                            dataIndex: "action",
                            key: "action",
                            render: (_, record) => (
                                <div className="flex justify-between items-center">
                                    <BiEditAlt
                                        onClick={() => {
                                            console.log("Edit clicked for record: ", record)
                                            toggleModal({
                                                title: "Cập nhật thông tin đối tác",
                                                type: ModalTypeEnum.MODAL_UPDATE_PARTNER,
                                                data: record
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