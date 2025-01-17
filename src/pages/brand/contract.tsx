import { useModal } from "@/hooks";
import { Table } from "antd";
import { BiEditAlt } from "react-icons/bi";

export const ContractBrand = ({data}: any) => {
    const {toggleModal, ModalTypeEnum} = useModal()
    // console.log("data contract: ", data)
    return(
        <Table
        dataSource={data}
            columns={[
                {
                    title: "Mã hợp đồng",
                    dataIndex: "contract_code",
                    key: "contract_code"
                },
                {
                    title: "Tên hợp đồng",
                    dataIndex: "contract_name",
                    key: "contract_name"
                },
                {
                    title: "Hợp đồng nghiệm thu",
                    dataIndex: "acceptance",
                    key: "acceptance",
                    render: (acceptance: string) => {
                        if(!acceptance) return "";
                        const fileName = acceptance.split('/').pop();
                        return(
                            <a href={acceptance} rel="noopener noreferrer">
                                {fileName}
                            </a>
                        )
                    }
                },
                {
                    title: "Hợp đồng thanh lý",
                    dataIndex: "settlement",
                    key: "settlement",
                    render: (settlement: string) => {
                        if(!settlement) return "";
                        const fileName = settlement.split('/').pop();
                        return(
                            <a href={settlement} rel="noopener noreferrer">
                                {fileName}
                            </a>
                        )
                    }
                },
                {
                    title: "Hóa đơn",
                    dataIndex: "bill",
                    key: "bill",
                    render: (bill: string) => {
                        if(!bill) return "";
                        const fileName = bill.split('/').pop();
                        return(
                            <a href={bill} rel="noopener noreferrer">
                                {fileName}
                            </a>
                        )
                    }
                },
                {
                    title: "Cập nhật trạng thái",
                    dataIndex: "update_status",
                    key: "update_status",
                    render: (_, record) => (
                        <div className= "flex justify-between items-center">
                            <BiEditAlt
                                                // className=" cursor-pointer"
                                onClick={() => {
                                    console.log("Edit clicked for record: ", record);
                                    toggleModal({
                                        title: "Chỉnh sửa trạng thái hồ sơ",
                                        type: ModalTypeEnum.MODAL_UPDATE_CONTRACT,
                                        data: record,
                                    });
                                }}
                            />
                        </div>
                    ),
                }
            ]}
        />
    )
}