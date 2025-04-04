import { useModal } from "@/hooks";
import { Button, Table } from "antd";
import { BiEditAlt } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";

export const RecordPatent = ({
    data = [],
    customer_id, 
    onAddRecord,
}: {
    data: any[];
    customer_id: number;
    onAddRecord: (newRecord: any) => void;
}) => {
    const {ModalTypeEnum, toggleModal} = useModal();
    console.log("data: ", data)
    return(
        <div>
            <div className="flex items-center justify-between w-full gap-5 mb-5">
                    <div>
                        
                    </div>
                    <div className=" flex gap-5">
                        <Button type="primary">
                            <div
                                className="flex items-center gap-2"
                                onClick={() => {
                                    onAddRecord(customer_id);
                                    // toggleModal({
                                    //     title: "Thêm hồ sơ",
                                    //     type: ModalTypeEnum.MODAL_ADD_PROFILE_PATENT,
                                    //     data: {customer_id}
                                    // });
                                }}
                            >
                                <p className="text-white">Thêm mới</p>
                                <IoIosAdd className="text-sm text-white" />
                            </div>
                        </Button>
                    </div>
                </div>
            <Table 
                dataSource={data.map((customer, index) => ({
                    ...customer,
                    key: index,
                }))}
                columns={[
                    {
                        title: "Mã hồ sơ",
                        dataIndex: "record_code",
                        key: "record_code",
                    },
                    {
                        title: "Đơn",
                        dataIndex: "form",
                        key: "form",
                        render: (form: string) => {
                            if (!form) return "";
                            const fileName = form.split('/').pop();
                            return (
                              <a href={form}  rel="noopener noreferrer">
                                {fileName}
                              </a>
                            );
                        },
                    },
                    {
                        title: "Hình ảnh/Logo",
                        dataIndex: "image",
                        key: "image",
                        render: (image: string) => {
                            if (!image) return "";
                            const fileName = image.split('/').pop();
                            return (
                              <a href={image}  rel="noopener noreferrer">
                                {fileName}
                              </a>
                            );
                        },
                    },
                    {
                        title: "Giấy ủy quyền",
                        dataIndex: "authorization",
                        key: "authorization",
                        render: (authorization: string) => {
                            if (!authorization) return "";
                            const fileName = authorization.split('/').pop();
                            return (
                              <a href={authorization}  rel="noopener noreferrer">
                                {fileName}
                              </a>
                            );
                        },
                    },
                    {
                        title: "Giấy phép kinh doanh",
                        dataIndex: "business_license",
                        key: "business_license",
                        render: (business_license: string) => {
                            if (!business_license) return "";
                            const fileName = business_license.split('/').pop();
                            return (
                              <a href={business_license} rel="noopener noreferrer">
                                {fileName}
                              </a>
                            );
                        },
                    }, 
                    {
                        title: "Khác",
                        dataIndex: "orther",
                        key: "orther",
                        render: (orther: string) => {
                            if (!orther) return "";
                            const fileName = orther.split('/').pop();
                            return (
                            //   <a href={orther} download={fileName} rel="noopener noreferrer">
                            //     {fileName}
                            //   </a>
                            <a href={`/uploads/${fileName}`} download={fileName} rel="noopener noreferrer">
                                {fileName}
                            </a>
                            );
                        },
                    },
                    {
                        title: "Tình trạng hoa hồng",
                        dataIndex: "commission_name"
                    },
                    {
                        title: "Hành động",
                        dataIndex: "action",
                        key: "action",
                        render: (_, record) => (
                            <div className= "flex justify-between items-center">
                                <BiEditAlt
                                    // className=" cursor-pointer"
                                    onClick={() => {
                                        console.log("Edit clicked for record: ", record);
                                        toggleModal({
                                            title: "Chỉnh sửa hồ sơ",
                                            type: ModalTypeEnum.MODAL_UPDATE_PROFILE_PATENT,
                                            data: record,
                                        });
                                    }}
                                />
                            </div>
                        ),
                    },
                ]}
                // pagination={false}
                // expandable={{
                //     expandedRowRender: (item) => <StatusProfileBrand data={item.status_profile}/>
                // }}
            />
        </div>
    )
}