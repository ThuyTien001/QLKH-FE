import { Header } from "@/components"
import { HeaderBarcode } from "./header-barcode"
import { Button, Modal, Table, Tabs } from "antd"
import { BiEditAlt } from "react-icons/bi"
import { useModal } from "@/hooks"
import { useEffect, useState } from "react"
import { apiBarcode } from "@/api/api-barcode"
import { RecordBarcode } from "./record"
import { IoIosAdd } from "react-icons/io"
import { StatusRecordBarcode } from "./status-record"
import { ModalAddContractBarcode, ModalAddStatusRecordBarcode } from "@/modal/components"
import { ContractBarcode } from "./contract"
import dayjs from "dayjs"

export const BarcodeNumber = () =>{
    const {toggleModal, ModalTypeEnum} = useModal();
    const [barcode, setBarcode] = useState<any[]>([]);
    type ModalData = {customer_id?: number; record_id?: number} | null;
    const [modalData, setModalData] = useState<ModalData>(null);
    // const [isModalVissibe, setIsModalVissible] = useState(false);
    const [isContractModalVisible, setIsContractModalVisible] = useState(false);
    const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
    const [ filteredData, setFilteredData] = useState<any[]>([])
    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await apiBarcode.getBarcode();
                if(response && response.data){
                    setBarcode(response.data);
                    setFilteredData(response.data);
                }else{
                    console.error("No data found in response");
                }
            }catch(error){
                console.error("Error fetching barcode: ", error);
            }
        };
        fetchData();
    }, []);
    const handleFilter = (filteredData: any)=> {
        setFilteredData(filteredData);
    };
    // console.log("data barcode: ", barcode);
    const isNearExpiration = (record: any) => {
        const sixMonthsLater = dayjs().add(6, "months");
        return record.list_profile.some((profile: any) => {
            const expirationDate = dayjs(profile?.status_profile?.[0]?.expiration_date, "DD-MM-YYYY");
            return expirationDate.isBefore(sixMonthsLater) || expirationDate.isSame(sixMonthsLater);
        });
    };

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
    return(
        <div>
            <Header />
            <div className="mt-4 mr-4">
                <HeaderBarcode data={barcode} onFilter={handleFilter} />
                <Table 
                    // dataSource={barcode.map((item, index) => ({...item, key: index}))}
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
                                </div>
                            ),
                        }
                    ]}
                    rowClassName={(record) => (isNearExpiration(record) ? "bg-yellow-100" : "")} // Tô màu hàng
                    expandable={{
                        expandedRowRender: (item) => (
                            <div>
                                <Tabs 
                                    defaultActiveKey="1"
                                    items={[
                                        {
                                            key: "1",
                                            label: "Hồ sơ",
                                            children: <RecordBarcode data={item.list_profile.map((profile: any) => ({
                                                ...profile,
                                                status_profile: profile.status_profile || [],
                                                contracts: profile.contracts || [],
                                            }))} customer_id={item.customer_id}/>
                                        },
                                        {
                                            key: "2",
                                            label: "Trạng thái hồ sơ",
                                            children: (
                                                <>
                                                    {item.list_profile.map((profile: any, index: any) => (
                                                        <div key={index}>
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
                                                            <StatusRecordBarcode
                                                                data={profile.status_profile || []}/>
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
                                                        <div key={index}>
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
                                                            <ContractBarcode
                                                                data={profile.contracts || []}/>
                                                        </div>
                                                    ))}
                                                </>
                                            )
                                        }
                                    ]}
                                />
                            </div>
                        )
                    }}
                />
                <Modal
                    visible={isContractModalVisible}
                    onCancel={handleCloseModalContract}
                    footer={null}
                >
                    {modalData?.record_id && (
                        <ModalAddContractBarcode record_id={modalData.record_id}/>
                    )}
                </Modal>
                <Modal
                    visible={isStatusModalVisible}
                    onCancel={handleCloseModalStatus}
                    footer={null}
                >
                    {modalData?.record_id && (
                        <ModalAddStatusRecordBarcode record_id={modalData.record_id}/>
                    )}
                </Modal>
            </div>
        </div>
    )
}