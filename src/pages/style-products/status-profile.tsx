import { useModal } from "@/hooks";
import { Table } from "antd"
import { BiEditAlt } from "react-icons/bi";

export const StatusProfileStyle = ({
    data = [],
    // onAddStatus,
}: {data: any[];
    // onAddStatus: (recordId: number) => void;
}) =>{
    const {ModalTypeEnum, toggleModal} = useModal()
    // const statusData = data || [];
    // console.log("data status:", data)
    return(
        <div>
            <div className="flex items-center justify-between w-full gap-5 mb-5">
                <div>
                    
                </div>
                {/* <div className=" flex gap-5">
                    <Button type="primary">
                        
                            <div
                                className="flex items-center gap-2"
                                onClick={() => {
                                    // onAddStatus(item.recordId);
                                    toggleModal({
                                        title: "Thêm trạng thái hồ sơ",
                                        type: ModalTypeEnum.MODAL_ADD_STATUS_RECORD_STYLE,
                                        data: {
                                            ...data
                                        }
                                    });
                                }}
                            >
                                <p className="text-white">Thêm mới</p>
                                <IoIosAdd className="text-sm text-white" />
                            </div>
                        
                    </Button>
                </div> */}
            </div>
            <Table
                dataSource={data.map((item, index) => ({
                    ...item,
                    key: index,
                }))}
                className="mt-4"
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
                        title: "Cập nhật trạng thái ",
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
                                            type: ModalTypeEnum.MODAL_UPDATE_STATUS_PROFILE,
                                            data: record,
                                        });
                                    }}
                                />
                            </div>
                        ),
                    }
                ]}
            />
        </div>
        
    )
}