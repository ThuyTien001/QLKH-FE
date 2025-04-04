import { Header } from "@/components"
import { HeaderStyleProducts } from './header-style-products';
import { Button, Dropdown, message, Modal, Table, Tabs, } from "antd";
// import { dataStyleProduct } from "@/constant";
import { ProfileStyleProducts } from "./profile";
import { BiDotsVerticalRounded, BiEditAlt } from "react-icons/bi";
import { useModal } from "@/hooks";
import { useEffect, useState } from "react";
import { apiStyleProduct } from "@/api";
import { StatusProfileStyle } from "./status-profile";
import { IoIosAdd } from "react-icons/io";
import { ContractStyleProduct } from "./contract";
import { ModalAddContractStyleProduct } from "@/modal/components/modal-add-contract-styleproduct";
import dayjs from "dayjs";
import { ModalAddProfile, ModalAddProfileStyle, ModalAddStatusRecordStyle, ModalUpdateProfile } from "@/modal/components";
import { FormValuesUpdate } from "@/type";

export const StyleProducts = () => {
    const {toggleModal, ModalTypeEnum} = useModal();
    const [styleproducts, setStyleproduct] = useState<any[]>([]);
    type ModalData = { customer_id?: number; record_id?: number } | null;
    const [modalData, setModalData] = useState<ModalData>(null);
    // const [isModalVisible, setIsModalVisible] = useState(false);
    const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
    const [isContractModalVisible, setIsContractModalVisible] = useState(false);
    const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
    const [isRecordModalVisible, setIsRecordModalVisible] = useState(false);

    const [selectedUpdateProfileId, setSelectedUpdateProfileId] = useState<FormValuesUpdate | null>(null);
    const [isRecordModalUpdateVisible, setIsRecordModalUpdateVisible] = useState(false);
    useEffect(() => {
        const fetchData = async()=>{
            try{
                const response = await apiStyleProduct.getStyleProduct();
                if(response && response.data){
                    setStyleproduct(response.data);
                    setFilteredData(response.data);
                }else{
                    console.error("No data found in response.");
                }
            }catch(error){
                console.error("Error fetching style product: ", error);
            }
        };
        fetchData();
    }, []);
    const handleFilter = (filteredData: any[]) => {
        setFilteredData(filteredData); // Cập nhật trạng thái dữ liệu đã lọc
    };
    // console.log("data Style Product: ", styleproducts);
    const handleCloseModalStatus = () => {
        setIsStatusModalVisible(false);
        setModalData(null);
    }

    const handleOpenModalStatus = (record_id: number) => {
        setModalData({record_id});
        setIsStatusModalVisible(true);
    }
    const handleCloseModalContract = () => {
        setIsContractModalVisible(false);
        setModalData(null);
    }

    const handleOpenModalContract = (record_id: number) => {
        setModalData({record_id});
        setIsContractModalVisible(true);
    }
    const isNearExpiration = (record: any) => {
        if (!record?.list_profile || !Array.isArray(record.list_profile)) {
            return false;
          }
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
    
            console.log("Request data:", requestData);
            const response = await apiStyleProduct.updateStatusCustomer(requestData)
            console.log("Dữ liệu cập nhật: ", response);
            if(response.success){
                message.success("Trạng thái đã được cập nhật");
                setStyleproduct((prev) =>
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

    const handleOpenModalAddRecord = (customer_id: number) => {
        setIsRecordModalVisible(true);
        setSelectedProfileId(customer_id);
    }
    const handleCloseRecordModal = () => {
        setIsRecordModalVisible(false);
        setSelectedProfileId(null);
    }
    const handleOpenModalUpdateRecord = (customer_id: FormValuesUpdate) => {
        setIsRecordModalUpdateVisible(true);
        setSelectedUpdateProfileId(customer_id);
    }
    const handleCloseModalUpdateRecord = () => {
        setIsRecordModalUpdateVisible(false);
        setSelectedUpdateProfileId(null);
    }
      // Callback cập nhật lại record sau khi update thành công
//   const handleUpdateRecord = (updatedRecord: any) => {
//     setStyleproduct((prev) =>
//       prev.map((record) => (record.record_id === updatedRecord.record_id ? updatedRecord : record))
//     );
//     setFilteredData((prev) =>
//       prev.map((record) => (record.record_id === updatedRecord.record_id ? updatedRecord : record))
//     );
//   };
    //Hàm thêm khách hàng vào danh sách 
    const addProfileToList = (newProfile: any)=>{
        setStyleproduct((prevProfile) => [...prevProfile, newProfile])
        setFilteredData((prevProfile) => [...prevProfile, newProfile])
    };
    const fetchProfile = async()=>{
        try{
            const response = await apiStyleProduct.getStyleProduct();
            if(response && response.data){
                setStyleproduct(response.data);
                setFilteredData(response.data);
            }else{
                console.error("No data found in response");
            }
        }catch(error){
            console.error("Error fetching Customer: ", error);
        }
    };
    const handleCloseProfileModal = () => {
        setIsProfileModalVisible(false)
    }
    return(
        <div>
            <Header/>
            <div className="mt-4 mr-4">
                <HeaderStyleProducts data={styleproducts} onFilter={handleFilter} openAddProfileModal={() => setIsProfileModalVisible(true)} />
                <Table
                    // dataSource={styleproducts.map((item, index) => ({ ...item, key: index }))}
                    dataSource={(filteredData.length > 0 ? filteredData : []).map((item, index) => ({ ...item, key: index }))}
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
                        },
                    ]}
                    rowClassName={(record) => (isNearExpiration(record) ? "bg-yellow-100" : "")} // Tô màu hàng
                    expandable={{
                        expandedRowRender: (item) => {
                            return(
                            <div>
                                <Tabs
                                    defaultActiveKey="1"
                                    items={[
                                        {
                                            key: "1",
                                            label: "Hồ Sơ",
                                            children: <ProfileStyleProducts onAddRecord={() => handleOpenModalAddRecord(item.customer_id)} onUpdate={(record) => handleOpenModalUpdateRecord(record)} data={item.list_profile.map((profile: any)  => ({
                                                ...profile,
                                                status_profile: profile.status_profile || [], // Gán giá trị mặc định
                                                contracts: profile.contracts || [],
                                            }))} customer_id={item.customer_id}/>
                                        },
                                        {
                                            key: "2",
                                            label: "Trạng thái hồ sơ",
                                            children: (
                                                <>
                                                    {item.list_profile.map((profile: any, index: any) => (
                                                        <div key={index} >
                                                            <div className="flex items-center justify-between w-full gap-5 mb-5">
                                                            <h3>
                                                                Trạng thái cho hồ sơ: {profile.record_code}
                                                            </h3>
                                                            <div className="flex gap-5">
                                                                <Button type="primary"
                                                                    onClick={() => {
                                                                        handleOpenModalStatus(profile.record_id)
                                                                    }}
                                                                    className=" text-white px-4 py-2 mt-2 rounded"
                                                                >
                                                                    <p className="text-white">Thêm mới</p>
                                                                    <IoIosAdd className="text-sm text-white"/>
                                                                    {/* Thêm mới {profile.record_code} */}
                                                                </Button>
                                                            </div>
                                                            </div>
                                                            <StatusProfileStyle
                                                                data={profile.status_profile || []} // Truyền dữ liệu xuống component
                                                            />
                                                            
                                                        </div>
                                                    ))}
                                                </>
                                            ),
                                        },
                                        {
                                            key: "3",
                                            label: "Hợp đồng",
                                            children: (
                                                <>
                                                    {item.list_profile.map((profile: any, index: any) => (
                                                        <div key={index} >
                                                            <div className="flex items-center justify-between w-full gap-5 mb-5">
                                                            <h3>
                                                                Hợp đồng cho hồ sơ: {profile.record_code}
                                                            </h3>
                                                            <div className="flex gap-5">
                                                                <Button type="primary"
                                                                    onClick={() => {
                                                                        handleOpenModalContract(profile.record_id)
                                                                    }}
                                                                    className=" text-white px-4 py-2 mt-2 rounded"
                                                                >
                                                                    <p className="text-white">Thêm mới</p>
                                                                    <IoIosAdd className="text-sm text-white"/>
                                                                    {/* Thêm mới {profile.record_code} */}
                                                                </Button>
                                                            </div>
                                                            </div>
                                                            <ContractStyleProduct
                                                                data={profile.contracts || []} // Truyền dữ liệu xuống component
                                                            />
                                                            
                                                        </div>
                                                    ))}
                                                </>
                                            ),
                                        }
                                    ]}
                                />
                            </div>
                            )
                        }
                    }}
                />
                <Modal
                    title="Thêm khách hàng"
                    open={isProfileModalVisible}
                    onCancel={handleCloseProfileModal}
                    footer={null}
                >
                    <ModalAddProfileStyle fetchProfile={fetchProfile} addProfileToList={addProfileToList} onClose={handleCloseProfileModal}/>
                </Modal>
                <Modal
                    title = "Thêm hồ sơ"
                    open ={isRecordModalVisible}
                    onCancel={handleCloseRecordModal}
                    footer={null}
                >
                    {selectedProfileId && <ModalAddProfile fetchRecord={fetchProfile} onAddRecord={handleOpenModalAddRecord} customer_id={selectedProfileId} onClose={handleCloseRecordModal}/>}
                </Modal>
                <Modal
                    title="Chỉnh sửa hồ sơ"
                    open={isRecordModalUpdateVisible}
                    onCancel={handleCloseModalUpdateRecord}
                    footer={null}
                >
                    {selectedUpdateProfileId && <ModalUpdateProfile formValues={selectedUpdateProfileId} fetchRecord={fetchProfile} onUpdate={handleOpenModalUpdateRecord} onClose={handleCloseModalUpdateRecord} />}
                </Modal>
                <Modal
                    open={isContractModalVisible}
                    onCancel={handleCloseModalContract}
                    // centered
                    footer={null}
                    // destroyOnClose
                >
                    
                    {modalData?.record_id && (
                        <ModalAddContractStyleProduct onAddContract={handleOpenModalContract} fetchContract={fetchProfile} onClose={handleCloseModalContract} record_id={modalData.record_id } />
                    )}
                </Modal>
                <Modal
                    open={isStatusModalVisible}
                    onCancel={handleCloseModalStatus}
                    // centered
                    footer={null}
                    // destroyOnClose
                >
                    
                    {modalData?.record_id && (
                        <ModalAddStatusRecordStyle onAddStatus={handleOpenModalContract} fetchStatus={fetchProfile} onClose={handleCloseModalStatus} record_id={modalData.record_id } />
                    )}
                </Modal>

            </div>
        </div>
    )
}