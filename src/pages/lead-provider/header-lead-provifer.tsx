import { useModal } from "@/hooks"
import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { IoIosAdd } from "react-icons/io";

export const HeaderLeadProvider = () => {
    const {ModalTypeEnum, toggleModal} = useModal();
    return(
        <div className="flex items-center justify-between w-full gap-5 mb-5">
            <div>

            </div>
            <div className="flex m-6">
                <div className=" flex gap-5 mr-3">
                    <Button type="primary">
                        <div
                            className="flex items-center gap-2"
                            onClick={() => {
                                toggleModal({
                                    title: "Thêm thông tin đầu mối",
                                    type: ModalTypeEnum.MODAL_ADD_LEAD_PROVIDER_FILE
                                });
                            }}
                        >
                            <p className="text-white">Tải tệp</p>
                            <UploadOutlined  className="text-sm text-white" />
                        </div>
                    </Button>
                </div>
                <div className="flex gap-5">
                    <Button type="primary">
                        <div 
                            className="flex items-center gap-2"
                            onClick={() => {
                                toggleModal({
                                    title: "Thêm đầu mối",
                                    type: ModalTypeEnum.MODAL_ADD_LEAD_PROVIDER
                                })
                            }}
                        >
                            <p className="text-white">Thêm mới</p>
                            <IoIosAdd className="text-sm text-white"/>
                        </div>
                    </Button>
                </div>
            </div>
            
        </div>
    )
}