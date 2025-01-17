import { Header } from "@/components"
import { HeaderStyleProducts } from './header-style-products';
import { Button, Modal, Table, Tabs, } from "antd";
// import { dataStyleProduct } from "@/constant";
import { ProfileStyleProducts } from "./profile";
import { BiEditAlt } from "react-icons/bi";
import { useModal } from "@/hooks";
import { useEffect, useState } from "react";
import { apiStyleProduct } from "@/api";
import { StatusProfileStyle } from "./status-profile";
import { IoIosAdd } from "react-icons/io";
import { ContractStyleProduct } from "./contract";
import { ModalAddContractStyleProduct } from "@/modal/components/modal-add-contract-styleproduct";
import dayjs from "dayjs";

export const StyleProducts = () => {
    const {toggleModal, ModalTypeEnum} = useModal();
    const [styleproducts, setStyleproduct] = useState<any[]>([]);
    type ModalData = { customer_id?: number; record_id?: number } | null;
    const [modalData, setModalData] = useState<ModalData>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        const fetchData = async()=>{
            try{
                const response = await apiStyleProduct.getStyleProduct();
                if(response && response.data){
                    setStyleproduct(response.data);
                }else{
                    console.error("No data found in response.");
                }
            }catch(error){
                console.error("Error fetching style product: ", error);
            }
        };
        fetchData();
    }, []);
    console.log("data Style Product: ", styleproducts);
    const handleCloseModal = () => {
        setIsModalVisible(false);
        setModalData(null);
    }

    const handleOpenModalStatus = (record_id: number) => {
        setModalData({record_id});
        setIsModalVisible(true);
    }
    const isNearExpiration = (record: any) => {
        const sixMonthsLater = dayjs().add(6, "months");
        return record.list_profile.some((profile: any) => {
            const expirationDate = dayjs(profile?.status_profile?.[0]?.expiration_date, "DD-MM-YYYY");
            return expirationDate.isBefore(sixMonthsLater) || expirationDate.isSame(sixMonthsLater);
        });
    };
    return(
        <div>
            <Header/>
            <div className="mt-4 mr-4">
                <HeaderStyleProducts data={styleproducts} />
                <Table
                    dataSource={styleproducts.map((item, index) => ({ ...item, key: index }))}
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
                                            children: <ProfileStyleProducts data={item.list_profile.map((profile: any)  => ({
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
                    visible={isModalVisible}
                    onCancel={handleCloseModal}
                    // centered
                    footer={null}
                    // destroyOnClose
                >
                    
                    {modalData?.record_id && (
                        <ModalAddContractStyleProduct record_id={modalData.record_id } />
                    )}
                </Modal>

            </div>
        </div>
    )
}