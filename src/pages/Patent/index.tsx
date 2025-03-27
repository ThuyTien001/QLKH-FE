import { Header } from "@/components"
import { HeaderPatent } from "./header-patent"
import { Table, Tabs, Button, Modal, Dropdown, message } from 'antd';
import { BiDotsVerticalRounded, BiEditAlt } from "react-icons/bi"
import { useModal } from "@/hooks"
import { useEffect, useState } from "react"
import { apiPatent, apiStyleProduct } from "@/api"
import { RecordPatent } from "./record";
import { StatusRecordPatent } from "./status-record";
import { IoIosAdd } from "react-icons/io";
import { ContractPatent } from "./contract";
import { ModalAddContractPatent } from "@/modal/components/modal-add-contract-patent";
import dayjs from "dayjs";
import { ModalAddStatusRecordPatent } from "@/modal/components";

export const Patent = () => {
    const {toggleModal, ModalTypeEnum} = useModal();
    const [patent, setPatent] = useState<any[]>([]);
    type ModalData = {customer_id?: number; record_id?: number} | null;
    const [modalData, setModalData] = useState<ModalData>(null);
    // const [isModalVissible, setIsModalVissible] = useState(false);
    const [isContractModalVisible, setIsContractModalVisible] = useState(false);
    const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    useEffect(() => {
        const fetchData = async() =>{
            try{
                const response = await apiPatent.getPatent();
                if(response && response.data){
                    setPatent(response.data);
                    setFilteredData(response.data);
                }else{
                    console.error("No data found in response");
                }
            }catch(error){
                console.error("Error fetching Patent: ", error);
            }
        };
        fetchData();
    }, []);

    const handleFilter = (filteredData: any[]) => {
        setFilteredData(filteredData);
    };

    const handleCloseModalStatus = () => {
        setIsStatusModalVisible(false);
        setModalData(null);
    }

    const handleOpenModalStatus = (record_id: number) =>{
        setModalData({record_id});
        setIsStatusModalVisible(true);
    }
    const handleCloseModalContract = () => {
        setIsContractModalVisible(false);
        setModalData(null);
    }

    const handleOpenModalContract = (record_id: number) =>{
        setModalData({record_id});
        setIsContractModalVisible(true);
    }
    const isNearExpiration = (record: any) => {
        const sixMonthsLater = dayjs().add(6, "months");
        return record.list_profile.some((profile: any) => {
            const expirationDate = dayjs(profile?.status_profile?.[0]?.expiration_date, "DD-MM-YYYY");
            return expirationDate.isBefore(sixMonthsLater) || expirationDate.isSame(sixMonthsLater);
        });
    };
    const handleupdateStatus = async (customer_id: string, currentStatus: string) =>{
                try{
                    
                    // console.log("status customer: ", customer_status);
                    const newStatus = currentStatus === "Khách hàng tiềm năng" ? "Khách thường" : "Khách hàng tiềm năng";
                    // console.log("Updating customer:", customer_id, "New Status:", newStatus);
                    const requestData = {
                        customer_id,  // ID khách hàng
                        customer_status: newStatus, // Trạng thái mới
                    };
            
                    // console.log("Request data:", requestData);
                    const response = await apiStyleProduct.updateStatusCustomer(requestData)
                    // console.log("Dữ liệu cập nhật: ", response);
                    if(response.success){
                        message.success("Trạng thái đã được cập nhật");
                        setPatent((prev) =>
                            prev.map((customer) =>
                                customer.customer_id === customer_id
                                    ? { ...customer, customer_status: newStatus }
                                    : customer
                            )
                        );
                        setFilteredData((prev) =>
                            prev.map((customer) =>
                                customer.customer_id === customer_id
                                    ? { ...customer, customer_status: newStatus }
                                    : customer
                            )
                        );
                    }else{
                        message.error(response.meseage || "Cập nhật thất bại");
                    }
                }catch(error){
                    console.error("Lỗi khi cập nhật trạng thái");
                    message.error("Lỗi khi cập nhật trạng thái khách hàng!")
                }
            }
    return(
        <div>
            <Header />
            <div className="mt-4 mr-4">
                <HeaderPatent data={patent}onFilter={handleFilter} />
                <Table 
                    // dataSource={patent.map((item, index) => ({...item, key: index}))}
                    dataSource={(filteredData.length > 0 ? filteredData : []).map((item, index) => ({...item, key: index}))}
                    columns={[
                        {
                            title: "Mã khách hàng",
                            dataIndex: "customer_code",
                            key: "customer_code",
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
                        {
                            title: "Tên đối tác",
                            dataIndex: "partner_name",
                                key: "partner_name",
                        },
                                                    {
                            title: "Tên đầu mối",
                            dataIndex: "lp_name",
                            key: "lp_name"
                        },
                        {
                            title: "Trạng thái",
                            dataIndex: "customer_status",
                            key: "customer_status"
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
                                                title: "Chỉnh sửa thông tin khách hàng",
                                                type: ModalTypeEnum.MODAL_UPDATE_CUSTOMER,
                                                data: record,
                                            });
                                        }}
                                    />
                                    <div className="cursor-pointer">
                                            <Dropdown
                                                placement="bottomRight"
                                                menu={{
                                                    items: [
                                                        {
                                                            key: "1",
                                                            label: (
                                                                <p
                                                                onClick={() => {
                                                                console.log("Mã khách hàng: ", record.customer_id)
                                                                    Modal.confirm({
                                                                        title: record.status === "Khách hàng tiềm năng"
                                                                            ? "Khách thường"
                                                                            : "Khách hàng tiềm năng",
                                                                        content: record.status
                                                                            ? `Bạn có chắc chắn muốn hủy trạng thái khách hàng tiềm nằn chó khách hàng ${record.customer_name} này không?`
                                                                            : `Bạn có chắc chắn muốn đánh dấu khách hàng "${record.customer_name}" này là khách hàng tiềm năng không?`,
                                                                        centered: true,
                                                                        onOk() {
                                                                              // handleUpdateStatusSupplier({
                                                                              //     status: !item.status,
                                                                              //     id_supplier: item._id,
                                                                              handleupdateStatus(record.customer_id, record.customer_status)
                                                                              
                                                                            // message.success("Trạng thái đã được cập nhật!")
                                                                              // });
                                                                        },
                                                                        okText: (
                                                                            <p>
                                                                                {record.status
                                                                                    ? "Hủy trạng thái"
                                                                                    : "Xác nhận"}
                                                                            </p>
                                                                        ),
                                                                        onCancel() {},
                                                                        okButtonProps: {
                                                                            danger: !record.status,
                                                                        },
                                                                    });
                                                            }}
                                                                >Khách hàng tiềm năng</p>
                                                            ),
                                                        },
                                                    ],
                                                }}
                                            >
                                                <BiDotsVerticalRounded />
                                            </Dropdown>
                                        </div>
                                </div>
                            ),
                        }
                    ]}
                    rowClassName={(record) => (isNearExpiration(record) ? "bg-yellow-100" : "")} // Tô màu hàng
                    expandable={{
                        expandedRowRender: (item) =>(
                            <div>
                                <Tabs 
                                    defaultActiveKey="1"
                                    items={[
                                        {
                                            key: "1",
                                            label: "Hồ sơ",
                                            children: <RecordPatent data={item.list_profile.map((profile: any) => ({
                                                ...profile,
                                                status_profile: profile.status_profile ||[],
                                                contacts: profile.contracts || [],
                                            }))} customer_id={item.customer_id}/>
                                        },
                                        {
                                            key: "2",
                                            label: "Trạng thái hồ sơ",
                                            children: (
                                                <>
                                                    {item.list_profile.map((profile: any, index: any) => (
                                                        <div
                                                            key={index}
                                                        >
                                                            <div className="flex items-center justify-between w-full gap-5 mb-5">
                                                                <h3>
                                                                    Trạng thái cho hồ sơ: {profile.record_code}
                                                                </h3>
                                                                <div className="flex gap-5">
                                                                    <Button type="primary"
                                                                        onClick={() => {
                                                                            handleOpenModalStatus(profile.record_id)
                                                                        }}
                                                                    >
                                                                        <p className="text-white">Thêm mới</p>
                                                                        <IoIosAdd className="text-sm text-white" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <StatusRecordPatent 
                                                                data={profile.status_profile || []}
                                                            />
                                                        </div>
                                                    ))}
                                                </>
                                            )
                                        },
                                        {
                                            key: "3",
                                            label: "Hợp đồng",
                                            children: (
                                                <>
                                                    {item.list_profile.map((profile: any, index: any) => (
                                                        <div
                                                            key={index}
                                                        >
                                                            <div className="flex items-center justify-between w-full gap-5 mb-5">
                                                                <h3>
                                                                    Hợp đồng cho hồ sơ: {profile.record_code}
                                                                </h3>
                                                                <div className="flex gap-5">
                                                                    <Button type="primary"
                                                                        onClick={() => {
                                                                            handleOpenModalContract(profile.record_id)
                                                                        }}
                                                                    >
                                                                        <p className="text-white">Thêm mới</p>
                                                                        <IoIosAdd className="text-sm text-white" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <ContractPatent
                                                                data={profile.contracts || []}
                                                            />
                                                        </div>
                                                    ))}
                                                </>
                                            )
                                        }
                                    ]}
                                />
                                <Modal 
                                    visible={isContractModalVisible}
                                    onCancel={handleCloseModalContract}
                                    footer={null}
                                >
                                    {/* {modalData?.customer_id && (
                                        <ModalAddProfilePatent customer_id={modalData.customer_id}/>
                                    )} */}
                                    {modalData?.record_id && (
                                        <ModalAddContractPatent record_id={modalData.record_id} />
                                    )}
                                </Modal>
                                <Modal 
                                    visible={isStatusModalVisible}
                                    onCancel={handleCloseModalStatus}
                                    footer={null}
                                >
                                    {/* {modalData?.customer_id && (
                                        <ModalAddProfilePatent customer_id={modalData.customer_id}/>
                                    )} */}
                                    {modalData?.record_id && (
                                        <ModalAddStatusRecordPatent record_id={modalData.record_id} />
                                    )}
                                </Modal>
                            </div>
                        )
                    }}
                />
            </div>
        </div>
    )
}