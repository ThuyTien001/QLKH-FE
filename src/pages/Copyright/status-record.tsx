import { useModal } from "@/hooks";
import { Table } from "antd";
import { BiEditAlt } from "react-icons/bi";

export const StatusRecordCopyright = ({data}: any) => {
    const {toggleModal, ModalTypeEnum} = useModal()
    return (
        <Table
            dataSource={data}
            // className="mt-4"
            columns={[
                {
                    title: "Tên trạng thái",
                    dataIndex: "status_name",
                    key: "status_name",
                },
                {
                    title: "Số đơn",
                    dataIndex: "form_code",
                    key: "form_code",
                },
                {
                    title: "Ngày nộp đơn",
                    dataIndex: "application_date",
                    key:"application_date",
                },
                {
                    title: "Số văn bằng",
                    dataIndex: "patent_code",
                    key: "patent_code",
                },
                {
                    title: "Ngày cấp văn bằng",
                    dataIndex: "date_of_issuance",
                    key: "date_of_issuance",
                },
                {
                    title: "Văn bằng",
                    dataIndex: "patent",
                    key: "patent",
                    render: (patent: string) => {
                        if(!patent) return "Không có file";
                        const fileName = patent.split('/').pop();
                        return(
                            <a href={patent} rel="noopener noreferrer">
                                {fileName}
                            </a>
                        )
                    }
                },
                {
                    title: "Ngày hết hạn văn bằng",
                    dataIndex: "expiration_date",
                    key: "expiration_date"
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
                                        type: ModalTypeEnum.MODAL_UPDATE_STATUS_BRAND,
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